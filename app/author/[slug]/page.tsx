import ResourceCard from "@/components/ResourceCard";
import { getResources } from "@/lib/api";
import { getAuthorSlug, splitAuthors } from "@/lib/authors";
import Link from "next/link";
import { notFound } from "next/navigation";

type AuthorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;

  const resources = await getResources();

  const matchedResources = resources.filter((resource) => {
    const authors = splitAuthors(resource.author);
    return authors.some((author) => getAuthorSlug(author) === slug);
  });

  if (matchedResources.length === 0) {
    notFound();
  }

  const authorName =
    splitAuthors(matchedResources[0].author).find(
      (author) => getAuthorSlug(author) === slug,
    ) || "Tác giả";

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <Link
            href="/library"
            className="text-sm font-semibold text-blue-100 hover:text-white"
          >
            ← Quay lại thư viện
          </Link>

          <p className="mt-8 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
            Tác giả / Người tham gia nội dung
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
            {authorName}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50">
            Danh sách các tài liệu, audio, video hoặc sách điện tử có sự tham
            gia của {authorName}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 text-sm text-slate-500">
          Tìm thấy <strong>{matchedResources.length}</strong> tác phẩm
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {matchedResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </div>
  );
}
