"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  transcript: string;
  audioSrc?: string | null;
  durationLabel?: string;
};

const WAVE = [
  8, 16, 8, 24, 32, 24, 16, 32, 24, 8, 16, 8, 16, 8, 24, 32, 24, 8, 16, 8, 24, 8, 8,
] as const;

export function SpeakingAudioPlayer({
  transcript,
  audioSrc,
  durationLabel = "00:45",
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  function stopAll() {
    window.speechSynthesis?.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaying(false);
  }

  async function togglePlay() {
    if (playing) {
      stopAll();
      return;
    }

    if (audioSrc) {
      const el = audioRef.current;
      if (!el) return;
      try {
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
      return;
    }

    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(transcript);
    utter.rate = 0.95;
    utter.onend = () => setPlaying(false);
    utter.onerror = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  return (
    <div className="mt-6 flex items-center gap-4 border-t border-[rgba(199,196,219,0.2)] pt-6">
      {audioSrc ? (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="none"
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
        />
      ) : null}
      <button
        type="button"
        onClick={togglePlay}
        className="flex size-10 shrink-0 items-center justify-center overflow-clip rounded-full bg-[#e3dfff] transition hover:bg-[#d4ccff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50"
        aria-label={playing ? "Pause sample answer" : "Play sample answer"}
      >
        {playing ? (
          <span className="flex gap-0.5" aria-hidden>
            <span className="h-3 w-1 rounded-sm bg-[#2D5BFF]" />
            <span className="h-3 w-1 rounded-sm bg-[#2D5BFF]" />
          </span>
        ) : (
          <Image
            src="/ielts/play-btn.svg"
            alt=""
            width={11}
            height={14}
            className="h-3.5 w-[11px]"
          />
        )}
      </button>
      <div
        className={`flex h-8 flex-1 items-center gap-0.5 ${playing ? "opacity-100" : "opacity-60"}`}
        aria-hidden
      >
        {WAVE.map((h, i) => (
          <span
            key={i}
            className={`w-1 rounded-full ${
              playing || i < 17 ? "bg-[#2D5BFF]" : "bg-[#777589]"
            } ${playing ? "animate-pulse" : ""}`}
            style={{
              height: `${h}px`,
              animationDelay: playing ? `${i * 40}ms` : undefined,
            }}
          />
        ))}
      </div>
      <span className="sr-only">{durationLabel}</span>
    </div>
  );
}
