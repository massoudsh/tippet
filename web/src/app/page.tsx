const featuredItems = [
  {
    title: "کت جین وینتیج",
    meta: "تهران · سایز M · وضعیت عالی",
    price: "۱٬۴۸۰٬۰۰۰ تومان",
    match: "۹۲٪",
    palette: "from-sky-200 via-slate-200 to-zinc-300",
  },
  {
    title: "بارانی زعفرانی",
    meta: "تجریش · سایز L · کم‌کارکرد",
    price: "۲٬۱۰۰٬۰۰۰ تومان",
    match: "۸۷٪",
    palette: "from-amber-200 via-orange-100 to-stone-200",
  },
  {
    title: "هودی استریت‌ویر",
    meta: "یوسف‌آباد · فری‌سایز · سالم",
    price: "۹۲۰٬۰۰۰ تومان",
    match: "۸۴٪",
    palette: "from-emerald-200 via-teal-100 to-slate-200",
  },
];

const trustSignals = ["تشخیص سلیقه با AI", "استانداردسازی آگهی", "نمایش وضعیت و فروشنده", "فیلتر تهران و وینتیج"];

const photoTips = [
  "عکس اصلی را در نور طبیعی و روی پس‌زمینه ساده بگیر.",
  "نمای جلو، پشت، برچسب سایز و ایرادهای احتمالی را جدا ثبت کن.",
  "برای نمایش fit، یک عکس پوشیده‌شده یا اندازه‌گیری دقیق اضافه کن.",
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#334155_0,#111827_30%,#070a12_68%)] text-stone-50">
      <div className="absolute inset-0 -z-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/8 px-5 py-3 shadow-2xl shadow-black/20 backdrop-blur">
          <div>
            <p className="text-xl font-black tracking-tight">تیپت</p>
            <p className="text-xs text-stone-300">کشف هوشمند لباس دست‌دوم</p>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <a className="transition hover:text-white" href="/onboarding">آنبوردینگ</a>
            <a className="transition hover:text-white" href="/seller">پنل فروشنده</a>
            <a className="transition hover:text-white" href="/metrics">معیارها</a>
            <a className="transition hover:text-white" href="#photo-guide">راهنمای عکس</a>
          </nav>
          <a className="rounded-full bg-amber-300 px-5 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-200" href="/auth">
            ورود با موبایل
          </a>
        </header>

        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-sm text-amber-100">
              تهران، وینتیج و استریت‌ویر · پیشنهادهای نزدیک به سلیقه تو
            </div>
            <div className="space-y-5">
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                لباس دست‌دوم را مثل یک استایلیست شخصی کشف کن.
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-stone-300">
                تیپت عکس، سایز، بودجه و سلیقه‌ات را می‌فهمد و از میان آیتم‌های کمیاب، پیشنهادهایی می‌سازد که هم قابل خریدند و هم به استایل تو می‌آیند.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a className="rounded-2xl bg-stone-50 px-6 py-4 text-center font-bold text-slate-950 shadow-xl shadow-white/10 transition hover:-translate-y-0.5" href="/onboarding">
                ساخت پروفایل سلیقه
              </a>
              <a className="rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-center font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15" href="/seller">
                ثبت سریع آگهی
              </a>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center sm:max-w-lg">
              <Stat value="۹۲٪" label="بیشترین تطابق" />
              <Stat value="۴" label="سیگنال اعتماد" />
              <Stat value="۳ دقیقه" label="ثبت آگهی" />
            </div>
          </div>

          <div id="feed" className="rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-stone-950/80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold">فید کشف امروز</h2>
                  <p className="text-sm text-stone-400">مرتب‌شده با تطابق سلیقه</p>
                </div>
                <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-bold text-emerald-200">زنده</span>
              </div>
              <div className="space-y-3">
                {featuredItems.map((item) => (
                  <article key={item.title} className="group grid grid-cols-[104px_1fr] gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-3 transition hover:bg-white/[0.1]">
                    <div className={`min-h-32 rounded-2xl bg-gradient-to-br ${item.palette} p-2 shadow-inner shadow-white/40`}>
                      <div className="h-full rounded-xl border border-white/45 bg-white/25" />
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <h3 className="font-extrabold text-white">{item.title}</h3>
                          <span className="rounded-full bg-amber-300 px-2.5 py-1 text-xs font-black text-slate-950">{item.match}</span>
                        </div>
                        <p className="text-sm leading-6 text-stone-400">{item.meta}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="font-bold text-stone-100">{item.price}</p>
                        <button className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-stone-200 transition group-hover:border-amber-200/40 group-hover:text-amber-100">
                          جزئیات
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="trust" className="grid gap-4 md:grid-cols-4">
          {trustSignals.map((signal) => (
            <div key={signal} className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 text-sm font-bold text-stone-100 shadow-xl shadow-black/10 backdrop-blur">
              {signal}
            </div>
          ))}
        </section>

        <section id="seller" className="grid gap-6 rounded-[2rem] border border-white/10 bg-stone-50 p-5 text-slate-950 shadow-2xl shadow-black/20 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div className="space-y-4">
            <p className="text-sm font-black text-amber-700">برای فروشنده‌ها</p>
            <h2 className="text-3xl font-black leading-tight">از عکس خام تا آگهی قابل اعتماد.</h2>
            <p className="leading-8 text-slate-600">
              فروشنده فقط عکس و توضیح آزاد می‌دهد؛ تیپت دسته، رنگ، جنس، سایز احتمالی و وضعیت کالا را پیشنهاد می‌کند تا آگهی سریع‌تر کامل شود.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <ProcessStep number="۱" title="آپلود عکس" text="نور و زاویه بررسی می‌شود." />
            <ProcessStep number="۲" title="تحلیل AI" text="ویژگی‌های آیتم استخراج می‌شود." />
            <ProcessStep number="۳" title="انتشار" text="آگهی با امتیاز کامل‌بودن ثبت می‌شود." />
          </div>
        </section>

        <section id="photo-guide" className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/10 backdrop-blur lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
          <div>
            <p className="text-sm font-black text-amber-200">راهنمای عکاسی فروشنده</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">عکس بهتر، اعتماد بیشتر و فروش سریع‌تر.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {photoTips.map((tip, index) => (
              <div key={tip} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <span className="mb-6 flex size-9 items-center justify-center rounded-2xl bg-amber-300 text-sm font-black text-slate-950">{index + 1}</span>
                <p className="text-sm leading-7 text-stone-200">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs text-stone-400">{label}</p>
    </div>
  );
}

function ProcessStep({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="rounded-3xl bg-slate-950 p-5 text-stone-50">
      <div className="mb-8 flex size-10 items-center justify-center rounded-2xl bg-amber-300 text-lg font-black text-slate-950">{number}</div>
      <h3 className="font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-400">{text}</p>
    </div>
  );
}
