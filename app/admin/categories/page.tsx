"use client";

import AdminShell from "@/components/admin/AdminShell";
import { adminRequest } from "@/lib/adminClient";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type AdminCategory = {
  code: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  status: string;
};

type CategoryListData = {
  categories: AdminCategory[];
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    adminRequest<CategoryListData>("adminListCategories")
      .then((data) => setCategories(data.categories))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Không tải được chủ đề."),
      );
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((item) => {
      const keyword = q.toLowerCase().trim();

      return (
        !keyword ||
        item.code.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword) ||
        item.slug.toLowerCase().includes(keyword)
      );
    });
  }, [categories, q]);

  async function setCategoryStatus(
    code: string,
    status: "published" | "hidden",
  ) {
    const confirmText =
      status === "hidden"
        ? "Bạn chắc chắn muốn ẩn chủ đề này?"
        : "Bạn chắc chắn muốn hiện chủ đề này?";

    if (!confirm(confirmText)) return;

    try {
      await adminRequest("adminSetCategoryStatus", {
        code,
        status,
      });

      setCategories((current) =>
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
            Quản lý chủ đề
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Danh sách chủ đề
          </h1>
        </div>

        <Link
          href="/admin/categories/new"
          className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
        >
          Thêm chủ đề
        </Link>
      </div>

      <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <input
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Tìm theo mã, tên hoặc slug..."
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      {error && (
        <div className="mt-6 rounded-3xl bg-red-50 p-5 text-red-700">
          {error}
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 text-sm text-slate-500">
          Tìm thấy <strong>{filteredCategories.length}</strong> chủ đề
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Mã</th>
                <th className="px-5 py-4">Tên chủ đề</th>
                <th className="px-5 py-4">Slug</th>
                <th className="px-5 py-4">Icon</th>
                <th className="px-5 py-4">Thứ tự</th>
                <th className="px-5 py-4">Trạng thái</th>
                <th className="px-5 py-4">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredCategories.map((item) => (
                <tr key={item.code} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-bold text-slate-700">
                    {item.code}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                      {item.description}
                    </p>
                  </td>

                  <td className="px-5 py-4">/{item.slug}</td>
                  <td className="px-5 py-4 text-xl">{item.icon}</td>
                  <td className="px-5 py-4">{item.order}</td>

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
                      <Link
                        href={`/category/${item.slug}`}
                        target="_blank"
                        className="font-semibold text-blue-600"
                      >
                        Mở
                      </Link>

                      <Link
                        href={`/admin/categories/${item.code}`}
                        className="font-semibold text-slate-700"
                      >
                        Sửa
                      </Link>

                      {item.status === "published" ? (
                        <button
                          type="button"
                          onClick={() => setCategoryStatus(item.code, "hidden")}
                          className="font-semibold text-orange-600"
                        >
                          Ẩn
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setCategoryStatus(item.code, "published")
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

              {filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    Không tìm thấy chủ đề phù hợp.
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
