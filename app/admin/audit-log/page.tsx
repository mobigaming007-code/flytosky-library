"use client";

import AdminShell from "@/components/admin/AdminShell";
import { adminRequest } from "@/lib/adminClient";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type AuditLogItem = {
  time: string;
  email: string;
  action: string;
  objectType: string;
  objectId: string;
  oldValue: string;
  newValue: string;
};

type AuditLogData = {
  logs: AuditLogItem[];
};

const actionLabels: Record<string, string> = {
  LOGIN: "Đăng nhập",
  LOGOUT: "Đăng xuất",
  CREATE_RESOURCE: "Thêm tài liệu",
  UPDATE_RESOURCE: "Sửa tài liệu",
  SET_RESOURCE_STATUS: "Đổi trạng thái tài liệu",
  CREATE_CATEGORY: "Thêm chủ đề",
  UPDATE_CATEGORY: "Sửa chủ đề",
  SET_CATEGORY_STATUS: "Đổi trạng thái chủ đề",
  UPLOAD_COVER_IMAGE: "Upload ảnh bìa",
};

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [keyword, setKeyword] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [objectFilter, setObjectFilter] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    setLoading(true);
    setError("");

    try {
      const data = await adminRequest<AuditLogData>("adminGetAuditLogs", {
        limit: 300,
      });

      setLogs(data.logs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không tải được nhật ký.");
    } finally {
      setLoading(false);
    }
  }

  const filteredLogs = useMemo(() => {
    const q = keyword.toLowerCase().trim();

    return logs.filter((item) => {
      const matchKeyword =
        !q ||
        item.email.toLowerCase().includes(q) ||
        item.action.toLowerCase().includes(q) ||
        item.objectType.toLowerCase().includes(q) ||
        item.objectId.toLowerCase().includes(q) ||
        item.oldValue.toLowerCase().includes(q) ||
        item.newValue.toLowerCase().includes(q);

      const matchAction = !actionFilter || item.action === actionFilter;
      const matchObject = !objectFilter || item.objectType === objectFilter;

      return matchKeyword && matchAction && matchObject;
    });
  }, [logs, keyword, actionFilter, objectFilter]);

  const actionOptions = useMemo(() => {
    return Array.from(new Set(logs.map((item) => item.action).filter(Boolean)));
  }, [logs]);

  const objectOptions = useMemo(() => {
    return Array.from(
      new Set(logs.map((item) => item.objectType).filter(Boolean)),
    );
  }, [logs]);

  return (
    <AdminShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            Nhật ký hệ thống
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            AuditLog
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
            Theo dõi các thao tác quan trọng trong hệ thống admin: đăng nhập,
            thêm/sửa tài liệu, đổi trạng thái, sửa chủ đề và upload ảnh bìa.
          </p>
        </div>

        <button
          type="button"
          onClick={loadLogs}
          disabled={loading}
          className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Đang tải..." : "Tải lại"}
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <StatCard label="Tổng bản ghi" value={logs.length} />
        <StatCard label="Đang hiển thị" value={filteredLogs.length} />
        <StatCard label="Loại thao tác" value={actionOptions.length} />
      </div>

      <div className="mt-8 grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Tìm email, hành động, ID, nội dung..."
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 md:col-span-2"
        />

        <select
          value={actionFilter}
          onChange={(event) => setActionFilter(event.target.value)}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">Tất cả thao tác</option>
          {actionOptions.map((action) => (
            <option key={action} value={action}>
              {getActionLabel(action)}
            </option>
          ))}
        </select>

        <select
          value={objectFilter}
          onChange={(event) => setObjectFilter(event.target.value)}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">Tất cả đối tượng</option>
          {objectOptions.map((objectType) => (
            <option key={objectType} value={objectType}>
              {objectType}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mt-8 rounded-3xl bg-red-50 p-5 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {!error && loading && (
        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
          Đang tải nhật ký...
        </div>
      )}

      {!loading && !error && (
        <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4 text-sm text-slate-500">
            Tìm thấy <strong>{filteredLogs.length}</strong> bản ghi
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Thời gian</th>
                  <th className="px-5 py-4">Người thao tác</th>
                  <th className="px-5 py-4">Hành động</th>
                  <th className="px-5 py-4">Đối tượng</th>
                  <th className="px-5 py-4">ID</th>
                  <th className="px-5 py-4">Chi tiết</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((item, index) => (
                  <tr
                    key={`${item.time}-${item.email}-${item.action}-${index}`}
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                      {item.time || "Không rõ"}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {item.email || "Không rõ email"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {getActionLabel(item.action)}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {item.objectType || "-"}
                    </td>

                    <td className="px-5 py-4">
                      {item.objectId ? (
                        <ObjectLink
                          objectType={item.objectType}
                          objectId={item.objectId}
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <details>
                        <summary className="cursor-pointer text-sm font-semibold text-blue-600">
                          Xem chi tiết
                        </summary>

                        <div className="mt-3 grid gap-3">
                          <LogJsonBlock
                            title="Nội dung cũ"
                            value={item.oldValue}
                          />
                          <LogJsonBlock
                            title="Nội dung mới"
                            value={item.newValue}
                          />
                        </div>
                      </details>
                    </td>
                  </tr>
                ))}

                {filteredLogs.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      Không có bản ghi phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function getActionLabel(action: string) {
  return actionLabels[action] || action || "Không rõ";
}

function ObjectLink({
  objectType,
  objectId,
}: {
  objectType: string;
  objectId: string;
}) {
  if (objectType === "RESOURCE") {
    return (
      <Link
        href={`/admin/resources/${objectId}`}
        className="font-semibold text-blue-600"
      >
        {objectId}
      </Link>
    );
  }

  if (objectType === "CATEGORY") {
    return (
      <Link
        href={`/admin/categories/${objectId}`}
        className="font-semibold text-blue-600"
      >
        {objectId}
      </Link>
    );
  }

  return <span className="font-semibold text-slate-700">{objectId}</span>;
}

function LogJsonBlock({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <pre className="max-h-60 overflow-auto rounded-2xl bg-slate-900 p-4 text-xs leading-5 text-slate-100">
        {formatJson(value)}
      </pre>
    </div>
  );
}

function formatJson(value: string) {
  if (!value) return "Không có dữ liệu";

  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-3xl font-extrabold text-blue-600">{value}</p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}
