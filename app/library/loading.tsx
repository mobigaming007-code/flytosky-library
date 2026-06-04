export default function LibraryLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="h-5 w-24 animate-pulse rounded-full bg-slate-200" />
      <div className="mt-4 h-12 w-80 animate-pulse rounded-2xl bg-slate-200" />
      <div className="mt-4 h-6 w-[520px] max-w-full animate-pulse rounded-2xl bg-slate-200" />

      <div className="mt-10 grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
        <div className="h-12 animate-pulse rounded-2xl bg-slate-200 md:col-span-2" />
        <div className="h-12 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-12 animate-pulse rounded-2xl bg-slate-200" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="aspect-video animate-pulse bg-slate-200" />
            <div className="p-5">
              <div className="h-5 w-4/5 animate-pulse rounded-full bg-slate-200" />
              <div className="mt-3 h-4 w-full animate-pulse rounded-full bg-slate-200" />
              <div className="mt-2 h-4 w-3/5 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
