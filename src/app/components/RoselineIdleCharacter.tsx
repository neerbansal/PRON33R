import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import roselineBase from "../../imports/4188.png";

export type RoselineAnimationState = "idle" | "jumping" | "falling" | "waiting";

export type RoselineSpriteFrames = {
  idle: string;
  jumping: string;
  falling: string;
  waiting: string;
  happy?: string;
  grumpy?: string;
  angry?: string;
  surprised?: string;
  pouting?: string;
  licking?: string;
  stretching?: string;
  sleeping?: string;
  flustered?: string;
};

export const idleMessages = [
  "Where'd you go?",
  "Bored... jumping",
  "OUCH that hurt!",
  "Hello? Anyone there?",
  "Attention seeker mode: ON",
];

export const roselineFrames: RoselineSpriteFrames = {
  idle: roselineBase,
  jumping: roselineBase,
  falling: roselineBase,
  waiting: roselineBase,
  happy: roselineBase,
  grumpy: roselineBase,
  angry: roselineBase,
  surprised: roselineBase,
  pouting: roselineBase,
  licking: roselineBase,
  stretching: roselineBase,
  sleeping: roselineBase,
  flustered: roselineBase,
};

type RoselineIdleCharacterProps = {
  frames?: RoselineSpriteFrames;
  message: string;
  onMessageChange: (message: string) => void;
  inactivityDelay?: number;
};

export default function RoselineIdleCharacter({
  frames = roselineFrames,
  message,
  onMessageChange,
  inactivityDelay = 5000,
}: RoselineIdleCharacterProps) {
  const [animationState, setAnimationState] = useState<RoselineAnimationState>("idle");
  const lastInteractionRef = useRef(Date.now());
  const isIdleLoopingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const sequenceTimersRef = useRef<number[]>([]);
  const messageIndexRef = useRef(0);

  function clearIdleTimer() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function clearSequenceTimers() {
    sequenceTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    sequenceTimersRef.current = [];
  }

  function scheduleIdleCheck() {
    clearIdleTimer();
    timerRef.current = window.setTimeout(() => {
      if (Date.now() - lastInteractionRef.current >= inactivityDelay && !isIdleLoopingRef.current) {
        startIdleLoop();
        return;
      }
      scheduleIdleCheck();
    }, inactivityDelay);
  }

  function startIdleLoop() {
    clearSequenceTimers();
    isIdleLoopingRef.current = true;
    const nextMessage = idleMessages[messageIndexRef.current % idleMessages.length];
    messageIndexRef.current += 1;

    setAnimationState("jumping");
    onMessageChange(nextMessage);

    sequenceTimersRef.current = [
      window.setTimeout(() => {
        if (isIdleLoopingRef.current) {
          setAnimationState("falling");
          onMessageChange(nextMessage);
        }
      }, 1000),
      window.setTimeout(() => {
        if (isIdleLoopingRef.current) {
          setAnimationState("waiting");
          onMessageChange(nextMessage === "Bored... jumping" ? "OUCH that hurt!" : nextMessage);
        }
      }, 2000),
      window.setTimeout(() => {
        if (isIdleLoopingRef.current) {
          isIdleLoopingRef.current = false;
          setAnimationState("idle");
          scheduleIdleCheck();
        }
      }, 3200),
    ];
  }

  useEffect(() => {
    function resetInactivity() {
      lastInteractionRef.current = Date.now();
      isIdleLoopingRef.current = false;
      clearSequenceTimers();
      setAnimationState("idle");
      scheduleIdleCheck();
    }

    scheduleIdleCheck();
    window.addEventListener("pointerdown", resetInactivity);
    window.addEventListener("keydown", resetInactivity);
    window.addEventListener("wheel", resetInactivity, { passive: true });

    return () => {
      clearIdleTimer();
      clearSequenceTimers();
      window.removeEventListener("pointerdown", resetInactivity);
      window.removeEventListener("keydown", resetInactivity);
      window.removeEventListener("wheel", resetInactivity);
    };
  }, [inactivityDelay]);

  const sprite = frames[animationState];
  const motionByState = {
    idle: { y: 0, rotate: 0, scale: 1, opacity: 1 },
    jumping: { y: -34, rotate: -4, scale: 1.08, opacity: 1 },
    falling: { y: 12, rotate: 3, scale: 1.02, opacity: 1 },
    waiting: { y: 8, rotate: [-2, 2, -1, 0], scale: [1.08, 0.92, 1], opacity: 1 },
  }[animationState];

  return (
    <>
      <motion.div
        className="absolute -top-10 left-1/2 min-w-44 -translate-x-1/2 border-2 border-[#2b1d69] bg-[#fffdf8] px-2 py-1 text-center font-['Pixelify_Sans'] text-[0.62rem] font-bold uppercase leading-tight tracking-[0.06em] text-[#2b1d69] shadow-[3px_3px_0_#2b1d69]"
        animate={{ y: animationState === "falling" ? -8 : 0, scale: animationState === "waiting" ? [1, 1.08, 1] : 1 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        {message}
      </motion.div>
      <div className="absolute -bottom-1 left-1/2 h-5 w-20 -translate-x-1/2 rounded-[50%] bg-[#24185d]/35 blur-[1px]" />
      <motion.img
        key={animationState}
        src={sprite}
        alt="Roséline, a grumpy tsundere pixel cat with gaming headphones"
        className="relative h-32 w-32 object-contain drop-shadow-[5px_5px_0_rgba(36,24,93,0.58)] [image-rendering:pixelated] sm:h-40 sm:w-40"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={motionByState}
        transition={{ duration: animationState === "jumping" || animationState === "falling" ? 1 : 0.28, ease: "easeInOut" }}
      />
      <div className="absolute bottom-3 right-2 border-2 border-[#2b1d69] bg-[#8f67ff] px-1.5 py-0.5 font-['Pixelify_Sans'] text-[0.54rem] font-bold uppercase text-white shadow-[2px_2px_0_#2b1d69]">
        Roséline
      </div>
    </>
  );
}
