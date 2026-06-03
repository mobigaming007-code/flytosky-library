import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
        404
      </p>

      <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
        Không tìm thấy trang
      </h1>

      <p className="mt-4 text-slate-600">
        Trang bạn đang tìm có thể đã được di chuyển, bị ẩn hoặc không tồn tại.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Về trang chủ
        </Link>

        <Link
          href="/library"
          className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
        >
          Khám phá thư viện
        </Link>
      </div>
    </div>
  );
}
