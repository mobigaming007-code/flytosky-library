import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Fly To Sky"
                className="h-12 w-12 object-contain"
              />

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Thư viện số Fly To Sky
                </h3>
                <p className="text-sm text-slate-500">
                  Không gian học liệu mở vì cộng đồng
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
              Nền tảng lưu trữ và chia sẻ học liệu mở của Hệ thống từ thiện Fly
              To Sky, giúp cộng đồng có thể xem video, nghe audio và đọc tài
              liệu miễn phí.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                Video
              </span>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700">
                PDF
              </span>
              <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
                Audio
              </span>
              <span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">
                Học liệu mở
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Điều hướng
            </h4>

            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-blue-600">
                  Thư viện
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600">
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Nội dung
            </h4>

            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Video truyền cảm hứng</li>
              <li>Sách và tài liệu PDF</li>
              <li>Audio / Podcast</li>
              <li>Chủ đề cộng đồng</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6">
          <div className="flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Fly To Sky. All rights reserved.</p>

            <p>
              Nội dung được sử dụng cho mục đích giáo dục, thiện nguyện và cộng
              đồng.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
