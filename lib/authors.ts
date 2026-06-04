export function slugifyText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function splitAuthors(authorText?: string) {
  if (!authorText) return [];

  return authorText
    .split(/,|;|\||&| và | and /gi)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getAuthorSlug(authorName: string) {
  return slugifyText(authorName);
}
