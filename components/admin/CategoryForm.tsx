"use client";

import { useEffect, useState } from "react";
import CoverUploader from "@/components/admin/CoverUploader";

export type CategoryFormValue = {
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

type CategoryFormProps = {
  initialValue?: Partial<CategoryFormValue>;
  submitLabel: string;
  loading?: boolean;
  onSubmit: (value: CategoryFormValue) => Promise<void>;
};

const emptyValue: CategoryFormValue = {
  code: "",
  slug: "",
  name: "",
  description: "",
  coverUrl: "",
  icon: "📚",
  color: "#2563EB",
  order: 9999,
  status: "published",
};

export default function CategoryForm({
  initialValue,
  submitLabel,
  loading = false,
  onSubmit,
}: CategoryFormProps) {
  const [form, setForm] = useState<CategoryFormValue>({
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

  function update<K extends keyof CategoryFormValue>(
    key: K,
    value: CategoryFormValue[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function autoSlug() {
    update("slug", slugify(form.name));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!form.code.trim()) {
      setError("Vui lòng nhập mã chủ đề.");
      return;
    }

    if (!form.name.trim()) {
      setError("Vui lòng nhập tên chủ đề.");
      return;
    }

    if (!form.slug.trim()) {
      setError("Vui lòng nhập slug hoặc bấm tạo tự động.");
      return;
    }

    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu chủ đề thất bại.");
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
        <Field label="Mã chủ đề" required>
          <input
            value={form.code}
            onChange={(event) =>
              update("code", event.target.value.toUpperCase())
            }
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="VD: TE"
          />
        </Field>

        <Field label="Tên chủ đề" required>
          <input
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="VD: Trẻ em"
          />
        </Field>

        <Field label="Slug" required>
          <div className="flex gap-2">
            <input
              value={form.slug}
              onChange={(event) => update("slug", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="tre-em"
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

        <Field label="Icon">
          <input
            value={form.icon}
            onChange={(event) => update("icon", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="📚"
          />
        </Field>

        <Field label="Màu sắc">
          <div className="flex gap-3">
            <input
              type="color"
              value={form.color || "#2563EB"}
              onChange={(event) => update("color", event.target.value)}
              className="h-12 w-16 rounded-xl border border-slate-200"
            />

            <input
              value={form.color}
              onChange={(event) => update("color", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="#2563EB"
            />
          </div>
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
            objectType="category"
            objectId={form.code || form.slug || form.name}
            onChange={(url) => update("coverUrl", url)}
          />

          <input
            value={form.coverUrl}
            onChange={(event) => update("coverUrl", event.target.value)}
            className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Hoặc dán link ảnh bìa thủ công"
          />
        </Field>

        <Field label="Trạng thái">
          <select
            value={form.status}
            onChange={(event) => update("status", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="published">published</option>
            <option value="hidden">hidden</option>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Mô tả">
          <textarea
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            rows={5}
          />
        </Field>
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
