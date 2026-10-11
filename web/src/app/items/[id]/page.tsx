import Image from "next/image";
import { notFound } from "next/navigation";
import { getItemById } from "@/lib/items";

const conditionLabels = { NEW_WITH_TAG: "نو با تگ", LIKE_NEW: "در حد نو", GOOD: "خوب", FAIR: "قابل قبول" };

export default async function ItemPage({ params }: { params: { id: string } }) {
  const item = await getItemById(params.id);
  if (!item) notFound();

  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {item.images.map((image) => <Image key={image.id} src={image.url} alt={item.title} width={768} height={576} className="h-72 w-full rounded-[2rem] object-cover" />)}
        </div>
        <div className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-8">
          <a className="text-sm text-stone-400 transition hover:text-white" href="/feed">بازگشت به فید</a>
          <h1 className="text-4xl font-black">{item.title}</h1>
          <p className="leading-8 text-stone-300">{item.description}</p>
          <div className="grid gap-3 md:grid-cols-2">
            <Info title="دسته" value={item.category.name} /><Info title="سایز" value={item.size ?? "ثبت نشده"} />
            <Info title="رنگ" value={item.color ?? "ثبت نشده"} /><Info title="وضعیت" value={conditionLabels[item.condition]} />
            <Info title="شهر" value={item.city} /><Info title="قیمت" value={`${item.price.toLocaleString("fa-IR")} تومان`} />
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <h2 className="font-black">فروشنده</h2>
            <p className="mt-2 text-stone-300">{item.seller.name ?? "فروشنده تیپت"} · {item.seller.city ?? item.city}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {item.seller.whatsappUrl ? <ContactLink href={item.seller.whatsappUrl} className="bg-emerald-300">تماس واتساپ</ContactLink> : <UnavailableContact>واتساپ ثبت نشده</UnavailableContact>}
              {item.seller.telegramUrl ? <ContactLink href={item.seller.telegramUrl} className="bg-sky-300">پیام تلگرام</ContactLink> : <UnavailableContact>تلگرام ثبت نشده</UnavailableContact>}
              {item.seller.contactPhone ? <ContactLink href={`tel:${item.seller.contactPhone}`} className="bg-white">تماس تلفنی</ContactLink> : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactLink({ href, className, children }: { href: string; className: string; children: string }) {
  return <a className={`rounded-2xl px-4 py-2 font-bold text-slate-950 ${className}`} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

function UnavailableContact({ children }: { children: string }) {
  return <span className="cursor-not-allowed rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-stone-400" aria-disabled="true">{children}</span>;
}

function Info({ title, value }: { title: string; value: string }) {
  return <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-stone-400">{title}</p><p className="mt-1 font-black">{value}</p></div>;
}
