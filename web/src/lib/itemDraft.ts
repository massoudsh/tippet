export interface ItemDraftInput {
  title: string;
  description: string;
  imageCount: number;
}

export function suggestItemAttributes(input: ItemDraftInput) {
  const text = `${input.title} ${input.description}`.toLowerCase();

  return {
    category: text.includes("کت") ? "کت" : text.includes("هودی") ? "هودی" : "لباس",
    color: text.includes("آبی") || text.includes("جین") ? "آبی" : text.includes("مشکی") ? "مشکی" : "نامشخص",
    condition: text.includes("نو") ? "در حد نو" : text.includes("سالم") ? "خوب" : "نیازمند بررسی",
    size: text.includes("سایز m") || text.includes(" m ") ? "M" : "نیازمند تأیید",
    completeness: Math.min(40 + input.imageCount * 15 + (input.description.length > 40 ? 30 : 0), 100),
  };
}
