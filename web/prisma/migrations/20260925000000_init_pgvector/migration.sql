CREATE EXTENSION IF NOT EXISTS vector;

CREATE TYPE "UserRole" AS ENUM ('BUYER', 'SELLER', 'BOTH');
CREATE TYPE "ItemCondition" AS ENUM ('NEW_WITH_TAG', 'LIKE_NEW', 'GOOD', 'FAIR');
CREATE TYPE "ItemStatus" AS ENUM ('ACTIVE', 'RESERVED', 'SOLD', 'REMOVED');
CREATE TYPE "InteractionType" AS ENUM ('VIEW', 'LIKE', 'DISLIKE', 'SAVE', 'CONTACT_SELLER');

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "name" TEXT,
  "role" "UserRole" NOT NULL DEFAULT 'BUYER',
  "city" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StyleProfile" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "sizeInfo" JSONB,
  "budgetMin" INTEGER,
  "budgetMax" INTEGER,
  "preferredCategories" TEXT[],
  "preferredColors" TEXT[],
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "StyleProfile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Category" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "parentId" TEXT,
  CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StyleTag" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  CONSTRAINT "StyleTag_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ItemStyleTag" (
  "itemId" TEXT NOT NULL,
  "styleTagId" TEXT NOT NULL,
  "confidence" DOUBLE PRECISION,
  CONSTRAINT "ItemStyleTag_pkey" PRIMARY KEY ("itemId", "styleTagId")
);

CREATE TABLE "Item" (
  "id" TEXT NOT NULL,
  "sellerId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "categoryId" TEXT NOT NULL,
  "brand" TEXT,
  "size" TEXT,
  "condition" "ItemCondition" NOT NULL,
  "color" TEXT,
  "material" TEXT,
  "price" INTEGER NOT NULL,
  "city" TEXT NOT NULL,
  "status" "ItemStatus" NOT NULL DEFAULT 'ACTIVE',
  "aiExtractedTags" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ItemImage" (
  "id" TEXT NOT NULL,
  "itemId" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "ItemImage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Interaction" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "itemId" TEXT NOT NULL,
  "type" "InteractionType" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE UNIQUE INDEX "StyleProfile_userId_key" ON "StyleProfile"("userId");
CREATE UNIQUE INDEX "StyleTag_name_key" ON "StyleTag"("name");
CREATE INDEX "Interaction_userId_createdAt_idx" ON "Interaction"("userId", "createdAt");
CREATE INDEX "Interaction_itemId_idx" ON "Interaction"("itemId");

ALTER TABLE "StyleProfile" ADD CONSTRAINT "StyleProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ItemStyleTag" ADD CONSTRAINT "ItemStyleTag_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ItemStyleTag" ADD CONSTRAINT "ItemStyleTag_styleTagId_fkey" FOREIGN KEY ("styleTagId") REFERENCES "StyleTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Item" ADD CONSTRAINT "Item_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ItemImage" ADD CONSTRAINT "ItemImage_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
