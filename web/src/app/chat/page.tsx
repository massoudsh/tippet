import { addChatMessage, countUnreadMessages, createChatThreadId } from "@/lib/chat";

const threadId = createChatThreadId("buyer-1", "seller-1", "vintage-denim-jacket");
const messages = addChatMessage(
  [{ id: "1", sender: "buyer" as const, body: "سلام، کت هنوز موجوده؟", createdAt: "2026-09-25T10:00:00Z" }],
  { id: "2", sender: "seller" as const, body: "سلام، بله موجوده و امروز قابل ارسال است.", createdAt: "2026-09-25T10:01:00Z" }
);

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-4xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/items/vintage-denim-jacket">بازگشت به آیتم</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
          <p className="text-sm font-black text-amber-200">چت داخلی خریدار-فروشنده</p>
          <h1 className="mt-3 text-3xl font-black">گفت‌وگوی امن برای هماهنگی خرید</h1>
          <p className="mt-3 text-sm text-stone-400">Thread: {threadId} · پیام خوانده‌نشده برای خریدار: {countUnreadMessages(messages, "buyer").toLocaleString("fa-IR")}</p>
        </div>
        <div className="space-y-3 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
          {messages.map((message) => (
            <div key={message.id} className={`max-w-[80%] rounded-3xl p-4 ${message.sender === "buyer" ? "mr-auto bg-amber-300 text-slate-950" : "bg-white/10 text-stone-100"}`}>
              <p className="text-sm font-bold">{message.sender === "buyer" ? "خریدار" : "فروشنده"}</p>
              <p className="mt-2">{message.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
