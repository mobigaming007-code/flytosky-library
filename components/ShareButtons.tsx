"use client";

type ShareButtonsProps = {
  title: string;
};

export default function ShareButtons({ title }: ShareButtonsProps) {
  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title,
        text: title,
        url,
      });
      return;
    }

    await navigator.clipboard.writeText(url);
    alert("Đã sao chép liên kết tài liệu.");
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
    >
      Chia sẻ tài liệu
    </button>
  );
}
