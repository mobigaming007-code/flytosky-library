export default function PartnerCTA() {
  return (
    <section className="mt-16 overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 p-7 text-white shadow-sm md:p-10">
      <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-center">
        <div>
          <p className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
            Đồng hành cùng Fly To Sky
          </p>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
            Hợp tác sáng tạo nội dung cho Thư viện số
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-blue-50 md:text-base">
            Các đơn vị, cá nhân mong muốn đồng hành, hợp tác, tài trợ hoặc tư
            vấn thực hiện các Dự án CSR, ESG theo yêu cầu xin liên hệ với Hệ
            thống từ thiện Fly To Sky.
          </p>
        </div>

        <div className="rounded-[1.5rem] bg-white/12 p-5 ring-1 ring-white/20 backdrop-blur">
          <div className="space-y-4 text-sm">
            <ContactItem
              label="Điện thoại"
              value="0375.136.800"
              href="tel:0375136800"
            />
            <ContactItem
              label="Điện thoại"
              value="0935.939.446"
              href="tel:0935939446"
            />
            <ContactItem
              label="Email"
              value="lienhe@flytoskycharity.vn"
              href="mailto:lienhe@flytoskycharity.vn"
            />
            <ContactItem
              label="Email"
              value="donghanh@flytoskycharity.vn"
              href="mailto:donghanh@flytoskycharity.vn"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-2xl bg-white px-4 py-3 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-bold">{value}</p>
    </a>
  );
}
