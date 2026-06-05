"use client";

import AdminShell from "@/components/admin/AdminShell";
import CategoryForm, {
  type CategoryFormValue,
} from "@/components/admin/CategoryForm";
import { adminRequest } from "@/lib/adminClient";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AdminGetCategoryData = {
  category: CategoryFormValue;
};

export default function AdminEditCategoryPage() {
  const router = useRouter();
  const params = useParams<{ code: string }>();

  const [category, setCategory] = useState<CategoryFormValue | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    adminRequest<AdminGetCategoryData>("adminGetCategory", {
      code: params.code,
    })
      .then((data) => {
        setCategory(data.category);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Không tải được chủ đề.");
      });
  }, [params.code]);

  async function handleSubmit(value: CategoryFormValue) {
    setLoading(true);

    try {
      await adminRequest("adminUpdateCategory", {
        code: params.code,
        data: value,
      });

      alert("Đã lưu chủ đề.");
      router.refresh();
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
          Sửa chủ đề
        </h1>
      </div>

      {error && (
        <div className="rounded-3xl bg-red-50 p-6 text-red-700">{error}</div>
      )}

      {!error && !category && (
        <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm">
          Đang tải chủ đề...
        </div>
      )}

      {category && (
        <CategoryForm
          initialValue={category}
          submitLabel="Lưu thay đổi"
          loading={loading}
          onSubmit={handleSubmit}
        />
      )}
    </AdminShell>
  );
}
