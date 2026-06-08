"use client";

import AdminShell from "@/components/admin/AdminShell";
import { adminRequest } from "@/lib/adminClient";
import { useEffect, useState } from "react";

type StatsData = {
  summary: {
    totalEvents: number;
    totalViews: number;
    totalReads: number;
    totalListens: number;
    totalOpenOriginal: number;
  };
  byResource: Array<{
    resourceId: string;
    slug: string;
    views: number;
    reads: number;
    listens: number;
    openOriginal: number;
    total: number;
  }>;
};

export default function AdminStatisticsPage() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    setLoading(true);
    setError("");

    try {
      const result = await adminRequest<StatsData>("adminGetStats");
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không tải được thống kê.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            Thống kê thư viện
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Lượt xem / nghe / đọc
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
            Theo dõi lượt xem tài liệu, lượt nghe audio, lượt đọc PDF/sách điện
            tử và lượt mở tài liệu gốc.
          </p>
        </div>

        <button
          type="button"
          onClick={loadStats}
          disabled={loading}
          className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Đang tải..." : "Tải lại"}
        </button>
      </div>

      {error && (
        <div className="mt-8 rounded-3xl bg-red-50 p-5 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {!error && loading && (
        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
          Đang tải thống kê...
        </div>
      )}

      {data && !loading && (
        <>
          <div className="mt-8 grid gap-5 md:grid-cols-5">
            <StatCard label="Tổng sự kiện" value={data.summary.totalEvents} />
            <StatCard label="Lượt xem" value={data.summary.totalViews} />
            <StatCard label="Lượt đọc" value={data.summary.totalReads} />
            <StatCard label="Lượt nghe" value={data.summary.totalListens} />
            <StatCard
              label="Mở nguồn gốc"
              value={data.summary.totalOpenOriginal}
            />
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 text-sm text-slate-500">
              Thống kê theo tài liệu
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Tài liệu</th>
                    <th className="px-5 py-4">Slug</th>
                    <th className="px-5 py-4">Xem</th>
                    <th className="px-5 py-4">Đọc</th>
                    <th className="px-5 py-4">Nghe</th>
                    <th className="px-5 py-4">Mở nguồn</th>
                    <th className="px-5 py-4">Tổng</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {data.byResource.map((item, index) => (
                    <tr key={`${item.resourceId}-${item.slug}-${index}`}>
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {item.resourceId || "-"}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        /{item.slug || "-"}
                      </td>

                      <td className="px-5 py-4">{item.views}</td>
                      <td className="px-5 py-4">{item.reads}</td>
                      <td className="px-5 py-4">{item.listens}</td>
                      <td className="px-5 py-4">{item.openOriginal}</td>

                      <td className="px-5 py-4 font-bold text-blue-600">
                        {item.total}
                      </td>
                    </tr>
                  ))}

                  {data.byResource.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center text-slate-500"
                      >
                        Chưa có dữ liệu thống kê. Cần gắn tracking ở trang chi
                        tiết tài liệu.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
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
