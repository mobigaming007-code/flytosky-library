"use client";

import AdminShell from "@/components/admin/AdminShell";
import { adminRequest } from "@/lib/adminClient";
import { useEffect, useMemo, useState } from "react";

type Author = {
  code: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatarUrl: string;
  website: string;
  email: string;
  order: number;
  status: string;
};

type AuthorListData = {
  authors: Author[];
};

const emptyAuthor: Author = {
  code: "",
  name: "",
  slug: "",
  role: "",
  bio: "",
  avatarUrl: "",
  website: "",
  email: "",
  order: 9999,
  status: "published",
};

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [form, setForm] = useState<Author>(emptyAuthor);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAuthors();
  }, []);

  async function loadAuthors() {
    setLoading(true);

    try {
      const data = await adminRequest<AuthorListData>("adminListAuthors");
      setAuthors(data.authors || []);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Không tải được tác giả.");
    } finally {
      setLoading(false);
    }
  }

  const filteredAuthors = useMemo(() => {
    const q = keyword.toLowerCase().trim();

    return authors.filter((item) => {
      return (
        !q ||
        item.code.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q)
      );
    });
  }, [authors, keyword]);

  function update<K extends keyof Author>(key: K, value: Author[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function editAuthor(author: Author) {
    setForm(author);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(emptyAuthor);
  }

  function autoSlug() {
    update("slug", slugify(form.name));
  }

  async function saveAuthor(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.code.trim()) {
      alert("Vui lòng nhập mã tác giả.");
      return;
    }

    if (!form.name.trim()) {
      alert("Vui lòng nhập tên tác giả.");
      return;
    }

    setSaving(true);

    try {
      await adminRequest("adminSaveAuthor", {
        data: form,
      });

      await loadAuthors();
      resetForm();
      alert("Đã lưu tác giả.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Không lưu được tác giả.");
    } finally {
      setSaving(false);
    }
  }

  async function setAuthorStatus(code: string, status: "published" | "hidden") {
    if (
      !confirm(status === "hidden" ? "Ẩn tác giả này?" : "Hiện tác giả này?")
    ) {
      return;
    }

    try {
      await adminRequest("adminSetAuthorStatus", {
        code,
        status,
      });

      setAuthors((current) =>
        current.map((item) =>
          item.code === code ? { ...item, status } : item,
        ),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Không đổi được trạng thái.");
    }
  }

  return (
    <AdminShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            Quản lý tác giả
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Tác giả / đơn vị tham gia
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
            Quản lý danh sách tác giả, đơn vị biên soạn, người đọc audio hoặc
            đối tác nội dung của thư viện số.
          </p>
        </div>
      </div>

      <form
        onSubmit={saveAuthor}
        className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-extrabold text-slate-900">
          {form.code ? "Thêm / sửa tác giả" : "Thêm tác giả"}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="Mã tác giả">
            <input
              value={form.code}
              onChange={(event) =>
                update("code", event.target.value.toUpperCase())
              }
              className="input"
              placeholder="VD: TG001"
            />
          </Field>

          <Field label="Tên tác giả">
            <input
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              className="input"
              placeholder="VD: Fly To Sky"
            />
          </Field>

          <Field label="Slug">
            <div className="flex gap-2">
              <input
                value={form.slug}
                onChange={(event) => update("slug", event.target.value)}
                className="input"
                placeholder="fly-to-sky"
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

          <Field label="Vai trò">
            <input
              value={form.role}
              onChange={(event) => update("role", event.target.value)}
              className="input"
              placeholder="Tác giả, Biên soạn, Đơn vị, Người đọc..."
            />
          </Field>

          <Field label="Ảnh đại diện">
            <input
              value={form.avatarUrl}
              onChange={(event) => update("avatarUrl", event.target.value)}
              className="input"
              placeholder="Link ảnh"
            />
          </Field>

          <Field label="Website">
            <input
              value={form.website}
              onChange={(event) => update("website", event.target.value)}
              className="input"
              placeholder="https://..."
            />
          </Field>

          <Field label="Email">
            <input
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              className="input"
              placeholder="email@example.com"
            />
          </Field>

          <Field label="Thứ tự">
            <input
              type="number"
              value={form.order}
              onChange={(event) => update("order", Number(event.target.value))}
              className="input"
            />
          </Field>

          <Field label="Trạng thái">
            <select
              value={form.status}
              onChange={(event) => update("status", event.target.value)}
              className="input"
            >
              <option value="published">published</option>
              <option value="hidden">hidden</option>
            </select>
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Giới thiệu">
            <textarea
              value={form.bio}
              onChange={(event) => update("bio", event.target.value)}
              className="input min-h-32"
              placeholder="Giới thiệu ngắn về tác giả/đơn vị..."
            />
          </Field>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Đang lưu..." : "Lưu tác giả"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="rounded-full bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200"
          >
            Nhập mới
          </button>
        </div>
      </form>

      <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Tìm theo mã, tên, slug, vai trò..."
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 text-sm text-slate-500">
          {loading ? (
            "Đang tải..."
          ) : (
            <>
              Tìm thấy <strong>{filteredAuthors.length}</strong> tác giả
            </>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Mã</th>
                <th className="px-5 py-4">Tên</th>
                <th className="px-5 py-4">Vai trò</th>
                <th className="px-5 py-4">Slug</th>
                <th className="px-5 py-4">Trạng thái</th>
                <th className="px-5 py-4">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredAuthors.map((item) => (
                <tr key={item.code}>
                  <td className="px-5 py-4 font-bold text-slate-700">
                    {item.code}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                      {item.bio}
                    </p>
                  </td>

                  <td className="px-5 py-4">{item.role || "-"}</td>
                  <td className="px-5 py-4">/{item.slug}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.status === "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => editAuthor(item)}
                        className="font-semibold text-blue-600"
                      >
                        Sửa
                      </button>

                      {item.status === "published" ? (
                        <button
                          type="button"
                          onClick={() => setAuthorStatus(item.code, "hidden")}
                          className="font-semibold text-orange-600"
                        >
                          Ẩn
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setAuthorStatus(item.code, "published")
                          }
                          className="font-semibold text-green-600"
                        >
                          Hiện
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredAuthors.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    Không tìm thấy tác giả phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <p className="mb-2 text-sm font-bold text-slate-700">{label}</p>
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
