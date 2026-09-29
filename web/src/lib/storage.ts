import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { z } from "zod";

const maxImageBytes = 8 * 1024 * 1024;
const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const uploadResponseSchema = z.object({ url: z.string().url() });

export async function storeItemImage(file: File) {
  validateImage(file);

  if (process.env.STORAGE_UPLOAD_ENDPOINT) {
    return uploadToRemoteStorage(file);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("فضای ذخیره‌سازی production پیکربندی نشده است.");
  }

  return uploadToLocalStorage(file);
}

function validateImage(file: File) {
  if (!allowedMimeTypes.has(file.type)) throw new Error("فرمت تصویر باید JPEG، PNG یا WebP باشد.");
  if (file.size === 0 || file.size > maxImageBytes) throw new Error("حجم تصویر باید حداکثر ۸ مگابایت باشد.");
}

async function uploadToLocalStorage(file: File) {
  const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const filename = `${randomUUID()}.${extension}`;
  const relativePath = `/uploads/items/${filename}`;
  const destination = path.join(process.cwd(), "public", relativePath);

  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, Buffer.from(await file.arrayBuffer()), { flag: "wx" });

  return relativePath;
}

async function uploadToRemoteStorage(file: File) {
  const formData = new FormData();
  formData.set("file", file);
  const response = await fetch(process.env.STORAGE_UPLOAD_ENDPOINT!, {
    method: "POST",
    headers: process.env.STORAGE_UPLOAD_TOKEN
      ? { authorization: `Bearer ${process.env.STORAGE_UPLOAD_TOKEN}` }
      : undefined,
    body: formData,
  });

  if (!response.ok) throw new Error("آپلود تصویر به فضای ذخیره‌سازی ناموفق بود.");
  return uploadResponseSchema.parse(await response.json()).url;
}
