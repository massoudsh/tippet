import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ItemCondition } from "@prisma/client";
import { prisma } from "./prisma";
import { createItem, listItems } from "./items";

const databaseAvailable = Boolean(process.env.DATABASE_URL);
const integration = databaseAvailable ? describe : describe.skip;
const phone = `0912${Date.now().toString().slice(-7)}`;
let userId = "";

integration("item persistence", () => {
  beforeAll(async () => {
    const user = await prisma.user.create({ data: { phone } });
    userId = user.id;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { id: userId } });
    await prisma.$disconnect();
  });

  it("persists a seller listing and retrieves it through filters", async () => {
    const item = await createItem(userId, {
      title: "کت جین تستی",
      description: "یک آگهی تستی برای اعتبارسنجی اتصال Prisma و فیلترها.",
      category: "کت تستی",
      condition: ItemCondition.GOOD,
      price: 1_000_000,
      city: "تهران",
      imageUrls: ["/uploads/items/test-image.jpg"],
    });

    const results = await listItems({ city: "تهران", q: "تستی" });
    expect(results.some((result) => result.id === item.id)).toBe(true);
  });
});
