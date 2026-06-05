"use client";

import { adminRequest, setAdminToken } from "@/lib/adminClient";
import Link from "next/link";
import { useState } from "react";

type LoginData = {
  token: string;
  user: {
    email: string;
    name: string;
    role: string;
  };
};

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await adminRequest<LoginData>("adminLogin", {
        email,
        password,
      });

      if (!data?.token) {
        throw new Error("API đăng nhập không trả về token.");
      }

      setAdminToken(data.token);

      // Ghi trực tiếp thêm 1 lần để chắc chắn localStorage đã có token
      localStorage.setItem("flytosky_admin_token", data.token);

      // Dùng window.location.href để reload sạch trạng thái client
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="flex min-h-screen items-center justify-center px-4 py-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="text-center">
            <Link href="/" className="inline-flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Fly To Sky"
                className="h-16 w-16 rounded-2xl object-contain"
              />
            </Link>

            <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
              Đăng nhập Admin
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Quản trị Thư viện số Fly To Sky
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                placeholder="admin@flytoskycharity.vn"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Mật khẩu
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <Link
            href="/"
            className="mt-5 block text-center text-sm font-semibold text-slate-500 hover:text-blue-600"
          >
            ← Về trang chủ
          </Link>
        </form>
      </main>
    </div>
  );
}
