import Hero from "@/components/Hero";
import ResourceCard from "@/components/ResourceCard";
import CategoryCard from "@/components/CategoryCard";
import { getHomeData, type Resource } from "@/lib/api";
import Link from "next/link";

export default async function HomePage() {
  const homeData = await getHomeData();

  const {
    config,
    categories,
    featuredResources,
    latestVideos,
    latestPdfs,
    latestAudios,
  } = homeData;

  return (
    <div className="bg-slate-50">
      <Hero config={config} />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          <StatCard
            number={featuredResources.length}
            label="Tài liệu nổi bật"
          />
          <StatCard number={latestVideos.length} label="Video" />
          <StatCard number={latestPdfs.length} label="PDF / Sách điện tử" />
          <StatCard number={latestAudios.length} label="Audio" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
              Nổi bật
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              Tài liệu được đề xuất
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Những nội dung tiêu biểu giúp bạn bắt đầu khám phá thư viện số Fly
              To Sky.
            </p>
          </div>

          <Link
            href="/library"
            className="hidden rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 md:inline-flex"
          >
            Xem tất cả
          </Link>
        </div>

        {featuredResources?.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {featuredResources.slice(0, 6).map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </div>
        ) : (
          <EmptyState text="Chưa có tài liệu nổi bật. Hãy kiểm tra cột NoiBat trong sheet TaiLieu." />
        )}
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
              Chủ đề
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              Khám phá theo chủ đề
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Tài liệu được sắp xếp theo các lĩnh vực cộng đồng, giáo dục và
              phát triển con người.
            </p>
          </div>

          {categories?.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {categories.map((item) => (
                <CategoryCard key={item.code} category={item} />
              ))}
            </div>
          ) : (
            <EmptyState text="Chưa có chủ đề. Hãy kiểm tra sheet ChuDe." />
          )}
        </div>
      </section>

      <ResourceSection
        title="Video mới nhất"
        description="Những câu chuyện, bài học và nội dung truyền cảm hứng qua hình ảnh."
        items={latestVideos}
      />

      <ResourceSection
        title="PDF / Sách điện tử mới nhất"
        description="Tài liệu đọc, sách điện tử và học liệu mở dành cho cộng đồng."
        items={latestPdfs}
      />

      <ResourceSection
        title="Audio mới nhất"
        description="Nội dung nghe, podcast và tư liệu âm thanh có thể tiếp cận mọi lúc."
        items={latestAudios}
      />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 p-8 text-white shadow-xl md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.4fr_0.6fr] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-blue-100">
                Fly To Sky Library
              </p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                Cùng lan tỏa tri thức mở vì cộng đồng
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-blue-50">
                Thư viện số là nơi lưu giữ, chia sẻ và kết nối các tài liệu có
                giá trị giáo dục, thiện nguyện và phát triển cộng đồng.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/library"
                className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
              >
                Khám phá ngay
              </Link>
              <Link
                href="/about"
                className="rounded-full bg-white/15 px-6 py-3 font-semibold text-white ring-1 ring-white/30 hover:bg-white/20"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ number, label }: { number: number; label: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-3xl font-extrabold text-blue-600">{number}</p>
      <p className="mt-2 text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}

function ResourceSection({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: Resource[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">{title}</h2>
          <p className="mt-3 max-w-2xl text-slate-600">{description}</p>
        </div>

        <Link href="/library" className="text-sm font-bold text-blue-600">
          Xem thêm →
        </Link>
      </div>

      {items?.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {items.slice(0, 3).map((item) => (
            <ResourceCard key={item.id} resource={item} />
          ))}
        </div>
      ) : (
        <EmptyState text={`Chưa có dữ liệu cho mục ${title}.`} />
      )}
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
      {text}
    </div>
  );
}
