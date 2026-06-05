"use client";

import AdminShell from "@/components/admin/AdminShell";
import { adminRequest } from "@/lib/adminClient";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type AdminResource = {
  id: string;
  slug: string;
  title: string;
  type: string;
  categoryCode: string;
  author: string;
  status: string;
  featured: boolean;
  hasVideo: boolean;
  hasPdf: boolean;
  hasAudio: boolean;
  hasFlipbook: boolean;
};

type ResourceListData = {
  resources: AdminResource[];
};

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<AdminResource[]>([]);
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    adminRequest<ResourceListData>("adminListResources")
      .then((data) => setResources(data.resources))
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "Không tải được tài liệu.",
        ),
      );
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const keyword = q.toLowerCase().trim();

      const matchKeyword =
        !keyword ||
        item.title.toLowerCase().includes(keyword) ||
        item.id.toLowerCase().includes(keyword) ||
        item.slug.toLowerCase().includes(keyword) ||
        item.author.toLowerCase().includes(keyword);

      const matchType = !type || item.type === type;

      return matchKeyword && matchType;
    });
  }, [resources, q, type]);

  async function setResourceStatus(id: string, status: "published" | "hidden") {
    const confirmText =
      status === "hidden"
        ? "Bạn chắc chắn muốn ẩn tài liệu này?"
        : "Bạn chắc chắn muốn hiện tài liệu này?";

    if (!confirm(confirmText)) return;

    try {
      await adminRequest("adminSetResourceStatus", {
        id,
        status,
      });

      setResources((current) =>
        current.map((item) => (item.id === id ? { ...item, status } : item)),
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
            Quản lý tài liệu
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Danh sách tài liệu
          </h1>
        </div>

        <Link
          href="/admin/resources/new"
          className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
        >
          Thêm tài liệu
        </Link>
      </div>

      <div className="mt-8 grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3">
        <input
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Tìm theo tiêu đề, ID, slug, tác giả..."
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 md:col-span-2"
        />

        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">Tất cả loại</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="pdf">PDF</option>
          <option value="combo">Combo</option>
        </select>
      </div>

      {error && (
        <div className="mt-6 rounded-3xl bg-red-50 p-5 text-red-700">
          {error}
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 text-sm text-slate-500">
          Tìm thấy <strong>{filteredResources.length}</strong> tài liệu
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">ID</th>
                <th className="px-5 py-4">Tiêu đề</th>
                <th className="px-5 py-4">Loại</th>
                <th className="px-5 py-4">Chủ đề</th>
                <th className="px-5 py-4">Tác giả</th>
                <th className="px-5 py-4">Trạng thái</th>
                <th className="px-5 py-4">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredResources.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-slate-700">
                    {item.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">/{item.slug}</p>
                  </td>

                  <td className="px-5 py-4">{item.type}</td>
                  <td className="px-5 py-4">{item.categoryCode}</td>
                  <td className="px-5 py-4">{item.author}</td>

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
                        href={`/${item.slug}`}
                        target="_blank"
                        className="font-semibold text-blue-600"
                      >
                        Mở
                      </Link>

                      <Link
                        href={`/admin/resources/${item.id}`}
                        className="font-semibold text-slate-700"
                      >
                        Sửa
                      </Link>

                      {item.status === "published" ? (
                        <button
                          type="button"
                          onClick={() => setResourceStatus(item.id, "hidden")}
                          className="font-semibold text-orange-600"
                        >
                          Ẩn
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setResourceStatus(item.id, "published")
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

              {filteredResources.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    Không tìm thấy tài liệu phù hợp.
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
