"use client";

import { adminRequest, clearAdminToken } from "@/lib/adminClient";
import Link from "next/link";
import { useState } from "react";

export default function AdminChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await adminRequest("adminChangePassword", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setMessage("Đổi mật khẩu thành công. Vui lòng đăng nhập lại.");

      setTimeout(() => {
        clearAdminToken();
        localStorage.removeItem("flytosky_admin_token");
        window.location.href = "/admin/login";
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không đổi được mật khẩu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="flex min-h-screen items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="text-center">
            <Link
              href="/admin"
              className="inline-flex items-center justify-center"
            >
              <img
                src="/logo.png"
                alt="Fly To Sky"
                className="h-16 w-16 rounded-2xl object-contain"
              />
            </Link>

            <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
              Đổi mật khẩu
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Vì lý do bảo mật, vui lòng đổi mật khẩu trước khi tiếp tục sử dụng
              trang quản trị.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <Field label="Mật khẩu hiện tại">
              <input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className="input"
                required
              />
            </Field>

            <Field label="Mật khẩu mới">
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="input"
                minLength={8}
                required
              />
            </Field>

            <Field label="Nhập lại mật khẩu mới">
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="input"
                minLength={8}
                required
              />
            </Field>
          </div>

          {error && (
            <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-5 rounded-2xl bg-green-50 p-4 text-sm font-medium text-green-700">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
          </button>
        </form>
      </main>

      <style jsx>{`
        .input {
          margin-top: 0.5rem;
          width: 100%;
          border-radius: 1rem;
          border: 1px solid #e2e8f0;
          padding: 0.75rem 1rem;
          outline: none;
        }

        .input:focus {
          border-color: #2563eb;
        }
      `}</style>
    </div>
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
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      {children}
    </label>
  );
}
