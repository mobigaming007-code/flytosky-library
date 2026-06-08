"use client";

import {
  adminRequest,
  clearAdminToken,
  getAdminToken,
} from "@/lib/adminClient";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type AdminShellProps = {
  children: React.ReactNode;
};

type MeData = {
  user: {
    email: string;
    name: string;
    role: string;
    mustChangePassword?: boolean;
  };
};

const menuItems = [
  {
    label: "Tổng quan",
    href: "/admin",
  },
  {
    label: "Tài liệu",
    href: "/admin/resources",
  },
  {
    label: "Chủ đề",
    href: "/admin/categories",
  },
  {
    label: "Tác giả",
    href: "/admin/authors",
  },
  {
    label: "Thống kê",
    href: "/admin/statistics",
  },
  {
    label: "Kiểm tra link",
    href: "/admin/link-checker",
  },
  {
    label: "Nhật ký",
    href: "/admin/audit-log",
  },
  {
    label: "Đổi mật khẩu",
    href: "/admin/change-password",
  },
  {
    label: "Tài khoản",
    href: "/admin/accounts",
  },
];

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const token = getAdminToken();

      if (!token) {
        forceLogout();
        return;
      }

      try {
        const me = await adminRequest<MeData>("adminGetMe");

        if (
          me.user.mustChangePassword &&
          window.location.pathname !== "/admin/change-password"
        ) {
          window.location.href = "/admin/change-password";
          return;
        }

        if (!active) return;

        setAuthorized(true);
        setChecking(false);
      } catch {
        if (!active) return;

        forceLogout();
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  function forceLogout() {
    try {
      clearAdminToken();
      localStorage.removeItem("flytosky_admin_token");
      sessionStorage.clear();
    } catch {
      // bỏ qua lỗi trình duyệt
    }

    window.location.href = "/admin/login";
  }

  if (checking || !authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Đang kiểm tra phiên đăng nhập...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/admin" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Fly To Sky"
              className="h-9 w-9 rounded-xl object-contain"
            />

            <div>
              <p className="font-extrabold leading-none text-slate-900">
                Fly To Sky Admin
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Quản trị thư viện số
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 text-sm font-semibold md:flex">
            {menuItems.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={forceLogout}
              className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
            >
              Đăng xuất
            </button>
          </nav>

          <button
            type="button"
            onClick={forceLogout}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white md:hidden"
          >
            Thoát
          </button>
        </div>

        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <div className="flex gap-2 overflow-x-auto">
            {menuItems.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">{children}</main>
    </div>
  );
}
