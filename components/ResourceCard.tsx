import Link from "next/link";
import type { Resource } from "@/lib/api";

function getTypeLabel(type: string) {
  const labels: Record<string, string> = {
    video: "Video",
    pdf: "PDF",
    audio: "Audio",
    combo: "Combo",
  };

  return labels[type] || "Tài liệu";
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  const cover =
    resource.coverUrl || "https://placehold.co/800x450?text=Fly+To+Sky+Library";

  return (
    <Link
      href={`/${resource.slug}`}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={cover}
          alt={resource.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700">
          {getTypeLabel(resource.type)}
        </span>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 text-base font-bold text-slate-900">
          {resource.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {resource.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {resource.hasVideo && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
              Video
            </span>
          )}

          {resource.hasPdf && (
            <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700">
              PDF
            </span>
          )}

          {resource.hasAudio && (
            <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
              Audio
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
