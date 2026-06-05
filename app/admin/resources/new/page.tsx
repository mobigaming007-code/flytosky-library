"use client";

import AdminShell from "@/components/admin/AdminShell";
import ResourceForm, {
  type ResourceFormValue,
} from "@/components/admin/ResourceForm";
import { adminRequest } from "@/lib/adminClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CategoryListData = {
  categories: Array<{
    code: string;
    name: string;
    icon?: string;
    status?: string;
  }>;
};

export default function AdminNewResourcePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryListData["categories"]>(
    [],
  );

  useEffect(() => {
    adminRequest<CategoryListData>("adminListCategories")
      .then((data) => setCategories(data.categories))
      .catch(() => setCategories([]));
  }, []);

  async function handleSubmit(value: ResourceFormValue) {
    setLoading(true);

    try {
      const result = await adminRequest<{ id: string; slug: string }>(
        "adminCreateResource",
        {
          data: value,
        },
      );

      router.push(`/admin/resources/${result.id}`);
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
          Thêm tài liệu mới
        </h1>
      </div>

      <ResourceForm
        categories={categories}
        submitLabel="Thêm tài liệu"
        loading={loading}
        onSubmit={handleSubmit}
      />
    </AdminShell>
  );
}
