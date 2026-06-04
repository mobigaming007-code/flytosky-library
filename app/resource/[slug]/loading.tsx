export default function ResourceLoading() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="h-5 w-36 animate-pulse rounded-full bg-slate-200" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="h-8 w-40 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-5 h-12 w-4/5 animate-pulse rounded-2xl bg-slate-200" />
            <div className="mt-4 h-6 w-3/5 animate-pulse rounded-2xl bg-slate-200" />

            <div className="mt-8 aspect-video animate-pulse rounded-3xl bg-slate-200" />
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="aspect-video animate-pulse rounded-2xl bg-slate-200" />

            <div className="mt-6 space-y-4">
              <div className="h-5 w-28 animate-pulse rounded-full bg-slate-200" />
              <div className="h-5 w-40 animate-pulse rounded-full bg-slate-200" />
              <div className="h-5 w-32 animate-pulse rounded-full bg-slate-200" />
              <div className="h-5 w-44 animate-pulse rounded-full bg-slate-200" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
