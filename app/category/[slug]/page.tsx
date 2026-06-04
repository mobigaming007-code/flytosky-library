import ResourceCard from "@/components/ResourceCard";
import PartnerCTA from "@/components/PartnerCTA";
import { getCategories, getResources } from "@/lib/api";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-3xl font-bold text-slate-900">
          Không tìm thấy chủ đề
        </h1>
        <p className="mt-4 text-slate-600">
          Chủ đề này chưa tồn tại hoặc chưa được xuất bản.
        </p>
      </div>
    );
  }

  const resources = await getResources({ category: category.code });

  return (
    <div>
      <section
        className="bg-blue-600 py-16 text-white"
        style={{ backgroundColor: category.color || "#2563EB" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-5xl">{category.icon || "📚"}</div>

          <h1 className="mt-4 text-4xl font-extrabold">{category.name}</h1>

          <p className="mt-4 max-w-2xl text-white/90">{category.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 text-sm text-slate-500">
          Có <strong>{resources.length}</strong> tài liệu trong chủ đề này
        </div>

        {resources.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {resources.map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            Chủ đề này chưa có tài liệu.
          </div>
        )}
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <PartnerCTA />
      </section>
    </div>
  );
}
