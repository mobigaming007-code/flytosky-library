"use client";

import AdminShell from "@/components/admin/AdminShell";
import { adminRequest } from "@/lib/adminClient";
import Link from "next/link";
import { useMemo, useState } from "react";

type LinkIssue = {
  id: string;
  title: string;
  slug: string;
  resourceType: string;
  status: string;
  issueType: string;
  message: string;
  suggestion: string;
};

type LinkCheckerData = {
  totalResources: number;
  totalIssues: number;
  issues: LinkIssue[];
};

export default function AdminLinkCheckerPage() {
  const [data, setData] = useState<LinkCheckerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [issueFilter, setIssueFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  async function runCheck() {
    setLoading(true);
    setError("");

    try {
      const result = await adminRequest<LinkCheckerData>("adminCheckLinks");
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Không kiểm tra được link.",
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredIssues = useMemo(() => {
    const issues = data?.issues || [];
    const q = keyword.toLowerCase().trim();

    return issues.filter((item) => {
      const matchIssue = !issueFilter || item.issueType === issueFilter;

      const matchKeyword =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q);

      return matchIssue && matchKeyword;
    });
  }, [data, issueFilter, keyword]);

  const issueTypes = useMemo(() => {
    const types = new Set<string>();

    (data?.issues || []).forEach((item) => {
      types.add(item.issueType);
    });

    return Array.from(types).sort();
  }, [data]);

  return (
    <AdminShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            Kiểm tra dữ liệu
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Kiểm tra link lỗi
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
            Công cụ này giúp phát hiện nhanh tài liệu thiếu ảnh bìa, sai
            YouTubeID, thiếu link PDF/audio, slug trùng hoặc chủ đề không tồn
            tại.
          </p>
        </div>

        <button
          type="button"
          onClick={runCheck}
          disabled={loading}
          className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Đang kiểm tra..." : "Chạy kiểm tra"}
        </button>
      </div>

      {error && (
        <div className="mt-8 rounded-3xl bg-red-50 p-5 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {data && (
        <>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <StatCard label="Tổng tài liệu" value={data.totalResources} />
            <StatCard label="Tổng cảnh báo" value={data.totalIssues} />
            <StatCard label="Đang hiển thị" value={filteredIssues.length} />
          </div>

          <div className="mt-8 grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Tìm theo ID, tiêu đề, slug, nội dung lỗi..."
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 md:col-span-2"
            />

            <select
              value={issueFilter}
              onChange={(event) => setIssueFilter(event.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Tất cả loại lỗi</option>
              {issueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 text-sm text-slate-500">
              Tìm thấy <strong>{filteredIssues.length}</strong> cảnh báo
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Tài liệu</th>
                    <th className="px-5 py-4">Loại lỗi</th>
                    <th className="px-5 py-4">Nội dung lỗi</th>
                    <th className="px-5 py-4">Gợi ý sửa</th>
                    <th className="px-5 py-4">Thao tác</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredIssues.map((item, index) => (
                    <tr key={`${item.id}-${item.issueType}-${index}`}>
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">
                          {item.title || "Chưa có tiêu đề"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.id || "Không có ID"} · /{item.slug || "no-slug"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
                          {item.issueType}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-700">
                        {item.message}
                      </td>

                      <td className="px-5 py-4 text-slate-500">
                        {item.suggestion}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-3">
                          {item.id && (
                            <Link
                              href={`/admin/resources/${item.id}`}
                              className="font-semibold text-blue-600"
                            >
                              Sửa
                            </Link>
                          )}

                          {item.slug && (
                            <Link
                              href={`/${item.slug}`}
                              target="_blank"
                              className="font-semibold text-slate-700"
                            >
                              Mở
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredIssues.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-12 text-center text-slate-500"
                      >
                        Không có cảnh báo nào phù hợp. Nếu vừa sửa dữ liệu, hãy
                        bấm “Chạy kiểm tra” lại.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {!data && !loading && !error && (
        <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          Bấm “Chạy kiểm tra” để bắt đầu quét dữ liệu thư viện.
        </div>
      )}
    </AdminShell>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-3xl font-extrabold text-blue-600">{value}</p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}
