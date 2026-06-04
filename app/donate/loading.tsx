export default function DonateLoading() {
  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="h-10 w-64 animate-pulse rounded-full bg-white/25" />
          <div className="mt-6 h-16 w-full max-w-3xl animate-pulse rounded-3xl bg-white/25" />
          <div className="mt-5 h-6 w-full max-w-2xl animate-pulse rounded-full bg-white/25" />

          <div className="mt-8 flex gap-3">
            <div className="h-12 w-48 animate-pulse rounded-full bg-white/25" />
            <div className="h-12 w-40 animate-pulse rounded-full bg-white/25" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="h-5 w-40 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-4 h-10 w-80 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded-full bg-slate-200" />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm md:p-8"
            >
              <div className="h-8 w-52 animate-pulse rounded-full bg-slate-200" />
              <div className="mt-6 h-8 w-44 animate-pulse rounded-2xl bg-slate-200" />
              <div className="mt-4 h-5 w-64 animate-pulse rounded-full bg-slate-200" />

              <div className="mt-6 space-y-4">
                <div className="h-24 animate-pulse rounded-3xl bg-slate-100" />
                <div className="h-24 animate-pulse rounded-3xl bg-slate-100" />
                <div className="h-24 animate-pulse rounded-3xl bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
