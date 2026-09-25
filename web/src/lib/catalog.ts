export interface CatalogItem {
  id: string;
  title: string;
  category: string;
  brand?: string;
  size: string;
  condition: "نو با تگ" | "در حد نو" | "خوب" | "قابل قبول";
  color: string;
  price: number;
  city: string;
  seller: {
    name: string;
    joinedAt: string;
    activeItems: number;
    contactLinks: {
      whatsapp?: string;
      telegram?: string;
    };
  };
  tags: string[];
}

export const catalogItems: CatalogItem[] = [
  {
    id: "vintage-denim-jacket",
    title: "کت جین وینتیج",
    category: "کت",
    brand: "Levi's",
    size: "M",
    condition: "در حد نو",
    color: "آبی",
    price: 1480000,
    city: "تهران",
    seller: {
      name: "بوتیک ری‌استایل",
      joinedAt: "۱۴۰۵/۰۲",
      activeItems: 18,
      contactLinks: {
        whatsapp: "https://wa.me/989121234567",
        telegram: "https://t.me/tipet_seller",
      },
    },
    tags: ["وینتیج", "استریت‌ویر", "جین", "آبی"],
  },
  {
    id: "saffron-trench",
    title: "بارانی زعفرانی",
    category: "بارانی",
    size: "L",
    condition: "خوب",
    color: "زعفرانی",
    price: 2100000,
    city: "تهران",
    seller: {
      name: "کمد شمال شهر",
      joinedAt: "۱۴۰۴/۱۲",
      activeItems: 11,
      contactLinks: { telegram: "https://t.me/tipet_seller" },
    },
    tags: ["مینیمال", "زعفرانی", "بارانی"],
  },
  {
    id: "streetwear-hoodie",
    title: "هودی استریت‌ویر",
    category: "هودی",
    brand: "Carhartt",
    size: "Free",
    condition: "خوب",
    color: "مشکی",
    price: 920000,
    city: "تهران",
    seller: {
      name: "استودیو تکرنگ",
      joinedAt: "۱۴۰۵/۰۱",
      activeItems: 9,
      contactLinks: { whatsapp: "https://wa.me/989121234567" },
    },
    tags: ["استریت‌ویر", "مشکی", "روزمره"],
  },
];
