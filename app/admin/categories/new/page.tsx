"use client";

import AdminShell from "@/components/admin/AdminShell";
import CategoryForm, {
  type CategoryFormValue,
} from "@/components/admin/CategoryForm";
import { adminRequest } from "@/lib/adminClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminNewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(value: CategoryFormValue) {
    setLoading(true);

    try {
      const result = await adminRequest<{ code: string; slug: string }>(
        "adminCreateCategory",
        {
          data: value,
        },
      );

      router.push(`/admin/categories/${result.code}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminShell>
      <div className="mb-8">
        <Link
          href="/admin/categories"
          className="text-sm font-bold text-blue-600"
        >
          ← Quay lại danh sách
        </Link>

        <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
          Thêm chủ đề mới
        </h1>
      </div>

      <CategoryForm
        submitLabel="Thêm chủ đề"
        loading={loading}
        onSubmit={handleSubmit}
      />
    </AdminShell>
  );
}
