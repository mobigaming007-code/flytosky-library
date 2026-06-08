import AudioExperience from "@/components/AudioExperience";
import MediaViewer from "@/components/MediaViewer";
import ResourceCard from "@/components/ResourceCard";
import ShareButtons from "@/components/ShareButtons";
import PartnerCTA from "@/components/PartnerCTA";
import ResourceTracker from "@/components/ResourceTracker";
import TrackedResourceLink from "@/components/TrackedResourceLink";
import { getAuthorSlug, splitAuthors } from "@/lib/authors";
import { getCategories, getResourceBySlug, getResources } from "@/lib/api";
import Link from "next/link";
import InlineAudioPlayer from "@/components/InlineAudioPlayer";
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

  const resource = await getResourceBySlug(slug).catch(() => {
    notFound();
  });

  const [categories, allResources] = await Promise.all([
    getCategories(),
    getResources(),
  ]);

  const category = categories.find(
    (item) => item.code === resource.categoryCode,
  );

  const categoryName = category?.name || resource.categoryCode;

  const isAudioExperience =
    resource.type === "audio" ||
    (resource.hasAudio &&
      !resource.hasVideo &&
      !resource.hasPdf &&
      !resource.hasFlipbook);

  const relatedResources = allResources
    .filter((item) => item.id !== resource.id)
    .filter((item) => item.categoryCode === resource.categoryCode)
    .slice(0, 3);

  const youtubeOriginalUrl = resource.youtubeId
    ? `https://www.youtube.com/watch?v=${resource.youtubeId}`
    : "";

  return (
    <div className="bg-slate-50">
      <ResourceTracker resourceId={resource.id} slug={resource.slug} />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {isAudioExperience ? (
          <AudioExperience resource={resource} categoryName={categoryName} />
        ) : (
          <>
            <Link
              href="/library"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Quay lại thư viện
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
              <div>
                <div className="mb-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {resource.hasVideo && <Badge color="blue" text="Video" />}
                    {resource.hasPdf && <Badge color="orange" text="PDF" />}
                    {resource.hasAudio && <Badge color="green" text="Audio" />}
                    {resource.hasFlipbook && (
                      <Badge color="purple" text="Sách điện tử" />
                    )}
                  </div>

                  <h1 className="text-4xl font-extrabold leading-tight text-slate-900">
                    {resource.title}
                  </h1>

                  <p className="mt-5 text-lg leading-8 text-slate-600">
                    {resource.shortDescription}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <ShareButtons title={resource.title} />

                    {youtubeOriginalUrl && (
                      <TrackedResourceLink
                        href={youtubeOriginalUrl}
                        resourceId={resource.id}
                        slug={resource.slug}
                        eventType="open_original"
                        className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
                      >
                        Mở video gốc
                      </TrackedResourceLink>
                    )}

                    {resource.pdfUrl && (
                      <TrackedResourceLink
                        href={resource.pdfUrl}
                        resourceId={resource.id}
                        slug={resource.slug}
                        eventType="read"
                        className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-orange-500 hover:text-orange-600"
                      >
                        Mở / tải PDF gốc
                      </TrackedResourceLink>
                    )}

                    {resource.flipbookUrl && (
                      <TrackedResourceLink
                        href={resource.flipbookUrl}
                        resourceId={resource.id}
                        slug={resource.slug}
                        eventType="read"
                        className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-purple-500 hover:text-purple-600"
                      >
                        Mở sách điện tử
                      </TrackedResourceLink>
                    )}
                  </div>
                </div>

                {(resource.audioEmbedUrl || resource.audioUrl) && (
                  <InlineAudioPlayer
                    resourceId={resource.id}
                    slug={resource.slug}
                    title={resource.title}
                    author={resource.author}
                    coverUrl={resource.coverUrl}
                    audioUrl={resource.audioEmbedUrl || resource.audioUrl}
                  />
                )}

                <MediaViewer
                  resource={{
                    ...resource,
                    audioUrl: "",
                    audioEmbedUrl: "",
                    hasAudio: false,
                  }}
                />
              </div>

              <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <img
                  src={
                    resource.coverUrl ||
                    "https://placehold.co/800x450?text=Fly+To+Sky+Library"
                  }
                  alt={resource.title}
                  className="aspect-video w-full rounded-2xl bg-slate-100 object-cover"
                />

                <div className="mt-6 space-y-4 text-sm">
                  <Info label="Chủ đề" value={categoryName} />
                  <AuthorInfo value={resource.author} />
                  <Info label="Nguồn gốc" value={resource.sourceOrigin} />
                  <Info label="Năm xuất bản" value={resource.publishYear} />
                  <Info
                    label="Ngôn ngữ"
                    value={getLanguageLabel(resource.language)}
                  />
                  <Info label="Từ khóa" value={resource.tags} />
                  <Info label="Ngày cập nhật" value={resource.updatedAt} />
                </div>

                {resource.detailDescription && (
                  <div className="mt-6 border-t border-slate-100 pt-6">
                    <h2 className="font-bold text-slate-900">Mô tả chi tiết</h2>
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                      {resource.detailDescription}
                    </p>
                  </div>
                )}

                <div className="mt-6 border-t border-slate-100 pt-6">
                  <h2 className="font-bold text-slate-900">
                    Ghi chú bản quyền
                  </h2>
                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                    {resource.copyrightNote ||
                      "Tài liệu được chia sẻ nhằm mục đích giáo dục, thiện nguyện và cộng đồng. Vui lòng kiểm tra quyền sử dụng nội dung trước khi tái đăng hoặc khai thác lại."}
                  </p>
                </div>
              </aside>
            </div>
          </>
        )}

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
                Gợi ý tiếp theo
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                Tài liệu liên quan
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Các nội dung khác trong cùng chủ đề{" "}
                <span className="font-semibold">{categoryName}</span>.
              </p>
            </div>

            {category?.slug && (
              <Link
                href={`/category/${category.slug}`}
                className="hidden rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 md:inline-flex"
              >
                Xem chủ đề này
              </Link>
            )}
          </div>

          {relatedResources.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {relatedResources.map((item) => (
                <ResourceCard key={item.id} resource={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Chưa có tài liệu liên quan trong cùng chủ đề.
            </div>
          )}
        </section>

        <PartnerCTA />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div>
      <p className="font-semibold text-slate-900">{label}</p>
      <p className="mt-1 text-slate-600">{value}</p>
    </div>
  );
}

function Badge({ text, color }: { text: string; color: string }) {
  const classes: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-700",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        classes[color] || "bg-slate-100 text-slate-700"
      }`}
    >
      {text}
    </span>
  );
}

function AuthorInfo({ value }: { value?: string }) {
  const authors = splitAuthors(value);

  if (authors.length === 0) return null;

  return (
    <div>
      <p className="font-semibold text-slate-900">Tác giả/Nguồn</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {authors.map((author) => (
          <Link
            key={author}
            href={`/author/${getAuthorSlug(author)}`}
            className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-100"
          >
            {author}
          </Link>
        ))}
      </div>
    </div>
  );
}

function getLanguageLabel(language?: string) {
  const value = (language || "").toLowerCase().trim();

  const map: Record<string, string> = {
    vi: "Tiếng Việt",
    vn: "Tiếng Việt",
    vietnamese: "Tiếng Việt",
    "tieng-viet": "Tiếng Việt",

    en: "Tiếng Anh",
    english: "Tiếng Anh",
    "tieng-anh": "Tiếng Anh",

    fr: "Tiếng Pháp",
    french: "Tiếng Pháp",
    "tieng-phap": "Tiếng Pháp",

    ja: "Tiếng Nhật",
    jp: "Tiếng Nhật",
    japanese: "Tiếng Nhật",
    "tieng-nhat": "Tiếng Nhật",

    ko: "Tiếng Hàn",
    kr: "Tiếng Hàn",
    korean: "Tiếng Hàn",
    "tieng-han": "Tiếng Hàn",

    zh: "Tiếng Trung",
    cn: "Tiếng Trung",
    chinese: "Tiếng Trung",
    "tieng-trung": "Tiếng Trung",

    es: "Tiếng Tây Ban Nha",
    spanish: "Tiếng Tây Ban Nha",

    de: "Tiếng Đức",
    german: "Tiếng Đức",

    th: "Tiếng Thái",
    thai: "Tiếng Thái",

    la: "Tiếng Lào",
    lao: "Tiếng Lào",
  };

  return map[value] || language || "Đang cập nhật";
}
