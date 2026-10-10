import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateStyleProfileCompleteness } from "@/lib/onboarding";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "ورود لازم است." }, { status: 401 });

  const profile = await prisma.styleProfile.findUnique({ where: { userId: user.id } });
  if (!profile) return NextResponse.json({ profile: null, completeness: 0 });

  const sizes = readSizes(profile.sizeInfo);
  const completeness = calculateStyleProfileCompleteness({
    sizes,
    categories: profile.preferredCategories,
    colors: profile.preferredColors,
    budgetMin: profile.budgetMin ?? undefined,
    budgetMax: profile.budgetMax ?? undefined,
    inspirationCount: 0,
  });

  return NextResponse.json({
    completeness,
    profile: {
      sizes,
      categories: profile.preferredCategories,
      colors: profile.preferredColors,
      budgetMin: profile.budgetMin,
      budgetMax: profile.budgetMax,
      updatedAt: profile.updatedAt,
    },
  });
}

function readSizes(sizeInfo: unknown): string[] {
  if (sizeInfo && typeof sizeInfo === "object" && "sizes" in sizeInfo) {
    const value = (sizeInfo as { sizes?: unknown }).sizes;
    if (Array.isArray(value)) return value.filter((entry): entry is string => typeof entry === "string");
  }
  return [];
}
