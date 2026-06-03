import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white">
            <img
              src="/logo.png"
              alt="Fly To Sky"
              className="h-9 w-9 object-contain"
            />
          </div>

          <div>
            <p className="text-base font-bold text-slate-900">
              Hệ thống từ thiện Fly To Sky
            </p>
            <p className="text-xs text-slate-500">Nền tảng thư viện số</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/" className="hover:text-blue-600">
            Trang chủ
          </Link>

          <Link href="/library" className="hover:text-blue-600">
            Thư viện
          </Link>

          <Link href="/about" className="hover:text-blue-600">
            Giới thiệu
          </Link>
        </nav>

        <Link
          href="/library"
          className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
        >
          Khám phá
        </Link>
      </div>
    </header>
  );
}
