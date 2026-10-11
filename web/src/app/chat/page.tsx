import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ComingSoonBanner } from "@/components/ui/coming-soon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { addChatMessage, countUnreadMessages, createChatThreadId } from "@/lib/chat";
import { cn, faNumber } from "@/lib/utils";

const threadId = createChatThreadId("buyer-1", "seller-1", "vintage-denim-jacket");
const messages = addChatMessage(
  [{ id: "1", sender: "buyer" as const, body: "سلام، کت هنوز موجوده؟", createdAt: "2026-09-25T10:00:00Z" }],
  { id: "2", sender: "seller" as const, body: "سلام، بله موجوده و امروز قابل ارسال است.", createdAt: "2026-09-25T10:01:00Z" },
);

export default function ChatPage() {
  return (
    <AppShell active="none" className="space-y-6">
      <PageHeader
        eyebrow="چت داخلی خریدار-فروشنده"
        title="گفت‌وجوی امن برای هماهنگی خرید"
        description="در MVP تماس از طریق واتساپ/تلگرام انجام می‌شود؛ چت داخلی برای فازهای بعد طراحی شده است."
      />

      <ComingSoonBanner
        eyebrow="فاز ۳"
        title="ارسال پیام واقعی هنوز فعال نیست"
        description="نمونه مکالمه زیر فقط منطق thread و شمارش خوانده‌نشده را نشان می‌دهد."
        phaseLabel="به‌زودی — خارج از محدوده MVP"
        primaryHref="/items/vintage-denim-jacket"
        primaryLabel="تماس از صفحه آیتم"
        secondaryHref="/feed"
        secondaryLabel="فید کشف"
      />

      <Card>
        <CardContent className="space-y-4 p-5">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="soft">نمونه thread</Badge>
            <span dir="ltr">{threadId}</span>
            <span>·</span>
            <span>خوانده‌نشده برای خریدار: {faNumber(countUnreadMessages(messages, "buyer"))}</span>
          </div>
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[85%] rounded-overlay p-4",
                  message.sender === "buyer"
                    ? "ms-auto bg-brand text-brand-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                <p className="text-xs font-semibold opacity-80">{message.sender === "buyer" ? "خریدار" : "فروشنده"}</p>
                <p className="mt-2 text-sm leading-7">{message.body}</p>
              </div>
            ))}
          </div>
          <form className="flex flex-col gap-2 sm:flex-row" aria-label="ارسال پیام (غیرفعال)">
            <input
              disabled
              className="h-11 flex-1 rounded-field border-line-field border-input bg-field px-3 text-sm text-muted-foreground"
              placeholder="پیام خود را بنویس… (به‌زودی)"
            />
            <button
              type="button"
              disabled
              className="h-11 rounded-control bg-primary px-5 text-sm font-semibold text-primary-foreground opacity-50"
            >
              ارسال
            </button>
          </form>
        </CardContent>
      </Card>
    </AppShell>
  );
}
