import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const maxImageBytes = 8 * 1024 * 1024;
const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function storeItemImage(file: File) {
  if (!allowedMimeTypes.has(file.type)) throw new Error("فرمت تصویر باید JPEG، PNG یا WebP باشد.");
  if (file.size === 0 || file.size > maxImageBytes) throw new Error("حجم تصویر باید حداکثر ۸ مگابایت باشد.");

  const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const filename = `${randomUUID()}.${extension}`;
  const relativePath = `/uploads/items/${filename}`;
  const destination = path.join(process.cwd(), "public", relativePath);

  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, Buffer.from(await file.arrayBuffer()), { flag: "wx" });

  return relativePath;
}
