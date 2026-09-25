import { calculateStyleProfileCompleteness } from "@/lib/onboarding";

const completeness = calculateStyleProfileCompleteness({
  sizes: ["M"],
  categories: ["کت", "هودی", "شلوار"],
  colors: ["مشکی", "آبی نفتی"],
  budgetMin: 700000,
  budgetMax: 3000000,
  inspirationCount: 3,
});

const questions = ["سایزهای معمول تو چیست؟", "چه دسته‌هایی بیشتر می‌پوشی؟", "بودجه خریدت چقدر است؟", "سه آیتم الهام‌بخش انتخاب کن."];

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-6xl space-y-8">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20">
            <p className="text-sm font-black text-amber-200">حل cold start</p>
            <h1 className="mt-3 text-4xl font-black leading-tight">پروفایل سلیقه را در چند سؤال بساز.</h1>
            <p className="mt-4 leading-8 text-stone-300">
              تیپت قبل از شروع فید، سایز، بودجه، رنگ‌ها و چند نمونه استایل را می‌گیرد تا پیشنهادهای اولیه دقیق‌تر باشند.
            </p>
            <div className="mt-8 rounded-3xl bg-amber-300 p-5 text-slate-950">
              <p className="text-sm font-bold">کامل‌بودن نمونه پروفایل</p>
              <p className="mt-2 text-5xl font-black">{completeness}٪</p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {questions.map((question, index) => (
              <article key={question} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                <span className="mb-8 flex size-10 items-center justify-center rounded-2xl bg-stone-50 font-black text-slate-950">{index + 1}</span>
                <h2 className="text-xl font-black">{question}</h2>
                <p className="mt-3 text-sm leading-7 text-stone-400">این داده برای رتبه‌بندی فید کشف و پیشنهاد آیتم‌های نزدیک به سلیقه استفاده می‌شود.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
