import { ComingSoonBanner } from "@/components/coming-soon-banner";

const messages = [
  { id: "1", sender: "buyer", label: "شما", body: "سلام، کت هنوز موجوده؟", time: "۱۰:۰۰" },
  { id: "2", sender: "seller", label: "فروشنده", body: "سلام، بله موجوده و امروز قابل ارسال است.", time: "۱۰:۰۱" },
];

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50 sm:py-12">
      <section className="mx-auto max-w-3xl space-y-6">
        <a className="inline-flex text-sm text-stone-400 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300" href="/items/vintage-denim-jacket">
          بازگشت به صفحهٔ آیتم
        </a>

        <header className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-8">
          <p className="text-sm font-black text-amber-200">گفتگو دربارهٔ کت جین وینتیج</p>
          <h1 className="text-3xl font-black leading-tight md:text-4xl">گفتگو با فروشنده</h1>
          <p className="leading-8 text-stone-300">این یک نمونهٔ نمایشی از گفتگوی خریدار و فروشنده است. پیام‌ها ارسال یا ذخیره نمی‌شوند.</p>
          <ComingSoonBanner feature="چت داخلی" />
        </header>

        <section aria-label="پیام‌های نمونه" className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 sm:p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <article key={message.id} className={`max-w-[88%] rounded-3xl p-4 ${message.sender === "buyer" ? "mr-auto bg-amber-300 text-slate-950" : "bg-white/10 text-stone-100"}`}>
                <div className="flex items-center justify-between gap-4 text-xs font-bold opacity-75">
                  <span>{message.label}</span>
                  <time>{message.time}</time>
                </div>
                <p className="mt-2 leading-7">{message.body}</p>
              </article>
            ))}
          </div>
        </section>

        <form className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4" aria-label="ارسال پیام">
          <label htmlFor="message" className="sr-only">پیام شما</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <textarea id="message" disabled rows={2} placeholder="ارسال پیام در فاز ۳ فعال می‌شود" className="min-h-12 flex-1 resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-stone-400 placeholder:text-stone-500 disabled:cursor-not-allowed" />
            <button type="button" disabled className="cursor-not-allowed rounded-2xl bg-stone-700 px-6 py-3 font-black text-stone-400">ارسال پیام</button>
          </div>
          <p className="mt-3 text-sm leading-6 text-stone-500">تا زمان فعال‌شدن چت، از روش تماس نمایش‌داده‌شده در صفحهٔ فروشنده استفاده کن.</p>
        </form>

        <div className="flex flex-wrap gap-3">
          <a className="rounded-2xl bg-amber-300 px-5 py-3 font-black text-slate-950 transition hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300" href="/items/vintage-denim-jacket">بازگشت به آیتم</a>
          <a className="rounded-2xl border border-white/15 px-5 py-3 font-bold transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300" href="/checkout">مشاهدهٔ روند خرید</a>
        </div>
      </section>
    </main>
  );
}
