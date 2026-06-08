"use client";

import { trackResourceEvent } from "@/lib/track";
import { useEffect, useRef, useState } from "react";

type InlineAudioPlayerProps = {
  resourceId?: string;
  slug: string;
  title: string;
  author?: string;
  coverUrl?: string;
  audioUrl?: string;
};

export default function InlineAudioPlayer({
  resourceId,
  slug,
  title,
  author,
  coverUrl,
  audioUrl,
}: InlineAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    function syncDuration() {
      const value = audio.duration;

      if (Number.isFinite(value) && value > 0) {
        setDuration(value);
      }
    }

    function handleLoadedMetadata() {
      syncDuration();
    }

    function handleDurationChange() {
      syncDuration();
    }

    function handleCanPlay() {
      syncDuration();
    }

    function handleTimeUpdate() {
      setCurrentTime(audio.currentTime || 0);
      syncDuration();
    }

    function handlePlay() {
      setIsPlaying(true);
      syncDuration();
    }

    function handlePause() {
      setIsPlaying(false);
    }

    function handleEnded() {
      setIsPlaying(false);
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  async function togglePlay() {
    const audio = audioRef.current;

    if (!audio || !audioUrl) return;

    if (audio.paused) {
      await trackResourceEvent({
        resourceId,
        slug,
        eventType: "listen",
      });

      await audio.play();
    } else {
      audio.pause();
    }
  }

  function seekBy(seconds: number) {
    const audio = audioRef.current;

    if (!audio) return;

    const maxDuration = duration || audio.duration || 0;

    const nextTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      maxDuration || audio.currentTime + seconds,
    );

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function handleSeek(value: string) {
    const audio = audioRef.current;

    if (!audio || !duration) return;

    const nextTime = (Number(value) / 100) * duration;

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  if (!audioUrl) return null;

  return (
    <section className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <p className="text-sm font-bold uppercase tracking-wide text-pink-500">
          Bản audio của tài liệu
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
          Nghe audio
        </h2>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-pink-950 p-6 md:p-8">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative grid gap-6 md:grid-cols-[120px_1fr] md:items-center">
          <div className="mx-auto w-full max-w-[120px] md:mx-0">
            <img
              src={coverUrl || "https://placehold.co/600x600?text=Audio"}
              alt={title}
              className="aspect-square w-full rounded-[1.5rem] bg-white/10 object-cover shadow-sm ring-1 ring-white/10"
            />
          </div>

          <div>
            <h3 className="text-xl font-extrabold leading-tight text-white">
              {title}
            </h3>

            {author && (
              <p className="mt-2 text-sm font-semibold text-blue-100/80">
                {author}
              </p>
            )}

            <div className="mt-5 rounded-[1.5rem] bg-slate-950/70 p-5 text-white ring-1 ring-white/10">
              <Waveform isPlaying={isPlaying} />

              <audio ref={audioRef} src={audioUrl} preload="metadata" />

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span>{formatTime(currentTime)}</span>
                  <span>
                    {duration > 0 ? formatTime(duration) : "Đang tải..."}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Number.isFinite(progress) ? progress : 0}
                  onChange={(event) => handleSeek(event.target.value)}
                  className="h-2 w-full cursor-pointer accent-pink-500"
                />

                <div className="mt-5 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => seekBy(-15)}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20"
                  >
                    -15s
                  </button>

                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-black text-slate-950 shadow-lg transition hover:scale-105"
                  >
                    {isPlaying ? "Ⅱ" : "▶"}
                  </button>

                  <button
                    type="button"
                    onClick={() => seekBy(15)}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20"
                  >
                    +15s
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-blue-100/70">
              Nội dung audio được phát trực tiếp trên Thư viện số Fly To Sky.
              Vui lòng không sao chép, tải xuống hoặc phân phối lại nếu chưa
              được cho phép.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Waveform({ isPlaying }: { isPlaying: boolean }) {
  const bars = Array.from({ length: 48 });

  return (
    <div className="flex h-20 w-full items-center justify-center gap-1 overflow-hidden rounded-2xl bg-white/5 px-3 ring-1 ring-white/10">
      {bars.map((_, index) => {
        const height = 12 + ((index * 17) % 42);
        const delay = `${(index % 12) * 0.07}s`;

        return (
          <span
            key={index}
            className={`audio-wave-bar block w-1 shrink-0 rounded-full ${
              index % 2 === 0 ? "bg-pink-400" : "bg-blue-300"
            } ${isPlaying ? "audio-wave-bar-playing" : ""}`}
            style={{
              height: `${height}px`,
              animationDelay: delay,
              opacity: isPlaying ? 1 : 0.45,
              transform: isPlaying ? undefined : "scaleY(0.65)",
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

function formatTime(seconds: number) {
  if (!seconds || !Number.isFinite(seconds)) return "00:00";

  const minutes = Math.floor(seconds / 60);
  const remainSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(remainSeconds).padStart(
    2,
    "0",
  )}`;
}
