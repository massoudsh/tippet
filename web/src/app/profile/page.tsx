const profile = {
  sizes: ["M", "Free"],
  categories: ["کت", "هودی", "بارانی"],
  colors: ["آبی", "مشکی"],
  budget: "۷۰۰٬۰۰۰ تا ۳٬۰۰۰٬۰۰۰ تومان",
  inspirations: ["وینتیج", "استریت‌ویر", "مینیمال"],
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-5xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 md:p-10">
          <p className="text-sm font-black text-amber-200">پروفایل سلیقه</p>
          <h1 className="mt-3 text-4xl font-black">سلیقه، سایز و بودجه خریدار</h1>
          <p className="mt-4 leading-8 text-stone-300">این پروفایل مبنای رتبه‌بندی فید کشف و پیشنهاد آیتم‌های نزدیک به سلیقه است.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <ProfileCard title="سایزها" values={profile.sizes} />
          <ProfileCard title="دسته‌های محبوب" values={profile.categories} />
          <ProfileCard title="رنگ‌ها" values={profile.colors} />
          <ProfileCard title="الهام‌ها" values={profile.inspirations} />
        </div>
        <div className="rounded-3xl border border-white/10 bg-amber-300 p-5 text-slate-950">
          <p className="text-sm font-bold">بودجه خرید</p>
          <p className="mt-2 text-2xl font-black">{profile.budget}</p>
        </div>
      </section>
    </main>
  );
}

function ProfileCard({ title, values }: { title: string; values: string[] }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
      <h2 className="font-black">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {values.map((value) => (
          <span key={value} className="rounded-full bg-white/10 px-3 py-1 text-sm text-stone-200">{value}</span>
        ))}
      </div>
    </article>
  );
}
