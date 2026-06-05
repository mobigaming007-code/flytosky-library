"use client";

import { useEffect, useState } from "react";
import CoverUploader from "@/components/admin/CoverUploader";

export type ResourceFormValue = {
  id?: string;
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
  pdfUrl: string;
  pdfEmbedUrl: string;
  audioUrl: string;
  audioEmbedUrl: string;
  flipbookUrl: string;
  featured: boolean;
  status: string;
  order: number;
  sourceOrigin: string;
  copyrightNote: string;
};

export type AdminCategoryOption = {
  code: string;
  name: string;
  icon?: string;
  status?: string;
};

type ResourceFormProps = {
  initialValue?: Partial<ResourceFormValue>;
  categories?: AdminCategoryOption[];
  submitLabel: string;
  loading?: boolean;
  onSubmit: (value: ResourceFormValue) => Promise<void>;
};

const emptyValue: ResourceFormValue = {
  slug: "",
  title: "",
  shortDescription: "",
  detailDescription: "",
  type: "combo",
  categoryCode: "",
  tags: "",
  author: "",
  publishYear: "",
  language: "vi",
  coverUrl: "",
  youtubeId: "",
  pdfUrl: "",
  pdfEmbedUrl: "",
  audioUrl: "",
  audioEmbedUrl: "",
  flipbookUrl: "",
  featured: false,
  status: "published",
  order: 9999,
  sourceOrigin: "",
  copyrightNote: "",
};

export default function ResourceForm({
  initialValue,
  categories = [],
  submitLabel,
  loading = false,
  onSubmit,
}: ResourceFormProps) {
  const [form, setForm] = useState<ResourceFormValue>({
    ...emptyValue,
    ...initialValue,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      ...emptyValue,
      ...initialValue,
    });
  }, [initialValue]);

  function update<K extends keyof ResourceFormValue>(
    key: K,
    value: ResourceFormValue[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function autoSlug() {
    update("slug", slugify(form.title));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!form.title.trim()) {
      setError("Vui lòng nhập tiêu đề tài liệu.");
      return;
    }

    if (!form.slug.trim()) {
      setError("Vui lòng nhập slug hoặc bấm tạo tự động.");
      return;
    }

    if (!form.categoryCode.trim()) {
      setError("Vui lòng nhập mã chủ đề.");
      return;
    }

    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu tài liệu thất bại.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
    >
      {error && (
        <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Tiêu đề" required>
          <input
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Nhập tiêu đề tài liệu"
          />
        </Field>

        <Field label="Slug" required>
          <div className="flex gap-2">
            <input
              value={form.slug}
              onChange={(event) => update("slug", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="ten-tai-lieu"
            />

            <button
              type="button"
              onClick={autoSlug}
              className="shrink-0 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-bold text-white"
            >
              Tạo
            </button>
          </div>
        </Field>

        <Field label="Loại tài liệu">
          <select
            value={form.type}
            onChange={(event) => update("type", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="pdf">PDF</option>
            <option value="combo">Combo</option>
          </select>
        </Field>

        <Field label="Chủ đề" required>
          <select
            value={form.categoryCode}
            onChange={(event) => update("categoryCode", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">Chọn chủ đề</option>

            {categories
              .filter((category) => category.status !== "hidden")
              .map((category) => (
                <option key={category.code} value={category.code}>
                  {category.icon ? `${category.icon} ` : ""}
                  {category.name} - {category.code}
                </option>
              ))}
          </select>

          {form.categoryCode && (
            <p className="mt-2 text-xs text-slate-500">
              Vui lòng lựa chọn đúng chủ đề phù hợp với tài liệu. Mã chủ đề đã
              chọn: <span className="font-bold">{form.categoryCode}</span>
            </p>
          )}
        </Field>

        <Field label="Tác giả / Nguồn">
          <input
            value={form.author}
            onChange={(event) => update("author", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Có thể nhập nhiều người, cách nhau bằng dấu phẩy"
          />
        </Field>

        <Field label="Ngôn ngữ">
          <select
            value={form.language}
            onChange={(event) => update("language", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">Tiếng Anh</option>
            <option value="fr">Tiếng Pháp</option>
            <option value="ja">Tiếng Nhật</option>
            <option value="ko">Tiếng Hàn</option>
            <option value="zh">Tiếng Trung</option>
          </select>
        </Field>

        <Field label="Năm xuất bản">
          <input
            value={form.publishYear}
            onChange={(event) => update("publishYear", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="2026"
          />
        </Field>

        <Field label="Thứ tự">
          <input
            type="number"
            value={form.order}
            onChange={(event) => update("order", Number(event.target.value))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </Field>

        <Field label="Ảnh bìa">
          <CoverUploader
            value={form.coverUrl}
            objectType="resource"
            objectId={form.id || form.slug || form.title}
            onChange={(url) => update("coverUrl", url)}
          />

          <input
            value={form.coverUrl}
            onChange={(event) => update("coverUrl", event.target.value)}
            className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Hoặc dán link ảnh bìa thủ công"
          />
        </Field>

        <Field label="Youtube ID">
          <input
            value={form.youtubeId}
            onChange={(event) => update("youtubeId", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="VD: bO5VK2PSmi8"
          />
        </Field>

        <Field label="PDF Link">
          <input
            value={form.pdfUrl}
            onChange={(event) => update("pdfUrl", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </Field>

        <Field label="PDF Embed Link">
          <input
            value={form.pdfEmbedUrl}
            onChange={(event) => update("pdfEmbedUrl", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </Field>

        <Field label="Audio Link nguồn">
          <input
            value={form.audioUrl}
            onChange={(event) => update("audioUrl", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </Field>

        <Field label="Audio Embed Link .mp3">
          <input
            value={form.audioEmbedUrl}
            onChange={(event) => update("audioEmbedUrl", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </Field>

        <Field label="Flipbook / Heyzine / Canva">
          <input
            value={form.flipbookUrl}
            onChange={(event) => update("flipbookUrl", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </Field>

        <Field label="Nguồn gốc">
          <input
            value={form.sourceOrigin}
            onChange={(event) => update("sourceOrigin", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5">
        <Field label="Mô tả ngắn">
          <textarea
            value={form.shortDescription}
            onChange={(event) => update("shortDescription", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            rows={3}
          />
        </Field>

        <Field label="Mô tả chi tiết">
          <textarea
            value={form.detailDescription}
            onChange={(event) =>
              update("detailDescription", event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            rows={6}
          />
        </Field>

        <Field label="Tags">
          <input
            value={form.tags}
            onChange={(event) => update("tags", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="giáo dục, cộng đồng, trẻ em..."
          />
        </Field>

        <Field label="Ghi chú bản quyền">
          <textarea
            value={form.copyrightNote}
            onChange={(event) => update("copyrightNote", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            rows={4}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => update("featured", event.target.checked)}
          />
          Tài liệu nổi bật
        </label>

        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          Trạng thái
          <select
            value={form.status}
            onChange={(event) => update("status", event.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2"
          >
            <option value="published">published</option>
            <option value="hidden">hidden</option>
          </select>
        </label>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-blue-600 px-7 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Đang lưu..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <p className="mb-2 text-sm font-bold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      {children}
    </label>
  );
}

function slugify(text: string) {
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
