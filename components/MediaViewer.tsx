import type { Resource } from "@/lib/api";

export default function MediaViewer({ resource }: { resource: Resource }) {
  return (
    <div className="space-y-6">
      {resource.hasVideo && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Xem video</h2>

          <div className="aspect-video overflow-hidden rounded-2xl bg-slate-100">
            <iframe
              src={resource.youtubeEmbedUrl}
              title={resource.title}
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {resource.hasAudio && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Nghe audio</h2>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <iframe
              src={resource.audioEmbedUrl || resource.audioUrl}
              title={`Audio - ${resource.title}`}
              className="h-32 w-full"
              allow="autoplay"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={resource.audioEmbedUrl || resource.audioUrl}
              target="_blank"
              className="inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Mở trang nghe audio
            </a>

            <a
              href={resource.audioUrl}
              target="_blank"
              className="inline-flex rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
            >
              Tải audio
            </a>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Audio đang được nhúng qua Google Drive Preview. Nếu không phát được,
            hãy bấm “Mở trang nghe audio”.
          </p>
        </section>
      )}

      {resource.hasFlipbook && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Đọc sách điện tử
          </h2>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <iframe
              src={resource.flipbookUrl}
              title={`Sách điện tử - ${resource.title}`}
              className="h-190 w-full"
              allowFullScreen
            />
          </div>

          <a
            href={resource.flipbookUrl}
            target="_blank"
            className="mt-4 inline-flex rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Mở sách điện tử trong tab mới
          </a>
        </section>
      )}

      {!resource.hasFlipbook && resource.hasPdf && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Đọc PDF</h2>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <iframe
              src={resource.pdfEmbedUrl || resource.pdfUrl}
              title={`PDF - ${resource.title}`}
              className="h-190 w-full"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={resource.pdfEmbedUrl || resource.pdfUrl}
              target="_blank"
              className="inline-flex rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Mở PDF trong tab mới
            </a>

            <a
              href={resource.pdfUrl}
              target="_blank"
              className="inline-flex rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-orange-500 hover:text-orange-600"
            >
              Tải PDF
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
