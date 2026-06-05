"use client";

import AdminShell from "@/components/admin/AdminShell";
import ResourceForm, {
  type ResourceFormValue,
} from "@/components/admin/ResourceForm";
import { adminRequest } from "@/lib/adminClient";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AdminGetResourceData = {
  resource: ResourceFormValue;
};

type CategoryListData = {
  categories: Array<{
    code: string;
    name: string;
    icon?: string;
    status?: string;
  }>;
};

export default function AdminEditResourcePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [resource, setResource] = useState<ResourceFormValue | null>(null);
  const [categories, setCategories] = useState<CategoryListData["categories"]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      adminRequest<AdminGetResourceData>("adminGetResource", {
        id: params.id,
      }),
      adminRequest<CategoryListData>("adminListCategories"),
    ])
      .then(([resourceData, categoryData]) => {
        setResource(resourceData.resource);
        setCategories(categoryData.categories);
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "Không tải được dữ liệu.",
        );
      });
  }, [params.id]);

  async function handleSubmit(value: ResourceFormValue) {
    setLoading(true);

    try {
      await adminRequest("adminUpdateResource", {
        id: params.id,
        data: value,
      });

      alert("Đã lưu tài liệu.");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminShell>
      <div className="mb-8">
        <Link
          href="/admin/resources"
          className="text-sm font-bold text-blue-600"
        >
          ← Quay lại danh sách
        </Link>

        <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
          Sửa tài liệu
        </h1>
      </div>

      {error && (
        <div className="rounded-3xl bg-red-50 p-6 text-red-700">{error}</div>
      )}

      {!error && !resource && (
        <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm">
          Đang tải tài liệu...
        </div>
      )}

      {resource && (
        <ResourceForm
          initialValue={resource}
          categories={categories}
          submitLabel="Lưu thay đổi"
          loading={loading}
          onSubmit={handleSubmit}
        />
      )}
    </AdminShell>
  );
}
