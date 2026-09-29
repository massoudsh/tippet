import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { itemInputSchema, itemSearchSchema, createItem, listItems } from "@/lib/items";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const filters = itemSearchSchema.parse(Object.fromEntries(url.searchParams));
    return NextResponse.json({ items: await listItems(filters) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "فیلتر نامعتبر است." }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "ورود لازم است." }, { status: 401 });

  try {
    const input = itemInputSchema.parse(await request.json());
    const item = await createItem(user.id, input);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "ایجاد آگهی ناموفق بود." }, { status: 400 });
  }
}
