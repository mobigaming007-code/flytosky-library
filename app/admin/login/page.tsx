"use client";

import {
  adminRequest,
  clearAdminToken,
  type AdminUser,
} from "@/lib/adminClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DashboardData = {
  user: AdminUser;
  stats: {
    totalResources: number;
    totalVideos: number;
    totalAudios: number;
    totalPdfs: number;
    totalCategories: number;
    totalFeatured: number;
    totalHidden: number;
  };
  latestResources: Array<{
    id: string;
    title: string;
    slug: string;
    type: string;
    status: string;
  }>;
};

export default function AdminDashboardPage() {
  const router = useRouter();

  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminRequest<DashboardData>("adminGetDashboard")
      .then(setData)
      .catch((err) => {
        const message =
          err instanceof Error ? err.message : "Không tải được dữ liệu.";

        setError(message);

        if (
          message.includes("chưa đăng nhập") ||
          message.includes("Phiên đăng nhập") ||
          message.includes("hết hạn")
        ) {
          clearAdminToken();
          router.push("/admin/login");
        }
      });
  }, [router]);

  function logout() {
    clearAdminToken();
    router.push("/admin/login");
  }

  if (error) {
    return (
      <AdminShell onLogout={logout}>
        <div className="rounded-3xl bg-red-50 p-6 text-red-700">{error}</div>
      </AdminShell>
    );
  }

  if (!data) {
    return (
      <AdminShell onLogout={logout}>
        <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm">
          Đang tải dashboard...
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell onLogout={logout}>
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
          Admin Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
          Xin chào, {data.user.name || data.user.email}
        </h1>

        <p className="mt-2 text-slate-500">
          Vai trò: <strong>{data.user.role}</strong>
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-4">
        <StatCard label="Tổng tài liệu" value={data.stats.totalResources} />
        <StatCard label="Video" value={data.stats.totalVideos} />
        <StatCard label="Audio" value={data.stats.totalAudios} />
        <StatCard label="PDF/Sách điện tử" value={data.stats.totalPdfs} />
        <StatCard label="Chủ đề" value={data.stats.totalCategories} />
        <StatCard label="Nổi bật" value={data.stats.totalFeatured} />
        <StatCard label="Đang ẩn" value={data.stats.totalHidden} />
      </div>

      <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold text-slate-900">
            Tài liệu mới cập nhật
          </h2>

          <Link
            href="/admin/resources"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="mt-5 divide-y divide-slate-100">
          {data.latestResources.length > 0 ? (
            data.latestResources.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div>
                  <p className="font-bold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.id} · {item.type} · {item.status}
                  </p>
                </div>

                <Link
                  href={`/${item.slug}`}
                  target="_blank"
                  className="text-sm font-semibold text-blue-600"
                >
                  Xem
                </Link>
              </div>
            ))
          ) : (
            <div className="py-6 text-sm text-slate-500">
              Chưa có tài liệu nào.
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

function AdminShell({
  children,
  onLogout,
}: {
  children: React.ReactNode;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/admin" className="font-extrabold text-slate-900">
            Fly To Sky Admin
          </Link>

          <nav className="flex items-center gap-4 text-sm font-semibold">
            <Link href="/admin" className="hover:text-blue-600">
              Tổng quan
            </Link>

            <Link href="/admin/resources" className="hover:text-blue-600">
              Tài liệu
            </Link>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
            >
              Đăng xuất
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">{children}</main>
    </div>
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
