const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Resource = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  detailDescription: string;
  type: string;
  categoryCode: string;
  tags: string;
  author: string;
  publishYear: string;
  language: string;
  coverUrl: string;
  youtubeId: string;
  youtubeEmbedUrl: string;
  pdfUrl: string;
  pdfEmbedUrl: string;
  audioUrl: string;
  audioEmbedUrl: string;
  flipbookUrl: string;
  sourceOrigin: string;
  copyrightNote: string;
  featured: boolean;
  status: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  hasVideo: boolean;
  hasPdf: boolean;
  hasAudio: boolean;
  hasFlipbook: boolean;
};

export type Category = {
  code: string;
  slug: string;
  name: string;
  description: string;
  coverUrl: string;
  icon: string;
  color: string;
  order: number;
  status: string;
};

export type HomeData = {
  config: Record<string, string | number | boolean>;
  categories: Category[];
  featuredResources: Resource[];
  latestVideos: Resource[];
  latestPdfs: Resource[];
  latestAudios: Resource[];
};

async function fetchApi<T>(
  action: string,
  params: Record<string, string | number | undefined> = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error("Thiếu NEXT_PUBLIC_API_URL trong file .env.local");
  }

  const url = new URL(API_URL);
  url.searchParams.set("action", action);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API lỗi: ${res.status}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error || "API trả về lỗi không xác định");
  }

  return json.data;
}

export async function getHomeData() {
  return fetchApi<HomeData>("getHomeData");
}

export async function getCategories() {
  return fetchApi<Category[]>("getCategories");
}

export async function getResources(
  params: {
    q?: string;
    type?: string;
    category?: string;
    language?: string;
    limit?: number;
  } = {},
) {
  return fetchApi<Resource[]>("getResources", params);
}

export async function getResourceBySlug(slug: string) {
  return fetchApi<Resource>("getResourceBySlug", { slug });
}
