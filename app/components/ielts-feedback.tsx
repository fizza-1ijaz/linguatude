import Image from "next/image";
import { SpeakingAudioPlayer } from "@/app/components/speaking-audio-player";
import { getIeltsSpeakingSample } from "@/lib/content";

const COACH_POINTS = [
  "Filler-word detection",
  "Grammar highlights",
  "Fluency & coherence tips",
] as const;

const FILLERS = ["Well", "uh", "actually", "you know", "um"] as const;

function Chip({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "red" | "orange";
}) {
  const cls =
    tone === "red"
      ? "bg-[#fee2e2] text-[#b91c1c]"
      : "bg-[#ffedd5] text-[#c2410c]";
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-sm font-semibold ${cls}`}
    >
      {children}
    </span>
  );
}

export function IeltsFeedback() {
  const sample = getIeltsSpeakingSample();

  return (
    <section
      id="feedback"
      className="scroll-mt-24 bg-[#eaf0fd] py-16 sm:py-20"
      aria-labelledby="feedback-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="feedback-heading"
            className="text-balance text-3xl font-extrabold tracking-tight text-[#191c1f] sm:text-4xl lg:text-5xl lg:leading-[1.1]"
          >
            Feedback that{" "}
            <span className="text-[#2b00be]">names the fix</span>
          </h2>
          <p className="mt-3 text-pretty text-base font-medium text-[#464557] sm:text-lg">
            Detailed, actionable feedback on every answer — across speaking and
            writing.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-[rgba(199,196,219,0.3)] bg-[#f3f5f9] p-6 shadow-[0_4px_4px_rgba(0,0,0,0.25),0_20px_40px_-15px_rgba(0,0,0,0.05)] sm:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-4">
              <div className="flex size-16 items-center justify-center overflow-clip rounded-2xl bg-[#e3dfff] shadow-sm">
                <span className="relative h-[30px] w-[27px] overflow-clip">
                  <Image
                    src="/ielts/coach-icon.svg"
                    alt=""
                    width={27}
                    height={30}
                    className="size-full"
                  />
                </span>
              </div>
              <h3 className="text-3xl font-extrabold text-[#191c1f]">
                Speaking coach
              </h3>
              <p className="text-base text-[#464557]">
                Transcripts with filler-word and grammar chips per answer.
              </p>
              <ul className="mt-2 flex flex-col gap-4">
                {COACH_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-base font-medium text-[#464557]"
                  >
                    <span className="relative size-5 shrink-0 overflow-clip">
                      <Image
                        src="/ielts/bullet-check.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="size-full"
                      />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col rounded-2xl border border-[rgba(199,196,219,0.3)] bg-[#eaf0fd] p-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative h-5 w-[18px] overflow-clip">
                    <Image
                      src="/ielts/mic.svg"
                      alt=""
                      width={18}
                      height={20}
                      className="size-full"
                    />
                  </span>
                  <p className="text-sm font-bold tracking-wide text-[#2D5BFF]">
                    Your answer
                  </p>
                </div>
                <p className="text-sm font-bold tracking-wide text-[#777589]">
                  {sample.durationLabel}
                </p>
              </div>

              <p className="mt-6 flex-1 text-lg font-medium leading-[2.2] text-[#191c1f]">
                <Chip tone="red">Well,</Chip> I think <Chip tone="orange">uh</Chip>{" "}
                technology has improved our life{" "}
                <Chip tone="orange">actually</Chip> in many ways{" "}
                <Chip tone="red">you know</Chip> it makes things easier{" "}
                <Chip tone="orange">um</Chip> and saves time.
              </p>

              <SpeakingAudioPlayer
                transcript={sample.transcript}
                audioSrc={sample.audioSrc}
                durationLabel={sample.durationLabel}
              />
            </div>

            <div className="flex flex-col gap-6 rounded-2xl border border-[rgba(199,196,219,0.3)] bg-[#eaf0fd] p-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-2">
                <span className="relative size-[22px] overflow-clip">
                  <Image
                    src="/ielts/feedback-icon.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="size-full"
                  />
                </span>
                <p className="text-sm font-bold tracking-wide text-[#2D5BFF]">
                  Feedback
                </p>
              </div>

              <div>
                <p className="text-sm font-bold tracking-wide text-[#191c1f]">
                  Filler words
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FILLERS.map((word) => (
                    <Chip key={word} tone="red">
                      {word}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold tracking-wide text-[#191c1f]">
                  Grammar
                </p>
                <div className="mt-3 flex flex-col items-start gap-2">
                  <Chip tone="orange">Subject-Verb Agreement</Chip>
                  <Chip tone="orange">Article Usage</Chip>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold tracking-wide text-[#191c1f]">
                  Fluency tip
                </p>
                <p className="mt-2 text-base leading-6 text-[#464557]">
                  Try pausing naturally instead of using fillers. It improves
                  clarity and increases your band.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
