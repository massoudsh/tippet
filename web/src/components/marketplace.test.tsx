import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "./ui/button";
import { GlassSurface } from "./ui/card";
import { ItemCard } from "./items/item-card";
import { ImageGallery } from "./items/image-gallery";
import { ItemActions } from "./items/item-actions";
import { OutfitBoard } from "./items/outfit-board";
import { SiteHeader } from "./layout/site-header";
import { AppShell } from "./layout/app-shell";

describe("marketplace server markup", () => {
  it("disables and announces loading buttons", () => {
    const html = renderToStaticMarkup(<Button loading>ذخیره</Button>);
    expect(html).toContain('disabled=""');
    expect(html).toContain('aria-busy="true"');
  });
  it.each(["subtle", "medium", "elevated"] as const)("renders %s glass content", (variant) => {
    expect(renderToStaticMarkup(<GlassSurface variant={variant}>کالا</GlassSurface>)).toContain("کالا");
  });
  it("does not invent a match percentage and uses stable lazy images", () => {
    const html = renderToStaticMarkup(<ItemCard href="/items/test" title="کت" meta="M" price={100} imageUrl="/uploads/items/test.jpg" />);
    expect(html).not.toContain("تطابق");
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('width="640"');
    expect(html).toContain('alt="کت"');
  });
  it("shows gallery empty state and labelled zoom controls", () => {
    expect(renderToStaticMarkup(<ImageGallery images={[]} title="کت" />)).toContain("تصویری ثبت نشده");
    const html = renderToStaticMarkup(<ImageGallery images={[{ id: "1", url: "/uploads/items/a.jpg" }]} title="کت" />);
    expect(html).toContain('aria-label="بزرگ‌نمایی تصویر"');
    expect(html).toContain("<dialog");
  });
  it("does not offer contact links on unavailable items", () => {
    const html = renderToStaticMarkup(<ItemActions itemId="1" available={false} whatsappUrl="https://wa.me/123" />);
    expect(html).not.toContain('href="https://wa.me/123"');
    expect(html).toContain("در دسترس نیست");
  });
  it("does not claim a manual outfit is AI-generated", () => {
    const html = renderToStaticMarkup(<OutfitBoard items={[]} />);
    expect(html).toContain("این ست پیشنهاد AI نیست");
    expect(html).toContain("آگهی فعالی");
  });
  it.each(["closet", "outfits"] as const)("marks the %s route active", (active) => {
    const html = renderToStaticMarkup(<SiteHeader active={active} />);
    expect(html.match(/aria-current="page"/g)).toHaveLength(1);
  });
  it("has keyboard skip navigation and no invented active route", () => {
    const html = renderToStaticMarkup(<AppShell><h1>تیپت</h1></AppShell>);
    expect(html).toContain('href="#main-content"');
    expect(html).toContain('id="main-content"');
    expect(renderToStaticMarkup(<SiteHeader />)).not.toContain('aria-current="page"');
  });
});
