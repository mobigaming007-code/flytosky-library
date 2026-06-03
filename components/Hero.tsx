import Link from "next/link";

type HeroProps = {
  config?: Record<string, string | number | boolean>;
};

export default function Hero({ config }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-700 via-blue-600 to-sky-500">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-300 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20">
            Hệ thống từ thiện Fly To Sky
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
            {String(config?.banner_title || "Thư viện số vì cộng đồng")}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-50">
            {String(
              config?.banner_subtitle ||
                "Khám phá tri thức, câu chuyện và học liệu mở từ Hệ thống từ thiện Fly To Sky.",
            )}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={String(config?.banner_button_link || "/library")}
              className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg hover:bg-orange-600"
            >
              {String(config?.banner_button_text || "Khám phá thư viện")}
            </Link>

            <Link
              href="/about"
              className="rounded-full bg-white/15 px-6 py-3 font-semibold text-white ring-1 ring-white/30 hover:bg-white/20"
            >
              Về dự án
            </Link>
          </div>
        </div>

        <div className="rounded-4xl bg-white/15 p-4 shadow-2xl ring-1 ring-white/20 backdrop-blur">
          <div className="rounded-3xl bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Fly To Sky"
                className="h-12 w-12 object-contain"
              />
              <div>
                <p className="font-bold text-slate-900">Fly To Sky Library</p>
                <p className="text-sm text-slate-500">Video · Audio · PDF</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-semibold text-blue-700">Video</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  Câu chuyện truyền cảm hứng
                </p>
              </div>

              <div className="rounded-2xl bg-orange-50 p-5">
                <p className="text-sm font-semibold text-orange-700">PDF</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  Học liệu mở miễn phí
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 p-5">
                <p className="text-sm font-semibold text-green-700">Audio</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  Nghe và học mọi lúc
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
