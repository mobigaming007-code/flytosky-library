import ResourceCard from "@/components/ResourceCard";
import { getCategories, getResources } from "@/lib/api";

type LibraryPageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
    category?: string;
  }>;
};

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  const params = await searchParams;

  const q = params?.q || "";
  const type = params?.type || "";
  const category = params?.category || "";

  const [resources, categories] = await Promise.all([
    getResources({ q, type, category }),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
          Thư viện
        </p>

        <h1 className="mt-2 text-4xl font-extrabold text-slate-900">
          Khám phá học liệu mở
        </h1>

        <p className="mt-4 max-w-2xl text-slate-600">
          Tìm kiếm video, audio, PDF và các bộ tài liệu cộng đồng từ Fly To Sky.
        </p>
      </div>

      <form className="mb-10 grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
        <input
          name="q"
          defaultValue={q}
          placeholder="Tìm kiếm tài liệu..."
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 md:col-span-2"
        />

        <select
          name="type"
          defaultValue={type}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">Tất cả loại</option>
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
          <option value="audio">Audio</option>
          <option value="combo">Combo</option>
        </select>

        <select
          name="category"
          defaultValue={category}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">Tất cả chủ đề</option>
          {categories.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>

        <button className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 md:col-span-4">
          Tìm kiếm
        </button>
      </form>

      <div className="mb-5 text-sm text-slate-500">
        Tìm thấy <strong>{resources.length}</strong> tài liệu
      </div>

      {resources.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {resources.map((item) => (
            <ResourceCard key={item.id} resource={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          Không tìm thấy tài liệu phù hợp.
        </div>
      )}
    </div>
  );
}
