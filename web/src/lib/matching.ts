// منطق دامنه‌ی تطابق سلیقه (matching/scoring) — توابع خالص و بدون وابستگی به دیتابیس.
// مبنای فید کشف هوشمند (concepts/ai-discovery در ویکی): شباهت بردار سلیقه‌ی کاربر با بردار
// ویژگی آیتم (cosine similarity)، به‌علاوه‌ی تطابق ویژگی‌های صریح (دسته، رنگ، بودجه، سایز).
// مرجع مدل داده: docs/DATA_MODEL.md بخش‌های StyleProfile / Item / Interaction.

/** نوع تعامل کاربر با آیتم — هم‌ارز enum InteractionType در schema.prisma */
export type InteractionType =
  | "VIEW"
  | "LIKE"
  | "DISLIKE"
  | "SAVE"
  | "CONTACT_SELLER";

/**
 * وزن هر نوع تعامل در ساخت بردار سلیقه.
 * DISLIKE منفی است: آیتم‌های رد‌شده سلیقه را در جهت مخالف هل می‌دهند.
 */
export const INTERACTION_WEIGHTS: Readonly<Record<InteractionType, number>> = {
  LIKE: 1,
  SAVE: 0.8,
  CONTACT_SELLER: 0.6,
  VIEW: 0.2,
  DISLIKE: -1,
};

/**
 * وزن سیگنال‌های تطابق؛ مقادیر نسبی‌اند و در matchScore نسبت به سیگنال‌های
 * *موجود* نرمال می‌شوند (جمعشان ۱ است).
 */
export const SIGNAL_WEIGHTS = {
  embedding: 0.5,
  category: 0.2,
  color: 0.15,
  budget: 0.1,
  size: 0.05,
} as const;

/** آستانه‌ی صفر برای محاسبات برداری */
const EPSILON = 1e-9;

export interface TasteSignal {
  /** بردار ویژگی آیتم (Item.itemEmbedding) */
  embedding: readonly number[];
  /** نوع تعامل کاربر با آن آیتم */
  type: InteractionType;
}

export interface TasteEmbeddingOptions {
  /** حداکثر تعداد تعامل مورد استفاده (جدیدترین‌ها) */
  limit?: number;
  /** ضریب کاهش وزن برای تعامل‌های قدیمی‌تر */
  decay?: number;
}

/**
 * ساخت/به‌روزرسانی بردار سلیقه از تعامل‌های کاربر (StyleProfile.tasteEmbedding).
 * ورودی باید از جدید به قدیم مرتب باشد؛ N تعامل اول با وزن نزولی (`decay^i`) و وزن نوع
 * تعامل ترکیب می‌شوند (docs/DATA_MODEL.md — جدول Interaction append-only است).
 * خروجی بردار میانگین وزن‌دار است؛ اگر هیچ سیگنال معتبری نباشد بردار خالی برمی‌گردد (cold start).
 */
export function buildTasteEmbedding(
  signals: readonly TasteSignal[],
  { limit = 20, decay = 0.9 }: TasteEmbeddingOptions = {}
): number[] {
  const used = signals
    .slice(0, Math.max(0, limit))
    .filter((signal) => signal.embedding.length > 0);
  if (used.length === 0) return [];

  const dimensions = used[0].embedding.length;
  const accumulator = new Array<number>(dimensions).fill(0);
  let totalWeight = 0;

  used.forEach((signal, index) => {
    if (signal.embedding.length !== dimensions) {
      throw new Error(
        `buildTasteEmbedding: بردارها باید هم‌ابعاد باشند (${dimensions} در برابر ${signal.embedding.length})`
      );
    }
    const weight = INTERACTION_WEIGHTS[signal.type] * Math.pow(decay, index);
    totalWeight += Math.abs(weight);
    for (let i = 0; i < dimensions; i += 1) {
      accumulator[i] += signal.embedding[i] * weight;
    }
  });

  // وزن‌های مثبت و منفی می‌توانند جمعاً صفر شوند؛ در این حالت بردار خنثی برمی‌گردانیم.
  if (totalWeight < EPSILON) return new Array<number>(dimensions).fill(0);

  return accumulator.map((value) => value / totalWeight);
}

/**
 * شباهت کسینوسی دو بردار؛ خروجی در بازه‌ی [-1, 1].
 * بردار صفر یا بردار خالی → ۰؛ ابعاد ناهم‌خوان → خطا (نشانه‌ی داده‌ی خراب است، نه امتیاز صفر).
 */
export function cosineSimilarity(
  a: readonly number[],
  b: readonly number[]
): number {
  if (a.length !== b.length) {
    throw new Error(
      `cosineSimilarity: ابعاد ناهم‌خوان (${a.length} در برابر ${b.length})`
    );
  }
  if (a.length === 0) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA < EPSILON || normB < EPSILON) return 0;

  const similarity = dot / (Math.sqrt(normA) * Math.sqrt(normB));
  return Math.min(1, Math.max(-1, similarity));
}

/** پروفایل سلیقه‌ی کاربر — زیرمجموعه‌ی فیلدهای StyleProfile که در امتیازدهی استفاده می‌شود */
export interface MatchProfile {
  tasteEmbedding?: readonly number[] | null;
  preferredCategories?: readonly string[] | null;
  preferredColors?: readonly string[] | null;
  budgetMin?: number | null;
  budgetMax?: number | null;
  /** سایز موردنظر به تفکیک دسته (بالاتنه، پایین‌تنه، کفش و ...) */
  sizeInfo?: Readonly<Record<string, string>> | null;
}

/** آیتم قابل امتیازدهی — زیرمجموعه‌ی فیلدهای Item */
export interface MatchItem {
  itemEmbedding?: readonly number[] | null;
  categoryId?: string | null;
  color?: string | null;
  price: number;
  size?: string | null;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function normalizeToken(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * امتیاز تطابق یک فهرست ترجیحی (دسته/رنگ) با مقدار واقعی آیتم.
 * خروجی null یعنی «سیگنالی در دست نیست» (کاربر ترجیحی ثبت نکرده) — با صفر فرق دارد.
 */
function tokenScore(
  preferred: readonly string[] | null | undefined,
  actual: string | null | undefined
): number | null {
  if (!preferred || preferred.length === 0 || !actual) return null;
  const target = normalizeToken(actual);
  return preferred.some((value) => normalizeToken(value) === target) ? 1 : 0;
}

/** امتیاز بودجه در بازه‌ی [0,1]؛ خارج از بازه به‌صورت تدریجی (نه پله‌ای) کم می‌شود */
function budgetScore(profile: MatchProfile, price: number): number | null {
  const min = profile.budgetMin ?? null;
  const max = profile.budgetMax ?? null;
  if (min === null && max === null) return null;
  if (min !== null && price < min) return min > 0 ? clamp01(price / min) : 0;
  if (max !== null && price > max) return max > 0 ? clamp01(max / price) : 0;
  return 1;
}

/** امتیاز سایز؛ فقط وقتی sizeInfo برای همان دسته مقدار دارد معنا پیدا می‌کند */
function sizeScore(profile: MatchProfile, item: MatchItem): number | null {
  const category = item.categoryId;
  const wanted = category && profile.sizeInfo ? profile.sizeInfo[category] : undefined;
  if (!wanted || !item.size) return null;
  return normalizeToken(wanted) === normalizeToken(item.size) ? 1 : 0;
}

/** امتیاز شباهت برداری؛ شباهت منفی (سلیقه‌ی مخالف) صفر در نظر گرفته می‌شود */
function embeddingScore(profile: MatchProfile, item: MatchItem): number | null {
  const taste = profile.tasteEmbedding;
  const embedding = item.itemEmbedding;
  if (!taste || taste.length === 0 || !embedding || embedding.length === 0) {
    return null;
  }
  return clamp01(cosineSimilarity(taste, embedding));
}

/**
 * امتیاز تطابق آیتم با سلیقه‌ی کاربر، در بازه‌ی [0,1].
 * میانگین وزن‌دار سیگنال‌های *موجود* است؛ اگر هیچ سیگنالی موجود نباشد (cold start کامل —
 * کاربر تازه بدون تعامل و بدون ترجیح) صفر برمی‌گردد.
 * ابعاد ناهم‌خوان embedding باعث خطا می‌شود (نه امتیاز نادرست).
 */
export function matchScore(profile: MatchProfile, item: MatchItem): number {
  const signals: Array<{ weight: number; value: number | null }> = [
    { weight: SIGNAL_WEIGHTS.embedding, value: embeddingScore(profile, item) },
    {
      weight: SIGNAL_WEIGHTS.category,
      value: tokenScore(profile.preferredCategories, item.categoryId),
    },
    {
      weight: SIGNAL_WEIGHTS.color,
      value: tokenScore(profile.preferredColors, item.color),
    },
    { weight: SIGNAL_WEIGHTS.budget, value: budgetScore(profile, item.price) },
    { weight: SIGNAL_WEIGHTS.size, value: sizeScore(profile, item) },
  ];

  let weighted = 0;
  let totalWeight = 0;
  for (const signal of signals) {
    if (signal.value === null) continue;
    weighted += signal.value * signal.weight;
    totalWeight += signal.weight;
  }
  if (totalWeight < EPSILON) return 0;

  return clamp01(weighted / totalWeight);
}

/** امتیاز تطابق به‌صورت درصد برای نمایش («۸۷٪ به سلیقه‌ی تو نزدیک است» — PRD بخش ۵) */
export function matchPercent(profile: MatchProfile, item: MatchItem): number {
  return Math.round(matchScore(profile, item) * 100);
}

export interface RankableItem extends MatchItem {
  id: string;
}

export interface RankedItem {
  itemId: string;
  /** امتیاز خام در بازه‌ی [0,1] */
  score: number;
  /** همان امتیاز به‌صورت درصد (۰ تا ۱۰۰) */
  matchPercent: number;
}

export interface RankOptions {
  /** حداقل امتیاز قابل قبول (۰ تا ۱) */
  minScore?: number;
  /** حداکثر تعداد نتیجه */
  limit?: number;
}

/**
 * رتبه‌بندی آیتم‌ها برای فید کشف: نزولی بر اساس امتیاز با tie-break قطعی روی id
 * (تا ترتیب فید بین دو اجرا یکسان بماند).
 */
export function rankItems(
  items: readonly RankableItem[],
  profile: MatchProfile,
  { minScore = 0, limit }: RankOptions = {}
): RankedItem[] {
  const ranked = items
    .map((item) => {
      const score = matchScore(profile, item);
      return {
        itemId: item.id,
        score,
        matchPercent: Math.round(score * 100),
      };
    })
    .filter((entry) => entry.score >= minScore)
    .sort((a, b) => b.score - a.score || a.itemId.localeCompare(b.itemId));

  return typeof limit === "number" ? ranked.slice(0, Math.max(0, limit)) : ranked;
}
