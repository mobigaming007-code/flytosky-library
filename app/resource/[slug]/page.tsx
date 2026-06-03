import MediaViewer from "@/components/MediaViewer";
import { getResourceBySlug } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

type ResourceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ResourceDetailPage({
  params,
}: ResourceDetailPageProps) {
  const { slug } = await params;
  let resource;

  try {
    resource = await getResourceBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link href="/library" className="text-sm font-semibold text-blue-600">
        ← Quay lại thư viện
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-6">
            <div className="mb-4 flex flex-wrap gap-2">
              {resource.hasVideo && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Video
                </span>
              )}

              {resource.hasPdf && (
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                  PDF
                </span>
              )}

              {resource.hasAudio && (
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  Audio
                </span>
              )}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-slate-900">
              {resource.title}
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {resource.shortDescription}
            </p>
          </div>

          <MediaViewer resource={resource} />
        </div>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <img
            src={
              resource.coverUrl ||
              "https://placehold.co/800x450?text=Fly+To+Sky+Library"
            }
            alt={resource.title}
            className="aspect-video w-full rounded-2xl object-cover"
          />

          <div className="mt-6 space-y-4 text-sm">
            <Info label="Chủ đề" value={resource.categoryCode} />
            <Info label="Tác giả/Nguồn" value={resource.author} />
            <Info label="Năm xuất bản" value={resource.publishYear} />
            <Info label="Ngôn ngữ" value={resource.language} />
            <Info label="Từ khóa" value={resource.tags} />
          </div>

          {resource.detailDescription && (
            <div className="mt-6 border-t border-slate-100 pt-6">
              <h2 className="font-bold text-slate-900">Mô tả chi tiết</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                {resource.detailDescription}
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  if (!value) return null;

  return (
    <div>
      <p className="font-semibold text-slate-900">{label}</p>
      <p className="mt-1 text-slate-600">{value}</p>
    </div>
  );
}
