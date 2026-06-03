import Link from "next/link";
import type { Category } from "@/lib/api";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition group-hover:scale-105"
        style={{ backgroundColor: `${category.color || "#2563EB"}20` }}
      >
        {category.icon || "📚"}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">{category.name}</h3>

      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
        {category.description}
      </p>

      <p className="mt-4 text-sm font-semibold text-blue-600">Xem tài liệu →</p>
    </Link>
  );
}
