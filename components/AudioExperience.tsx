"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Resource } from "@/lib/api";

type AudioExperienceProps = {
  resource: Resource;
  categoryName: string;
};

type TabKey = "overview" | "info" | "copyright";

export default function AudioExperience({
  resource,
  categoryName,
}: AudioExperienceProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [openPlayer, setOpenPlayer] = useState(false);

  const audioSrc = useMemo(() => {
    return resource.audioEmbedUrl || "";
  }, [resource.audioEmbedUrl]);

  const sourcePageUrl = resource.audioUrl || resource.audioEmbedUrl || "";

  const languageLabel = getLanguageLabel(resource.language);

  async function handleShare() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: resource.title,
          text: resource.shortDescription || resource.title,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      alert("Đã sao chép liên kết audio.");
    } catch {
      // Người dùng hủy chia sẻ thì bỏ qua
    }
  }

  return (
    <>
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-pink-50 px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/library"
              className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              ← Quay lại thư viện
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:border-blue-300"
            >
              Chia sẻ
            </button>
          </div>

          <div className="mt-8 grid gap-7 md:grid-cols-[180px_1fr] md:items-center">
            <div className="mx-auto w-full max-w-[180px]">
              <div className="rounded-[1.5rem] bg-white p-2 shadow-md">
                <img
                  src={
                    resource.coverUrl ||
                    "https://placehold.co/600x600?text=Fly+To+Sky+Audio"
                  }
                  alt={resource.title}
                  className="aspect-square w-full rounded-[1.25rem] object-cover"
                />
              </div>
            </div>

            <div>
              <div className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-bold text-pink-700">
                Audio / Podcast
              </div>

              <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                {resource.title}
              </h1>

              <p className="mt-3 text-lg font-semibold text-blue-700">
                {resource.author || "Fly To Sky"}
              </p>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
                {resource.shortDescription ||
                  "Nội dung audio dành cho cộng đồng, được chia sẻ qua thư viện số Fly To Sky."}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setOpenPlayer(true)}
                  className="inline-flex items-center justify-center rounded-full bg-pink-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-600"
                >
                  ▶ Nghe ngay
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-b border-slate-100 bg-white px-6 py-6 md:grid-cols-4 md:px-10">
          <MiniInfo label="Chủ đề" value={categoryName || "Đang cập nhật"} />
          <MiniInfo label="Ngôn ngữ" value={languageLabel} />
          <MiniInfo
            label="Ngày cập nhật"
            value={resource.updatedAt || "Đang cập nhật"}
          />
          <MiniInfo
            label="Nguồn"
            value={resource.sourceOrigin || resource.author || "Đang cập nhật"}
          />
        </div>

        <div className="bg-white px-6 py-6 md:px-10">
          <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
            <TabButton
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              Tổng quan
            </TabButton>

            <TabButton
              active={activeTab === "info"}
              onClick={() => setActiveTab("info")}
            >
              Thông tin
            </TabButton>

            <TabButton
              active={activeTab === "copyright"}
              onClick={() => setActiveTab("copyright")}
            >
              Bản quyền
            </TabButton>
          </div>

          <div className="pt-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-xl font-bold text-slate-900">Giới thiệu</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-8 text-slate-600">
                  {resource.detailDescription ||
                    resource.shortDescription ||
                    "Hiện chưa có mô tả chi tiết cho nội dung audio này."}
                </p>
              </div>
            )}

            {activeTab === "info" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem label="Tiêu đề" value={resource.title} />
                <InfoItem
                  label="Tác giả / Nguồn"
                  value={resource.author || "Đang cập nhật"}
                />
                <InfoItem
                  label="Chủ đề"
                  value={categoryName || "Đang cập nhật"}
                />
                <InfoItem
                  label="Nguồn gốc"
                  value={resource.sourceOrigin || "Đang cập nhật"}
                />
                <InfoItem label="Ngôn ngữ" value={languageLabel} />
                <InfoItem
                  label="Năm xuất bản"
                  value={resource.publishYear || "Đang cập nhật"}
                />
                <InfoItem
                  label="Ngày cập nhật"
                  value={resource.updatedAt || "Đang cập nhật"}
                />
                <InfoItem
                  label="Từ khóa"
                  value={resource.tags || "Đang cập nhật"}
                />
              </div>
            )}

            {activeTab === "copyright" && (
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Ghi chú bản quyền
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-8 text-slate-600">
                  {resource.copyrightNote ||
                    "Tài liệu được chia sẻ nhằm mục đích giáo dục, thiện nguyện và cộng đồng. Vui lòng kiểm tra quyền sử dụng trước khi tái đăng hoặc khai thác lại."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {openPlayer && (
        <AudioPlayerModal
          resource={resource}
          audioSrc={audioSrc}
          sourcePageUrl={sourcePageUrl}
          onClose={() => setOpenPlayer(false)}
        />
      )}
    </>
  );
}

function AudioPlayerModal({
  resource,
  audioSrc,
  sourcePageUrl,
  onClose,
}: {
  resource: Resource;
  audioSrc: string;
  sourcePageUrl: string;
  onClose: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    const handleLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    const tryAutoPlay = async () => {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    };

    tryAutoPlay();

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioSrc]);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  }

  function seekBy(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;

    const next = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      duration || audio.currentTime + seconds,
    );

    audio.currentTime = next;
    setCurrentTime(next);
  }

  function handleSeek(value: string) {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const next = (Number(value) / 100) * duration;
    audio.currentTime = next;
    setCurrentTime(next);
  }

  function changeRate() {
    const rates = [1, 1.25, 1.5, 1.75, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];

    setPlaybackRate(nextRate);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 px-0 backdrop-blur-md md:items-center md:px-4">
      <button
        type="button"
        aria-label="Đóng trình phát"
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-t-[2.25rem] bg-slate-950 shadow-2xl ring-1 ring-white/10 md:rounded-[2.25rem]">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-950 to-pink-950" />
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative px-6 pb-7 pt-6 text-white">
            <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-white/30 md:hidden" />

            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="relative">
                  {isPlaying && (
                    <div className="absolute inset-0 animate-pulse rounded-[1.75rem] bg-pink-400/30 blur-xl" />
                  )}

                  <img
                    src={
                      resource.coverUrl ||
                      "https://placehold.co/300x300?text=Audio"
                    }
                    alt={resource.title}
                    className="relative h-24 w-24 rounded-[1.5rem] bg-white object-cover shadow-xl ring-1 ring-white/20"
                  />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-pink-300">
                    {isPlaying ? "Đang phát" : "Sẵn sàng nghe"}
                  </p>

                  <h3 className="mt-2 max-w-md text-xl font-extrabold leading-snug text-white">
                    {resource.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {resource.author || "Fly To Sky"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Đóng
              </button>
            </div>

            <div className="mt-8">
              <AnimatedWaveform isPlaying={isPlaying} />
            </div>
          </div>
        </div>

        <div className="bg-slate-950 px-6 pb-7 text-white">
          {audioSrc ? (
            <audio ref={audioRef} src={audioSrc} preload="metadata" />
          ) : (
            <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-5 text-sm text-slate-300">
              Chưa có đường dẫn audio trực tiếp hợp lệ.
            </div>
          )}

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-300">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={Number.isFinite(progress) ? progress : 0}
              onChange={(event) => handleSeek(event.target.value)}
              className="h-2 w-full cursor-pointer accent-pink-500"
            />

            <div className="mt-6 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => seekBy(-15)}
                className="rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-white hover:bg-white/20"
              >
                -15s
              </button>

              <button
                type="button"
                onClick={togglePlay}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-black text-slate-950 shadow-xl transition hover:scale-105"
              >
                {isPlaying ? "Ⅱ" : "▶"}
              </button>

              <button
                type="button"
                onClick={() => seekBy(15)}
                className="rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-white hover:bg-white/20"
              >
                +15s
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={changeRate}
                className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white hover:border-pink-400 hover:text-pink-300"
              >
                Tốc độ {playbackRate}x
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-sm leading-6 text-slate-400">
            Nội dung audio được phát trực tiếp trên Thư viện số Fly To Sky. Vui
            lòng không sao chép, tải xuống hoặc phân phối lại nếu chưa được cho
            phép.
          </p>
        </div>
      </div>
    </div>
  );
}

function AnimatedWaveform({ isPlaying }: { isPlaying: boolean }) {
  const bars = Array.from({ length: 72 });

  return (
    <div className="flex h-28 items-center justify-center gap-1.5 rounded-[1.5rem] bg-white/5 px-4 ring-1 ring-white/10">
      {bars.map((_, index) => {
        const delay = `${(index % 12) * 0.08}s`;
        const isPink = index < 34;

        return (
          <span
            key={index}
            className={`block w-1.5 rounded-full ${
              isPlaying ? "animate-[audioWave_1.2s_ease-in-out_infinite]" : ""
            } ${isPink ? "bg-pink-400" : "bg-blue-300"}`}
            style={{
              height: `${18 + ((index * 13) % 46)}px`,
              animationDelay: delay,
              opacity: isPlaying ? 1 : 0.45,
            }}
          />
        );
      })}

      <style jsx>{`
        @keyframes audioWave {
          0%,
          100% {
            transform: scaleY(0.45);
            opacity: 0.55;
          }
          50% {
            transform: scaleY(1.25);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
        active
          ? "bg-blue-700 text-white shadow-sm"
          : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
      }`}
    >
      {children}
    </button>
  );
}

function MiniInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 line-clamp-2 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}

function getLanguageLabel(language?: string) {
  const value = (language || "").toLowerCase().trim();

  const map: Record<string, string> = {
    vi: "Tiếng Việt",
    vn: "Tiếng Việt",
    vietnamese: "Tiếng Việt",
    en: "Tiếng Anh",
    english: "Tiếng Anh",
    fr: "Tiếng Pháp",
    french: "Tiếng Pháp",
    ja: "Tiếng Nhật",
    japanese: "Tiếng Nhật",
    ko: "Tiếng Hàn",
    korean: "Tiếng Hàn",
    zh: "Tiếng Trung",
    chinese: "Tiếng Trung",
  };

  return map[value] || language || "Đang cập nhật";
}

function formatTime(seconds: number) {
  if (!seconds || !Number.isFinite(seconds)) return "00:00";

  const minutes = Math.floor(seconds / 60);
  const remainSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(remainSeconds).padStart(
    2,
    "0",
  )}`;
}
