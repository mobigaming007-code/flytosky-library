import PartnerCTA from "@/components/PartnerCTA";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
        Giới thiệu
      </p>

      <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
        Thư viện số Fly To Sky
      </h1>

      <div className="mt-8 space-y-6 text-lg leading-8 text-slate-700">
        <p>
          Thư viện số Fly To Sky là không gian học liệu mở, nơi lưu trữ và chia
          sẻ các nội dung video, audio và PDF phục vụ giáo dục, thiện nguyện và
          cộng đồng.
        </p>

        <p>
          Website hướng đến việc giúp người dùng dễ dàng tiếp cận tri thức, câu
          chuyện truyền cảm hứng và tài liệu thực hành thông qua một giao diện
          đơn giản, thân thiện và hoàn toàn miễn phí.
        </p>

        <p>
          Các tài liệu được tổ chức theo chủ đề để người xem có thể nhanh chóng
          tìm kiếm, đọc, nghe và chia sẻ nội dung phù hợp.
        </p>
      </div>

      <PartnerCTA />
    </div>
  );
}
