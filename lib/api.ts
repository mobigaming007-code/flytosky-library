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

  return normalizeApiData(json.data) as T;
}

function normalizeApiData(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data.map((item) => normalizeResourceLikeObject(item));
  }

  if (isObject(data)) {
    const normalized: Record<string, unknown> = { ...data };

    if (Array.isArray(normalized.categories)) {
      normalized.categories = normalized.categories.map((item) =>
        normalizeResourceLikeObject(item),
      );
    }

    if (Array.isArray(normalized.resources)) {
      normalized.resources = normalized.resources.map((item) =>
        normalizeResourceLikeObject(item),
      );
    }

    if (Array.isArray(normalized.featuredResources)) {
      normalized.featuredResources = normalized.featuredResources.map((item) =>
        normalizeResourceLikeObject(item),
      );
    }

    if (Array.isArray(normalized.latestVideos)) {
      normalized.latestVideos = normalized.latestVideos.map((item) =>
        normalizeResourceLikeObject(item),
      );
    }

    if (Array.isArray(normalized.latestPdfs)) {
      normalized.latestPdfs = normalized.latestPdfs.map((item) =>
        normalizeResourceLikeObject(item),
      );
    }

    if (Array.isArray(normalized.latestAudios)) {
      normalized.latestAudios = normalized.latestAudios.map((item) =>
        normalizeResourceLikeObject(item),
      );
    }

    return normalizeResourceLikeObject(normalized);
  }

  return data;
}

function normalizeResourceLikeObject(item: unknown): unknown {
  if (!isObject(item)) return item;

  const resource = { ...item } as Record<string, unknown>;

  const pdfUrl = normalizeText(resource.pdfUrl);
  const pdfEmbedUrl = normalizeText(resource.pdfEmbedUrl);

  if (pdfUrl || pdfEmbedUrl) {
    resource.pdfUrl = pdfUrl;
    resource.pdfEmbedUrl = toGoogleDrivePreviewUrl(pdfEmbedUrl || pdfUrl);
    resource.hasPdf = true;
  }

  const youtubeId = normalizeText(resource.youtubeId);

  if (youtubeId && !normalizeText(resource.youtubeEmbedUrl)) {
    resource.youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeId}`;
  }

  const audioUrl = normalizeText(resource.audioUrl);
  const audioEmbedUrl = normalizeText(resource.audioEmbedUrl);

  if (audioUrl || audioEmbedUrl) {
    resource.audioUrl = audioUrl;
    resource.audioEmbedUrl = audioEmbedUrl || audioUrl;
    resource.hasAudio = true;
  }

  return resource;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeText(value: unknown) {
  return String(value || "").trim();
}

function extractGoogleDriveFileId(url?: string) {
  if (!url) return "";

  const value = String(url).trim();

  const fileMatch = value.match(/\/file\/d\/([^/]+)/);
  if (fileMatch?.[1]) return fileMatch[1];

  const idMatch = value.match(/[?&]id=([^&]+)/);
  if (idMatch?.[1]) return idMatch[1];

  const ucMatch = value.match(/\/uc\?export=download&id=([^&]+)/);
  if (ucMatch?.[1]) return ucMatch[1];

  return "";
}

function toGoogleDrivePreviewUrl(url?: string) {
  if (!url) return "";

  const value = String(url).trim();

  if (!value) return "";

  if (
    value.includes("drive.google.com/file/d/") &&
    value.includes("/preview")
  ) {
    return value;
  }

  const fileId = extractGoogleDriveFileId(value);

  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  return value;
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
