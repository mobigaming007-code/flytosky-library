import Link from "next/link";
import PartnerCTA from "@/components/PartnerCTA";

export default function DonatePage() {
  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/20">
              Đồng hành cùng Thư viện số
            </p>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Quyên góp cho dự án Tủ sách Bồ câu trắng
            </h1>

            <p className="mt-5 text-lg leading-8 text-blue-50">
              Mỗi đóng góp giúp Fly To Sky mở rộng tài nguyên học tập, đưa sách
              và tri thức đến gần hơn với trẻ em, học sinh và cộng đồng ở những
              khu vực còn nhiều khó khăn.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
              Quyên góp nhanh
            </p>

            <h2 className="mt-3 text-2xl font-extrabold text-slate-900 md:text-3xl">
              Chuyển khoản qua MB Bank
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-500">
              Vui lòng ghi đúng cú pháp để Fly To Sky ghi nhận và cấp Giấy xác
              nhận ủng hộ chính xác.
            </p>

            <div className="mt-7 grid gap-4">
              <InfoRow
                label="Ngân hàng"
                value="Ngân hàng Thương mại Cổ phần Quân đội (MB Bank)"
              />
              <InfoRow label="Số tài khoản" value="9446" />
              <InfoRow
                label="Tên tài khoản"
                value="FLY TO SKY CHARITY (DNXH TU THIEN VA HTPTCD FLY TO SKY)"
              />
              <InfoRow
                label="Cú pháp"
                value="TUSACH + HỌ VÀ TÊN + SỐ ĐIỆN THOẠI/EMAIL LIÊN HỆ"
                highlight
              />
            </div>

            <div className="mt-7 rounded-3xl bg-blue-50 p-5 text-sm leading-7 text-blue-900">
              Tài khoản <strong>9446</strong> là tài khoản MB Bank mở cho các tổ
              chức, cá nhân thiện nguyện và được sao kê 24/24 trực tiếp tại App
              “Thiện Nguyện”.
            </div>
          </div>

          <aside className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
            <div className="rounded-[1.75rem] bg-orange-50 p-5">
              <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
                <img
                  src="/donate-qr.jpg"
                  alt="Mã QR ủng hộ dự án Thư viện số Fly To Sky"
                  className="mx-auto aspect-square w-full max-w-[260px] rounded-2xl object-contain"
                />
              </div>

              <div className="mt-5 text-center">
                <p className="font-extrabold text-slate-900">
                  Quét mã QR để ủng hộ
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sử dụng ứng dụng ngân hàng hoặc ví điện tử để thực hiện giao
                  dịch nhanh.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <SupportCard
            number="01"
            title="Ghi đúng cú pháp"
            description="Vui lòng ghi đúng cú pháp THUVIEN + HỌ VÀ TÊN + SĐT/EMAIL để được ghi nhận nhanh."
          />

          <SupportCard
            number="02"
            title="Giấy xác nhận ủng hộ"
            description="Mọi đóng góp đều được cấp Giấy xác nhận ủng hộ sau khi Fly To Sky nhận đủ thông tin."
          />

          <SupportCard
            number="03"
            title="Hỗ trợ quyết toán thuế"
            description="Đóng góp từ 500.000₫ trở lên, nếu cần giấy xác nhận để quyết toán thuế TNCN, vui lòng liên hệ Zalo 0849.583.689."
          />
        </div>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                Tra cứu minh chứng
              </p>

              <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
                Thông tin về Giấy xác nhận ủng hộ
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Giấy xác nhận sẽ được tra cứu trên Cổng thông tin tra cứu Giấy
                chứng nhận của Hệ thống từ thiện Fly To Sky trong vòng{" "}
                <strong>7–10 ngày</strong> kể từ khi Fly To Sky nhận được thông
                tin đầy đủ gồm tên, SĐT/Email, số tiền hoặc danh sách hiện vật.
              </p>
            </div>

            <div className="flex lg:justify-end">
              <Link
                href="https://certificates.flytoskycharity.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-700"
              >
                Tra cứu Giấy xác nhận
              </Link>
            </div>
          </div>
        </section>

        <PartnerCTA />
      </section>
    </main>
  );
}

function InfoRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-orange-100 bg-orange-50"
          : "border-slate-100 bg-slate-50"
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p
        className={`mt-2 text-base font-bold leading-7 ${
          highlight ? "text-orange-700" : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function SupportCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-sm font-extrabold text-blue-600">
        {number}
      </div>

      <h3 className="mt-5 text-lg font-extrabold text-slate-900">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p>
    </div>
  );
}
