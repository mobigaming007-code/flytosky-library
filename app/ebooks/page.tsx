import ResourceCard from "@/components/ResourceCard";
import { getCategories, getResources } from "@/lib/api";
import Link from "next/link";

export const metadata = {
  title: "PDF / Sách điện tử | Thư viện số Fly To Sky",
  description: "Danh sách PDF và sách điện tử trong Thư viện số Fly To Sky.",
};

export default async function EbooksPage() {
  const [resources, categories] = await Promise.all([
    getResources(),
    getCategories(),
  ]);

  const ebookResources = resources.filter(
    (item) => item.hasPdf || item.hasFlipbook,
  );

  const usedCategoryCodes = Array.from(
    new Set(ebookResources.map((item) => item.categoryCode)),
  );

  const relatedCategories = categories.filter((category) =>
    usedCategoryCodes.includes(category.code),
  );

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <Link href="/" className="text-sm font-semibold text-orange-50">
            ← Về trang chủ
          </Link>

          <h1 className="mt-6 text-4xl font-extrabold md:text-6xl">
            PDF / Sách điện tử
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-orange-50">
            Tài liệu đọc, sách điện tử và học liệu mở dành cho cộng đồng.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionTitle
          title="Chủ đề có PDF / Sách điện tử"
          description="Khám phá các chủ đề đang có tài liệu đọc hoặc sách điện tử."
        />

        {relatedCategories.length > 0 ? (
          <div className="mb-12 flex flex-wrap gap-3">
            {relatedCategories.map((category) => (
              <Link
                key={category.code}
                href={`/category/${category.slug}`}
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-orange-500 hover:text-orange-600"
              >
                {category.icon ? `${category.icon} ` : ""}
                {category.name}
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState text="Chưa có chủ đề nào có PDF hoặc sách điện tử." />
        )}

        <SectionTitle
          title="Tất cả PDF / Sách điện tử"
          description={`Tìm thấy ${ebookResources.length} tài liệu.`}
        />

        {ebookResources.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {ebookResources.map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </div>
        ) : (
          <EmptyState text="Chưa có PDF hoặc sách điện tử nào được xuất bản." />
        )}
      </section>
    </div>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-extrabold text-slate-900">{title}</h2>
      <p className="mt-3 text-slate-600">{description}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="mb-12 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
      {text}
    </div>
  );
}
