"use client";

import AdminShell from "@/components/admin/AdminShell";
import { adminRequest } from "@/lib/adminClient";
import { useEffect, useMemo, useState } from "react";

type AdminAccount = {
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
  mustChangePassword: boolean;
  lastLogin: string;
};

type AccountListData = {
  users: AdminAccount[];
};

type AccountForm = {
  oldEmail: string;
  email: string;
  name: string;
  role: string;
  status: string;
  password: string;
};

const emptyForm: AccountForm = {
  oldEmail: "",
  email: "",
  name: "",
  role: "Editor",
  status: "active",
  password: "",
};

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [form, setForm] = useState<AccountForm>(emptyForm);

  const [keyword, setKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
    setLoading(true);

    try {
      const data = await adminRequest<AccountListData>("adminListAdminUsers");
      setAccounts(data.users || []);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Không tải được tài khoản.");
    } finally {
      setLoading(false);
    }
  }

  const filteredAccounts = useMemo(() => {
    const q = keyword.toLowerCase().trim();

    return accounts.filter((item) => {
      const matchKeyword =
        !q ||
        item.email.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q);

      const matchRole = !roleFilter || item.role === roleFilter;
      const matchStatus = !statusFilter || item.status === statusFilter;

      return matchKeyword && matchRole && matchStatus;
    });
  }, [accounts, keyword, roleFilter, statusFilter]);

  function update<K extends keyof AccountForm>(key: K, value: AccountForm[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
  }

  function editAccount(account: AdminAccount) {
    setForm({
      oldEmail: account.email,
      email: account.email,
      name: account.name,
      role: account.role || "Editor",
      status: account.status || "active",
      password: "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.email.trim()) {
      alert("Vui lòng nhập email.");
      return;
    }

    if (!form.name.trim()) {
      alert("Vui lòng nhập họ tên.");
      return;
    }

    if (!form.oldEmail && !form.password.trim()) {
      alert("Tài khoản mới cần có mật khẩu tạm.");
      return;
    }

    setSaving(true);

    try {
      await adminRequest("adminSaveAdminUser", {
        data: {
          oldEmail: form.oldEmail,
          email: form.email,
          name: form.name,
          role: form.role,
          status: form.status,
          password: form.password,
        },
      });

      await loadAccounts();
      resetForm();

      alert("Đã lưu tài khoản admin.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Không lưu được tài khoản.");
    } finally {
      setSaving(false);
    }
  }

  async function setAccountStatus(email: string, status: "active" | "locked") {
    const confirmText =
      status === "locked"
        ? "Bạn chắc chắn muốn khóa tài khoản này?"
        : "Bạn chắc chắn muốn mở lại tài khoản này?";

    if (!confirm(confirmText)) return;

    try {
      await adminRequest("adminSetAdminUserStatus", {
        email,
        status,
      });

      setAccounts((current) =>
        current.map((item) =>
          item.email === email ? { ...item, status } : item,
        ),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Không đổi được trạng thái.");
    }
  }

  async function resetPassword(email: string) {
    const newPassword = window.prompt(
      `Nhập mật khẩu tạm mới cho tài khoản:\n${email}`,
    );

    if (!newPassword) return;

    if (newPassword.length < 6) {
      alert("Mật khẩu mới cần tối thiểu 6 ký tự.");
      return;
    }

    try {
      await adminRequest("adminResetAdminPassword", {
        email,
        newPassword,
      });

      await loadAccounts();

      alert(
        "Đã reset mật khẩu. Tài khoản này sẽ bị yêu cầu đổi mật khẩu khi đăng nhập.",
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Không reset được mật khẩu.");
    }
  }

  return (
    <AdminShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            SuperAdmin
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Cấp tài khoản admin
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
            Tạo tài khoản quản trị, phân quyền, khóa/mở tài khoản và reset mật
            khẩu khi bộ phận phụ trách quên mật khẩu.
          </p>
        </div>
      </div>

      <form
        onSubmit={saveAccount}
        className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold text-slate-900">
            {form.oldEmail ? "Sửa tài khoản" : "Tạo tài khoản mới"}
          </h2>

          {form.oldEmail && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full bg-slate-100 px-5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"
            >
              Nhập mới
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              className="input"
              placeholder="admin@example.com"
              required
            />
          </Field>

          <Field label="Họ tên">
            <input
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              className="input"
              placeholder="Tên người phụ trách"
              required
            />
          </Field>

          <Field label="Vai trò">
            <select
              value={form.role}
              onChange={(event) => update("role", event.target.value)}
              className="input"
            >
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </Field>

          <Field label="Trạng thái">
            <select
              value={form.status}
              onChange={(event) => update("status", event.target.value)}
              className="input"
            >
              <option value="active">active</option>
              <option value="locked">locked</option>
            </select>
          </Field>

          <Field
            label={
              form.oldEmail
                ? "Mật khẩu mới nếu muốn reset / đổi email"
                : "Mật khẩu tạm"
            }
          >
            <input
              type="password"
              value={form.password}
              onChange={(event) => update("password", event.target.value)}
              className="input"
              placeholder={
                form.oldEmail
                  ? "Bỏ trống nếu không đổi mật khẩu"
                  : "Mật khẩu tạm ban đầu"
              }
            />

            {form.oldEmail && form.oldEmail !== form.email && (
              <p className="mt-2 text-xs font-semibold text-orange-600">
                Bạn đang đổi email, bắt buộc phải nhập mật khẩu mới vì mã hash
                phụ thuộc vào email.
              </p>
            )}
          </Field>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-blue-600 px-7 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Đang lưu..." : "Lưu tài khoản"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="rounded-full bg-slate-100 px-7 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200"
          >
            Xóa form
          </button>
        </div>
      </form>

      <div className="mt-8 grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Tìm email, họ tên, vai trò..."
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 md:col-span-2"
        />

        <select
          value={roleFilter}
          onChange={(event) => setRoleFilter(event.target.value)}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">Tất cả vai trò</option>
          <option value="SuperAdmin">SuperAdmin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">active</option>
          <option value="locked">locked</option>
        </select>
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 text-sm text-slate-500">
          {loading ? (
            "Đang tải..."
          ) : (
            <>
              Tìm thấy <strong>{filteredAccounts.length}</strong> tài khoản
            </>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Tài khoản</th>
                <th className="px-5 py-4">Vai trò</th>
                <th className="px-5 py-4">Trạng thái</th>
                <th className="px-5 py-4">Bắt buộc đổi pass</th>
                <th className="px-5 py-4">Đăng nhập cuối</th>
                <th className="px-5 py-4">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredAccounts.map((item) => (
                <tr key={item.email}>
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.email}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Tạo lúc: {item.createdAt || "Không rõ"}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {item.role || "-"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {item.mustChangePassword ? "Có" : "Không"}
                  </td>

                  <td className="px-5 py-4">
                    {item.lastLogin || "Chưa đăng nhập"}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => editAccount(item)}
                        className="font-semibold text-blue-600"
                      >
                        Sửa
                      </button>

                      <button
                        type="button"
                        onClick={() => resetPassword(item.email)}
                        className="font-semibold text-purple-600"
                      >
                        Reset pass
                      </button>

                      {item.status === "active" ? (
                        <button
                          type="button"
                          onClick={() => setAccountStatus(item.email, "locked")}
                          className="font-semibold text-orange-600"
                        >
                          Khóa
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setAccountStatus(item.email, "active")}
                          className="font-semibold text-green-600"
                        >
                          Mở khóa
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredAccounts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    Không tìm thấy tài khoản phù hợp.
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
