export default function VideosLoading() {
  return (
    <MediaTypeLoading
      titleWidth="w-48"
      bannerColor="from-blue-700 via-blue-600 to-sky-500"
    />
  );
}

function MediaTypeLoading({
  titleWidth,
  bannerColor,
}: {
  titleWidth: string;
  bannerColor: string;
}) {
  return (
    <div className="bg-slate-50">
      <section className={`bg-gradient-to-br ${bannerColor} py-16 text-white`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="h-5 w-32 animate-pulse rounded-full bg-white/30" />
          <div
            className={`mt-6 h-14 ${titleWidth} animate-pulse rounded-3xl bg-white/30`}
          />
          <div className="mt-5 h-6 w-full max-w-2xl animate-pulse rounded-full bg-white/30" />
          <div className="mt-3 h-6 w-full max-w-xl animate-pulse rounded-full bg-white/20" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="h-10 w-72 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-3 h-5 w-full max-w-xl animate-pulse rounded-full bg-slate-200" />

        <div className="mt-6 mb-12 flex flex-wrap gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-32 animate-pulse rounded-full bg-white shadow-sm ring-1 ring-slate-200"
            />
          ))}
        </div>

        <div className="h-10 w-56 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-3 h-5 w-48 animate-pulse rounded-full bg-slate-200" />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-video animate-pulse bg-slate-200" />
      <div className="p-5">
        <div className="h-5 w-4/5 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-3 h-4 w-full animate-pulse rounded-full bg-slate-200" />
        <div className="mt-2 h-4 w-3/5 animate-pulse rounded-full bg-slate-200" />

        <div className="mt-5 flex gap-2">
          <div className="h-7 w-16 animate-pulse rounded-full bg-slate-100" />
          <div className="h-7 w-20 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
