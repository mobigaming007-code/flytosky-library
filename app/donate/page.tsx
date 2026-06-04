import PartnerCTA from "@/components/PartnerCTA";
import Link from "next/link";

export const metadata = {
  title: "Quyên góp | Thư viện số Fly To Sky",
  description:
    "Thông tin quyên góp cho Thư viện số Fly To Sky qua MB Bank và VietinBank.",
};

export default function DonatePage() {
  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-300 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 text-white">
          <p className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
            Đồng hành cùng Fly To Sky Library
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Quyên góp cho Thư viện số Fly To Sky
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">
            Mỗi đóng góp giúp Thư viện số Fly To Sky tiếp tục lưu trữ, số hóa và
            lan tỏa các học liệu mở phục vụ cộng đồng.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#bank-info"
              className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg hover:bg-orange-600"
            >
              Xem thông tin chuyển khoản
            </a>

            <Link
              href="/library"
              className="rounded-full bg-white/15 px-6 py-3 font-semibold text-white ring-1 ring-white/30 hover:bg-white/20"
            >
              Khám phá thư viện
            </Link>
          </div>
        </div>
      </section>

      <section id="bank-info" className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
            Thông tin quyên góp
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            Tài khoản tiếp nhận đóng góp
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Vui lòng chuyển khoản đúng cú pháp để Fly To Sky có thể ghi nhận,
            đối soát và cấp giấy xác nhận ủng hộ.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <BankCard
            tag="Đối với quyên góp lẻ"
            bank="Ngân hàng Thương mại Cổ phần Quân đội"
            bankShort="MB Bank"
            accountNumber="9446"
            accountName="FLY TO SKY CHARITY (DNXH TU THIEN VA HTPTCD FLY TO SKY)"
            syntax="THUVIEN + HỌ VÀ TÊN + SỐ ĐIỆN THOẠI/EMAIL LIÊN HỆ"
            note='Tài khoản 9446 là tài khoản MB Bank mở cho các tổ chức, cá nhân thiện nguyện và sẽ được sao kê 24/24 trực tiếp tại App "Thiện Nguyện".'
            accent="blue"
          />

          <BankCard
            tag="Đối với dự án ký kết giữa 2 bên"
            bank="Ngân hàng TMCP Công Thương Việt Nam"
            bankShort="VietinBank - Chi nhánh Gia Lai"
            accountNumber="114628495555"
            accountName="DNXH TU THIEN VA HTPTCD FLY TO SKY (FLY TO SKY CHARITY)"
            syntax="THUVIEN + HỌ VÀ TÊN + SỐ ĐIỆN THOẠI + EMAIL"
            note="Tài khoản dùng cho các dự án, chương trình hoặc khoản đóng góp có ký kết giữa hai bên."
            accent="orange"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm md:p-8">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Thông tin về Giấy xác nhận ủng hộ
            </h2>

            <div className="mt-5 space-y-5 text-sm leading-7 text-slate-600">
              <div className="rounded-3xl bg-blue-50 p-5 text-blue-900">
                <p>
                  Mọi đóng góp đều được cấp{" "}
                  <span className="font-bold">Giấy xác nhận ủng hộ</span>. Giấy
                  xác nhận sẽ được tra cứu trên Hệ thống tra cứu Giấy chứng nhận
                  của Hệ thống từ thiện Fly To Sky trong vòng{" "}
                  <span className="font-bold">7–10 ngày</span> kể từ khi Fly To
                  Sky nhận được thông tin đầy đủ gồm tên, SĐT/Email, số tiền
                  hoặc danh sách hiện vật.
                </p>

                <a
                  href="https://gcnflytosky.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Tra cứu Giấy xác nhận
                </a>
              </div>

              <div className="rounded-3xl bg-orange-50 p-5 text-orange-900">
                <p>
                  Đóng góp từ{" "}
                  <span className="font-bold">500.000₫ trở lên</span>: Nếu bạn
                  cần Giấy xác nhận để quyết toán thuế TNCN, vui lòng liên hệ
                  Zalo{" "}
                  <a
                    href="https://zalo.me/0849583689"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold underline"
                  >
                    0849.583.689
                  </a>{" "}
                  để được hỗ trợ thủ tục.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm md:p-8">
            <h3 className="text-xl font-extrabold text-slate-900">
              Lưu ý khi chuyển khoản
            </h3>

            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <li className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                  1
                </span>
                <span>
                  Ghi đúng cú pháp chuyển khoản để được ghi nhận nhanh.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                  2
                </span>
                <span>
                  Đảm bảo thông tin họ tên và SĐT/Email liên hệ chính xác.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                  3
                </span>
                <span>
                  Nếu cần hỗ trợ giấy xác nhận hoặc thủ tục liên quan, vui lòng
                  liên hệ Fly To Sky qua Zalo.
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <PartnerCTA />
      </section>
    </div>
  );
}

function BankCard({
  tag,
  bank,
  bankShort,
  accountNumber,
  accountName,
  syntax,
  note,
  accent,
}: {
  tag: string;
  bank: string;
  bankShort: string;
  accountNumber: string;
  accountName: string;
  syntax: string;
  note: string;
  accent: "blue" | "orange";
}) {
  const accentClasses =
    accent === "blue"
      ? {
          badge: "bg-blue-50 text-blue-700",
          button: "bg-blue-600 hover:bg-blue-700",
          border: "border-blue-100",
        }
      : {
          badge: "bg-orange-50 text-orange-700",
          button: "bg-orange-500 hover:bg-orange-600",
          border: "border-orange-100",
        };

  return (
    <div
      className={`rounded-[2rem] border ${accentClasses.border} bg-white p-7 shadow-sm md:p-8`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span
            className={`inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide ${accentClasses.badge}`}
          >
            {tag}
          </span>

          <h3 className="mt-5 text-2xl font-extrabold text-slate-900">
            {bankShort}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">{bank}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <InfoBlock label="Số tài khoản" value={accountNumber} highlight />
        <InfoBlock label="Tên tài khoản" value={accountName} />
        <InfoBlock label="Cú pháp / Nội dung chuyển khoản" value={syntax} />
      </div>

      <p className="mt-5 rounded-3xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
        {note}
      </p>
    </div>
  );
}

function InfoBlock({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`mt-2 break-words font-bold ${
          highlight ? "text-3xl text-slate-900" : "text-sm text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
