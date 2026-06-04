export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
        </div>

        <h2 className="mt-6 text-xl font-bold text-slate-900">
          Đang tải thư viện
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Vui lòng chờ trong giây lát...
        </p>
      </div>
    </div>
  );
}
