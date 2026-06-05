import ResourceCard from "@/components/ResourceCard";
import { getCategories, getResources } from "@/lib/api";
import Link from "next/link";

export const metadata = {
  title: "Audio | Thư viện số Fly To Sky",
  description: "Danh sách audio trong Thư viện số Fly To Sky.",
};

export default async function AudiosPage() {
  const [resources, categories] = await Promise.all([
    getResources(),
    getCategories(),
  ]);

  const audioResources = resources.filter((item) => item.hasAudio);

  const usedCategoryCodes = Array.from(
    new Set(audioResources.map((item) => item.categoryCode)),
  );

  const relatedCategories = categories.filter((category) =>
    usedCategoryCodes.includes(category.code),
  );

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-pink-600 via-rose-500 to-orange-400 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <Link
            href="/"
            className="text-sm font-semibold text-pink-50 hover:text-white"
          >
            ← Về trang chủ
          </Link>

          <h1 className="mt-6 text-4xl font-extrabold md:text-6xl">Audio</h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-pink-50">
            Nội dung nghe, podcast và tư liệu âm thanh có thể tiếp cận mọi lúc.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionTitle
          title="Chủ đề có audio"
          description="Khám phá các chủ đề đang có nội dung nghe."
        />

        {relatedCategories.length > 0 ? (
          <div className="mb-12 flex flex-wrap gap-3">
            {relatedCategories.map((category) => (
              <Link
                key={category.code}
                href={`/category/${category.slug}`}
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-pink-500 hover:text-pink-600"
              >
                {category.icon ? `${category.icon} ` : ""}
                {category.name}
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState text="Chưa có chủ đề nào có audio." />
        )}

        <SectionTitle
          title="Tất cả audio"
          description={`Tìm thấy ${audioResources.length} audio.`}
        />

        {audioResources.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {audioResources.map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </div>
        ) : (
          <EmptyState text="Chưa có audio nào được xuất bản." />
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
