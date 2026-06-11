import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Mail, Sparkles, X } from "lucide-react";
import characterImage from "../imports/4038.png";
import pron33rUniverseLogo from "../imports/4047.png";
import pixelBackground from "../imports/92c584b8cada5cf6a61f2e0c5608cfe2.jpg";
import profileIcon from "../imports/405235fe31661005e9db369db4f732b7.jpg";
import trainBackground from "../imports/9da00d9f889d3433fd0335445d4ac5d0.jpg";
import faxxImperialLogo from "../imports/file_0000000099a47207bf31d63a17f27042.png";
import girlDialogueBox from "../imports/8e8dcm__1_.png";
import RoselineIdleCharacter from "./components/RoselineIdleCharacter";

const navItems = ["Home", "Universe", "FAXX™", "Contact"];
const profileItems = ["Pilot Dashboard", "Signal Vault", "Settings"];
const railApps = [
  { name: "Play Store", handle: "Invincible OS", href: "#play-store", color: "#7cff8a", type: "store" },
  { name: "YouTube", handle: "@pron33r", href: "https://youtube.com/@pron33r", color: "#ff4f6d", type: "link" },
  { name: "Discord", handle: "join server", href: "https://discord.gg/u5eNFxbVP", color: "#7b8cff", type: "link" },
  { name: "Reddit", handle: "u/duck_is_cute", href: "https://www.reddit.com/u/duck_is_cute/s/6bx2m7yjdj", color: "#ff9b42", type: "link" },
  { name: "Instagram", handle: "@pron33r", href: "https://instagram.com/pron33r", color: "#ff67c8", type: "link" },
];
const invincibleApps = Array.from({ length: 67 }, (_, index) => ({
  name: ["Vault", "Arcade", "Camera", "Music", "Calls", "Torch", "Maps", "Notes", "Weather", "Studio", "Mail", "Calendar", "Wallet", "Health", "Files", "Clock", "Radio", "Scanner", "Translate", "Shop", "Manga", "Anime", "RailPay", "Signals", "Terminal", "Paint", "Rooms", "News", "Books", "Cinema", "Cloud", "Security", "VPN", "Drive", "Editor", "Code", "AI Lab", "Dreams", "Pets", "Market", "Tickets", "Live", "Podcast", "Comics", "Missions", "Badges", "Friends", "Clips", "Stream", "Memo", "Recorder", "Compass", "Browser", "GamePad", "Avatar", "Themes", "Fonts", "Widgets", "Backup", "Updater", "Settings", "Support", "Labs", "Garden", "Cafe", "Stickers", "Gallery"][index],
  color: ["#ff67c8", "#7fcfff", "#fff8bf", "#b7ff5a", "#7b8cff", "#ff9b42"][index % 6],
  tag: ["social", "tools", "media", "cute", "power", "lab"][index % 6],
}));
const dynamicIslandItems = ["♪ PRON33R FM", "CALL: Roséline", "3 notifications", "Torch ON", "5G Rail", "Battery 99%", "Screen record", "Invincible OS"];
const appIconGlyphs = ["VL", "PX", "CM", "FM", "CL", "LT", "MP", "NT", "WX", "ST", "ML", "CA", "PY", "HP", "FL", "CK", "RD", "SC", "TR", "SH", "MG", "AN", "RX", "SG", "PC", "AR", "HM", "NW", "BK", "CN", "CD", "GD", "VP", "DV", "ED", "CODE", "AI", "DR", "CT", "MK", "TK", "LV", "PD", "BO", "MS", "BD", "FR", "CP", "SR", "MM", "RC", "CO", "WB", "GP", "AV", "TH", "FN", "WG", "BU", "UP", "OS", "SP", "LB", "GR", "CF", "ST", "GL"];
const settingsFeatures = Array.from({ length: 160 }, (_, index) => ({
  name: ["Wi-Fi", "Bluetooth", "Rail Data", "Hotspot", "Torch", "Battery Saver", "Dark Pixel", "Focus Mode", "DND", "Location", "NFC", "Cast", "Airplane", "VPN", "Auto Rotate", "Haptics", "Keyboard", "Notifications", "Privacy", "Face Unlock"][index % 20],
  detail: ["signal", "device", "network", "share", "light", "power", "theme", "attention", "quiet", "maps", "pay", "screen", "flight", "tunnel", "motion", "touch", "typing", "alerts", "guard", "security"][index % 20],
  enabled: index % 3 !== 0,
}));
const dreamPrompts = ["pink bullet train", "pixel moon cafe", "cat conductor", "glitch cherry forest", "sleepy arcade planet"];
type RailApp = "chatbot" | "diary" | "settings" | "playstore" | null;
const punchlineText = "REPLACE_GITHUB";
const punchlineLines = punchlineText.split("_");

type BlockBurst = {
  id: number;
  x: number;
  y: number;
};

type TouchPoint = {
  x: number;
  y: number;
};

function formatDialogueLines(message: string) {
  const words = message.split(" ");
  const targetLength = Math.ceil(message.length / 3);
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const nextLine = `${currentLine} ${word}`.trim();

    if (lines.length < 2 && currentLine && nextLine.length > targetLength) {
      lines.push(currentLine);
      currentLine = word;
      return;
    }

    currentLine = nextLine;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  while (lines.length < 3) {
    lines.push("");
  }

  return lines.slice(0, 3);
}

const specialGirlMessages = {
  pervert: ["PERVERT!!", "HOW DARE YOU", "TOUCH ME THERE!"],
  stop: ["STOP IT!!", "KEEP YOUR HANDS", "TO YOURSELF!"],
};

const girlMotivationMessages = [
  "You showed up, so today already has magic.",
  "I believe in you with my whole pixel heart!",
  "Keep going, superstar. Your universe is loading.",
  "You are doing better than you think, promise!",
  "One tiny step still counts as a brave step.",
  "Your dreams are not silly. They are signals.",
  "Hey, smile for me. You are built for this.",
  "Even the stars had to start as sparks.",
  "You make this universe brighter just by trying.",
  "Take your time. Great things render slowly.",
  "I am cheering for you from mission control!",
  "Do not quit now. The next door might open.",
  "Your courage is cuter than any power-up.",
  "You can rest and still be unstoppable.",
  "Today is lucky because you are here.",
  "Your next win is closer than it looks.",
  "You are not behind. You are arriving in style.",
  "Let your heart be loud, okay?",
  "Every click is a step through the universe.",
  "You have main-character energy today!",
  "I saved a little hope just for you.",
  "The sky is pixelated, but your future is clear.",
  "You are allowed to be proud of yourself.",
  "Tiny progress is still adorable progress.",
  "You are someone worth betting on.",
  "If you get tired, I will hold the lantern.",
  "Your spark did not disappear. It is charging.",
  "You are precious, powerful, and possible.",
  "The universe heard you. Keep transmitting.",
  "Come on, hero. FAXX™ is waiting for you!",
];

const sparkleStars = [
  { left: "9%", top: "18%", delay: 0, size: "size-1.5" },
  { left: "18%", top: "42%", delay: 0.7, size: "size-1" },
  { left: "27%", top: "13%", delay: 1.4, size: "size-2" },
  { left: "38%", top: "31%", delay: 0.3, size: "size-1" },
  { left: "52%", top: "19%", delay: 1.1, size: "size-1.5" },
  { left: "63%", top: "39%", delay: 1.8, size: "size-1" },
  { left: "73%", top: "14%", delay: 0.5, size: "size-2" },
  { left: "84%", top: "32%", delay: 1.6, size: "size-1.5" },
  { left: "92%", top: "21%", delay: 0.9, size: "size-1" },
];

function playPixelTouchSound() {
  const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(990, audioContext.currentTime + 0.06);

  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.035, audioContext.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.12);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.13);
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [blockBursts, setBlockBursts] = useState<BlockBurst[]>([]);
  const [faxxTransitioning, setFaxxTransitioning] = useState(false);
  const [faxxEntered, setFaxxEntered] = useState(false);
  const [touchPoint, setTouchPoint] = useState<TouchPoint>({ x: 0, y: 0 });
  const [catMood, setCatMood] = useState("Roséline is judging you");
  const [girlMessageIndex, setGirlMessageIndex] = useState(0);
  const [isPervertMode, setIsPervertMode] = useState(false);
  const [activeRailApp, setActiveRailApp] = useState<RailApp>(null);
  const [chatbotInput, setChatbotInput] = useState("");
  const [chatbotReply, setChatbotReply] = useState("FAXX BOT: choose a signal and I will decode your route.");
  const [dreamEntry, setDreamEntry] = useState("");
  const [dreamStamps, setDreamStamps] = useState<string[]>(["pink bullet train", "cat conductor"]);
  const [settingsEnabled, setSettingsEnabled] = useState(() => settingsFeatures.map((feature) => feature.enabled));

  function enterFaxxImperial() {
    if (faxxTransitioning || faxxEntered) {
      return;
    }

    setFaxxTransitioning(true);
    window.setTimeout(() => {
      setFaxxEntered(true);
    }, 760);
    window.setTimeout(() => {
      setFaxxTransitioning(false);
    }, 1450);
  }

  function returnHome() {
    setFaxxEntered(false);
    setFaxxTransitioning(false);
    setNavOpen(false);
    setProfileOpen(false);
    setActiveRailApp(null);
  }

  function refreshGirlMessage() {
    setIsPervertMode(false);
    setGirlMessageIndex((current) => {
      const next = Math.floor(Math.random() * girlMotivationMessages.length);
      return next === current ? (next + 1) % girlMotivationMessages.length : next;
    });
  }

  function triggerPervertResponse() {
    setIsPervertMode(true);
    setGirlMessageIndex(Math.random() > 0.5 ? -1 : -2);
    window.setTimeout(() => setIsPervertMode(false), 2000);
  }

  function createBlockBurst(event: React.PointerEvent<HTMLElement>) {
    const target = event.target as HTMLElement;

    if (target.closest("[data-no-block-effect=\"true\"]")) {
      return;
    }

    const id = window.performance.now();
    const burst = { id, x: event.clientX, y: event.clientY };

    setTouchPoint({ x: event.clientX, y: event.clientY });
    setCatMood(event.clientY < window.innerHeight * 0.45 ? "Touch my head gently, okay?!" : "Roséline saw that.");
    window.setTimeout(() => setCatMood("Roséline is judging you"), 1200);

    setBlockBursts((bursts) => [...bursts, burst].slice(-18));
    window.setTimeout(() => {
      setBlockBursts((bursts) => bursts.filter((item) => item.id !== id));
    }, 1000);
  }

  return (
    <main onPointerDown={createBlockBurst} className="relative min-h-screen w-full overflow-hidden bg-[#6a5bb7] text-foreground selection:bg-[#f8f4ff] selection:text-[#33246f] [image-rendering:pixelated]">
      <motion.img
        src={pixelBackground}
        alt="Pixel cloud night sky background"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center opacity-100 saturate-[0.92] contrast-110 brightness-[1.02] [image-rendering:pixelated]"
        initial={{ scale: 1.1, x: "-2%", y: "-2%" }}
        animate={{ 
          x: ["-2%", "2%", "-2%"], 
          y: ["-2%", "2%", "-2%"]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(246,240,255,0.10)_0%,rgba(98,82,179,0.12)_45%,rgba(39,29,96,0.48)_100%)]" />
      <div className="absolute inset-0 z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.26)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:8px_8px]" />
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {sparkleStars.map((star, index) => (
          <motion.span
            key={index}
            className={`absolute ${star.size} bg-white shadow-[0_0_0_1px_rgba(36,24,93,0.22),0_0_12px_rgba(255,255,255,0.95)]`}
            style={{ left: star.left, top: star.top }}
            initial={{ opacity: 0.25, scale: 0.65 }}
            animate={{ opacity: [0.25, 1, 0.25], scale: [0.65, 1.8, 0.65] }}
            transition={{ duration: 1.8, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {faxxEntered && (
        <motion.section
          className="absolute inset-0 z-30 flex min-h-screen flex-col overflow-hidden bg-[#7fcfff] text-[#1d1558]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <img
            src={trainBackground}
            alt="Pixel train countryside background"
            className="absolute inset-0 h-full w-full object-cover object-center [image-rendering:pixelated]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(114,209,255,0.08)_42%,rgba(33,30,95,0.18)_100%)]" />
          <button
            type="button"
            onClick={returnHome}
            className="absolute left-4 top-4 z-20 border-2 border-[#1f2465] bg-white/95 px-4 py-3 font-['Pixelify_Sans'] text-sm font-bold uppercase tracking-[0.12em] text-[#1f2465] shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#9ed7ff,5px_5px_0_rgba(31,36,101,0.78)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#fff8bf] sm:left-8 sm:top-7"
          >
            Home
          </button>
          <div className="relative z-10 flex max-h-screen min-h-screen flex-col items-center overflow-y-auto px-4 pb-10 pt-7 text-center sm:px-5 sm:pt-6">
            <motion.img
              src={faxxImperialLogo}
              alt="FAXX Imperial by PRON33R Universe"
              className="mt-1 w-[min(78vw,30rem)] object-contain drop-shadow-[0_8px_0_rgba(20,32,86,0.24)] [image-rendering:auto]"
              initial={{ y: -28, scale: 0.92, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.58, ease: "easeOut" }}
            />
            <motion.div
              className="absolute bottom-[17%] left-[14%] z-20 cursor-grab touch-none active:cursor-grabbing"
              drag
              dragMomentum={false}
              dragElastic={0.1}
              initial={{ x: 0, y: 18, opacity: 0 }}
              animate={{ x: touchPoint.x > 0 ? Math.max(-18, Math.min(24, touchPoint.x / 22 - 14)) : 0, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              whileDrag={{ scale: 1.08, rotate: -2 }}
              onPointerDown={(event) => {
                const box = event.currentTarget.getBoundingClientRect();
                const localY = event.clientY - box.top;

                if (localY < box.height * 0.38) {
                  setCatMood("F-fine... head pats are acceptable.");
                } else if (localY < box.height * 0.68) {
                  setCatMood("Neck scratches? I might bite.");
                } else {
                  setCatMood("Careful. Roséline has claws.");
                }
              }}
              onDragStart={() => setCatMood("Don't drag me like cargo!")}
              onDrag={(_, info) => {
                const speed = Math.hypot(info.velocity.x, info.velocity.y);
                if (speed > 900) {
                  setCatMood("HEY! Too fast!! Bite mode!");
                }
              }}
              onDragEnd={(_, info) => {
                const speed = Math.hypot(info.velocity.x, info.velocity.y);
                setCatMood(speed > 900 ? "Hmph. I styled-bite you." : "I allowed that. Obviously.");
                window.setTimeout(() => setCatMood("Roséline is judging you"), 1600);
              }}
              data-no-block-effect="true"
            >
              <RoselineIdleCharacter
                message={catMood}
                onMessageChange={setCatMood}
              />
            </motion.div>

            <motion.div
              className="mt-2 mb-3 w-full max-w-5xl"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.42, ease: "easeOut" }}
            >
              <div className="mx-auto mb-3 flex w-[min(92vw,34rem)] items-center justify-between gap-2 rounded-full border-2 border-[#1f2465] bg-[#10163f] px-4 py-2 font-['Pixelify_Sans'] text-[0.62rem] font-black uppercase text-[#c8fff6] shadow-[inset_2px_2px_0_rgba(255,255,255,0.18),0_6px_0_rgba(31,36,101,0.7)]">
                <span className="size-2 animate-pulse rounded-full bg-[#7cff8a]" />
                <motion.span animate={{ opacity: [1, 0.45, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>Dynamic Island · {dynamicIslandItems[Math.floor(Date.now() / 1800) % dynamicIslandItems.length]}</motion.span>
                <span>Invincible OS</span>
              </div>
              <div className="mb-2 border-2 border-[#1f2465] bg-white/94 px-3 py-2 font-['Pixelify_Sans'] text-xs font-black uppercase tracking-[0.12em] text-[#1f2465] shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#9ed7ff,4px_4px_0_rgba(31,36,101,0.78)]">
                FAXX™ railway launcher · powered by Invincible OS of PRON33R UNIVERSE
              </div>
              <div className="relative max-h-[42vh] overflow-y-auto border-y-4 border-[#1f2465] bg-[linear-gradient(90deg,rgba(31,36,101,0.22)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.62),rgba(239,249,255,0.86))] bg-[size:18px_18px] px-3 py-5 shadow-[inset_0_5px_0_rgba(31,36,101,0.22),inset_0_-5px_0_rgba(31,36,101,0.22)]">
                <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 bg-[#1f2465]/70 shadow-[0_-14px_0_rgba(31,36,101,0.35),0_14px_0_rgba(31,36,101,0.35)]" />
                <div className="relative grid grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                  <button type="button" onClick={() => setActiveRailApp("playstore")} className="group grid place-items-center gap-1 text-center transition-transform hover:-translate-y-1">
                    <span className="grid size-12 place-items-center rounded-full border-2 border-[#1f2465] bg-[#7cff8a] font-['Archivo_Black'] text-[0.7rem] tracking-[-0.08em] shadow-[0_4px_0_#1f2465]">PS</span>
                    <span className="font-['Pixelify_Sans'] text-[0.55rem] font-black uppercase leading-none text-[#1f2465]">Play Store</span>
                  </button>
                  {railApps.slice(1).map((app, index) => (
                    <a key={app.name} href={app.href} target="_blank" rel="noreferrer" className="group grid place-items-center gap-1 text-center transition-transform hover:-translate-y-1">
                      <span className="grid size-12 place-items-center rounded-full border-2 border-[#1f2465] font-['Archivo_Black'] text-[0.7rem] tracking-[-0.08em] shadow-[0_4px_0_#1f2465]" style={{ backgroundColor: app.color }}>{["YT", "DC", "RD", "IG"][index]}</span>
                      <span className="font-['Pixelify_Sans'] text-[0.55rem] font-black uppercase leading-none text-[#1f2465]">{app.name}</span>
                    </a>
                  ))}
                  <button type="button" onClick={() => setActiveRailApp("chatbot")} className="group grid place-items-center gap-1 text-center transition-transform hover:-translate-y-1"><span className="grid size-12 place-items-center rounded-full border-2 border-[#1f2465] bg-[#1f2465] text-xl text-white shadow-[0_4px_0_#1f2465]">AI</span><span className="font-['Pixelify_Sans'] text-[0.55rem] font-black uppercase leading-none text-[#1f2465]">Chatbot</span></button>
                  <button type="button" onClick={() => setActiveRailApp("diary")} className="group grid place-items-center gap-1 text-center transition-transform hover:-translate-y-1"><span className="grid size-12 place-items-center rounded-full border-2 border-[#1f2465] bg-[#ffe9fb] text-xl shadow-[0_4px_0_#1f2465]">DD</span><span className="font-['Pixelify_Sans'] text-[0.55rem] font-black uppercase leading-none text-[#1f2465]">Diary</span></button>
                  <button type="button" onClick={() => setActiveRailApp("settings")} className="group grid place-items-center gap-1 text-center transition-transform hover:-translate-y-1"><span className="grid size-12 place-items-center rounded-full border-2 border-[#1f2465] bg-[#fff8bf] text-xl shadow-[0_4px_0_#1f2465]">OS</span><span className="font-['Pixelify_Sans'] text-[0.55rem] font-black uppercase leading-none text-[#1f2465]">Settings</span></button>
                  {invincibleApps.map((app, index) => (
                    <button key={`${app.name}-${index}`} type="button" onClick={() => setChatbotReply(`INVINCIBLE OS: ${app.name} opened. ${app.tag} module is live.`)} className="group grid place-items-center gap-1 text-center transition-transform hover:-translate-y-1">
                      <span className="grid size-12 place-items-center rounded-full border-2 border-[#1f2465] font-['Archivo_Black'] text-[0.62rem] tracking-[-0.08em] shadow-[0_4px_0_#1f2465]" style={{ backgroundColor: app.color }}>{appIconGlyphs[index]}</span>
                      <span className="font-['Pixelify_Sans'] text-[0.5rem] font-black uppercase leading-none text-[#1f2465]">{app.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-3 top-20 z-30 w-44 overflow-hidden sm:right-2 sm:top-16 sm:w-56"
              initial={{ y: -18, opacity: 0, rotate: 5 }}
              animate={{ y: [0, -4, 0], opacity: 1, rotate: [4, 7, 4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute -left-28 top-3 w-32 border-2 border-[#1f2465] bg-[#fffdf8] px-2 py-1 text-left font-['Pixelify_Sans'] text-[0.58rem] font-black uppercase leading-tight text-[#1f2465] shadow-[3px_3px_0_#1f2465]">
                Cadarline: quit clacking rails. sleepy sister is glaring.
              </div>
              <img src="/src/imports/file_0000000054d471fa94db81aec6c4a212.png" alt="Cadarline, Roséline's sleepy sister hanging on the railway edge" onError={(event) => { event.currentTarget.src = "/src/imports/4228.png"; }} className="ml-20 mt-8 w-full object-contain drop-shadow-[5px_5px_0_rgba(31,36,101,0.55)] [clip-path:inset(0_0_38%_0)] [image-rendering:pixelated]" />
            </motion.div>
          </div>

          {activeRailApp && (
            <motion.div
              className="absolute inset-0 z-30 grid place-items-center bg-[#142066]/70 px-4 backdrop-blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
            >
              <div className="w-full max-w-5xl border-2 border-[#1f2465] bg-[#fffdf8] p-3 text-[#1f2465] shadow-[inset_2px_2px_0_#ffffff,inset_-5px_-5px_0_rgba(126,207,255,0.38),8px_8px_0_rgba(31,36,101,0.78)]">
                <div className="mb-3 flex items-center justify-between gap-3 border-b-2 border-[#1f2465] pb-2">
                  <h2 className="font-['Archivo_Black'] text-xl uppercase tracking-[-0.04em]">{activeRailApp === "chatbot" ? "FAXX CHATBOT" : activeRailApp === "settings" ? "Invincible OS Settings" : activeRailApp === "playstore" ? "PRON33R Play Store" : "Dream Diary"}</h2>
                  <button type="button" onClick={() => setActiveRailApp(null)} className="border-2 border-[#1f2465] bg-[#ff4f6d] px-2 py-1 font-['Pixelify_Sans'] text-xs font-black uppercase text-white shadow-[2px_2px_0_#1f2465]">close</button>
                </div>

                {activeRailApp === "settings" ? (
                  <div className="grid max-h-[70vh] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-4 lg:grid-cols-5">
                    {settingsFeatures.map((feature, index) => (
                      <button key={`${feature.name}-${feature.detail}-${index}`} type="button" onClick={() => setSettingsEnabled((items) => items.map((item, itemIndex) => itemIndex === index ? !item : item))} className={`border-2 border-[#1f2465] px-2 py-2 text-left font-['Pixelify_Sans'] text-[0.62rem] font-black uppercase shadow-[2px_2px_0_#1f2465] ${settingsEnabled[index] ? "bg-[#b7ff5a]" : "bg-white"}`}>
                        <span className="block text-sm">{settingsEnabled[index] ? "ON" : "OFF"} · {feature.name}</span>
                        <span className="block text-[0.52rem] text-[#5360b8]">{feature.detail} control #{index + 1}</span>
                      </button>
                    ))}
                  </div>
                ) : activeRailApp === "playstore" ? (
                  <div className="grid max-h-[70vh] gap-3 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4">
                    {[...railApps.slice(1), ...invincibleApps.slice(0, 24)].map((app, index) => (
                      <button key={`${app.name}-store-${index}`} type="button" onClick={() => setChatbotReply(`Play Store installed ${app.name}.`) } className="rounded-2xl border-2 border-[#1f2465] bg-white p-3 text-left shadow-[3px_3px_0_#1f2465] hover:bg-[#fff8bf]">
                        <span className="text-2xl">{appIconGlyphs[index % appIconGlyphs.length]}</span>
                        <span className="ml-2 font-['Archivo_Black'] uppercase text-[#1f2465]">{app.name}</span>
                        <span className="mt-2 block font-['Pixelify_Sans'] text-xs font-black uppercase text-[#5360b8]">install / open</span>
                      </button>
                    ))}
                  </div>
                ) : activeRailApp === "chatbot" ? (
                  <div className="grid max-h-[70vh] gap-3 overflow-hidden lg:grid-cols-[11rem_1fr_13rem]">
                    <aside className="space-y-2 overflow-y-auto border-2 border-[#1f2465] bg-[#eef1ff] p-2 font-['Pixelify_Sans'] text-[0.62rem] font-black uppercase">
                      {["History", "Image Gen", "Video Gen", "Deep Research", "PROCODES", "Gallery", "Voice", "Files", "Agents", "Settings"].map((tool) => <button key={tool} type="button" onClick={() => setChatbotReply(`FAXX ${tool}: module armed inside Invincible OS.`)} className="block w-full border-2 border-[#1f2465] bg-white px-2 py-2 text-left shadow-[2px_2px_0_#1f2465] hover:bg-[#fff8bf]">{tool}</button>)}
                    </aside>
                    <main className="flex min-h-[28rem] flex-col border-2 border-[#1f2465] bg-[#0f1649] p-3 text-[#c8fff6] shadow-[inset_4px_4px_0_rgba(0,0,0,0.28)]">
                      <div className="mb-3 font-['Archivo_Black'] text-2xl uppercase text-[#fff8bf]">PRON33R Neural Rail</div>
                      <div className="flex-1 space-y-2 overflow-y-auto text-left font-['Pixelify_Sans'] text-sm font-bold"><div className="border-2 border-[#7fcfff] bg-[#17236c] p-3">{chatbotReply}</div><div className="border-2 border-[#ff67c8] bg-[#24185d] p-3">Ask for image gen, video gen, deep research, PROCODES, or gallery sorting.</div></div>
                      <div className="mt-3 flex gap-2"><input value={chatbotInput} onChange={(event) => setChatbotInput(event.target.value)} placeholder="message Invincible OS..." className="min-w-0 flex-1 border-2 border-[#7fcfff] bg-white px-3 py-2 font-['Pixelify_Sans'] text-sm font-bold text-[#1f2465] outline-none" /><button type="button" onClick={() => { const cleanSignal = chatbotInput.trim() || "build me a universe"; setChatbotReply(`INVINCIBLE CHAT: ${cleanSignal.toUpperCase()} queued. PROCODES and research engines are glowing.`); setChatbotInput(""); }} className="border-2 border-[#7fcfff] bg-[#ff67c8] px-3 py-2 font-['Pixelify_Sans'] text-xs font-black uppercase text-white shadow-[3px_3px_0_#000]">send</button></div>
                    </main>
                    <aside className="border-2 border-[#1f2465] bg-[#ffe9fb] p-2"><div className="mb-2 font-['Archivo_Black'] uppercase">Gallery</div><div className="grid grid-cols-2 gap-2">{["Photo", "Render", "Video", "Meme", "Dream", "Code"].map((item, index) => <button key={item} type="button" className="aspect-square border-2 border-[#1f2465] bg-white font-['Pixelify_Sans'] text-[0.6rem] font-black shadow-[2px_2px_0_#1f2465]" style={{ backgroundColor: ["#fff8bf", "#7fcfff", "#ffdcf4"][index % 3] }}>{item}<br />+</button>)}</div><button type="button" onClick={() => setChatbotReply("Gallery: photo upload slot simulated. Drop your images into imports and I will frame them.")} className="mt-3 w-full border-2 border-[#1f2465] bg-[#b7ff5a] px-2 py-2 font-['Pixelify_Sans'] text-xs font-black uppercase shadow-[2px_2px_0_#1f2465]">add photos</button></aside>
                  </div>
                ) : (
                  <div>
                    <div className="mb-2 flex justify-end"><button type="button" onClick={() => setDreamEntry(dreamPrompts[Math.floor(Math.random() * dreamPrompts.length)])} className="border-2 border-[#1f2465] bg-[#fff8bf] px-2 py-1 font-['Pixelify_Sans'] text-[0.62rem] font-black uppercase shadow-[2px_2px_0_#1f2465]">random dream</button></div>
                    <textarea value={dreamEntry} onChange={(event) => setDreamEntry(event.target.value)} placeholder="dear diary... I rode a pixel train through candy stars..." className="h-32 w-full resize-none border-2 border-[#1f2465] bg-white px-3 py-2 font-['Pixelify_Sans'] text-sm font-bold leading-relaxed text-[#1f2465] outline-none" />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button type="button" onClick={() => { const entry = dreamEntry.trim(); if (entry) { setDreamStamps((items) => [entry, ...items].slice(0, 5)); setDreamEntry(""); } }} className="border-2 border-[#1f2465] bg-[#ff67c8] px-3 py-2 font-['Pixelify_Sans'] text-xs font-black uppercase text-white shadow-[3px_3px_0_#1f2465]">stamp dream ✦</button>
                      {dreamStamps.map((stamp, index) => (<button key={`${stamp}-${index}`} type="button" onClick={() => setDreamEntry(stamp)} className="border-2 border-[#1f2465] bg-white px-2 py-1 font-['Pixelify_Sans'] text-[0.65rem] font-bold shadow-[2px_2px_0_rgba(31,36,101,0.55)] hover:bg-[#fff8bf]">{stamp}</button>))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.section>
      )}

      <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
        {blockBursts.map((burst) => (
          <motion.div
            key={burst.id}
            className="absolute size-24 -translate-x-1/2 -translate-y-1/2"
            style={{ left: burst.x, top: burst.y }}
            initial={{ opacity: 1, scale: 0.75 }}
            animate={{ opacity: 0, scale: 1.35 }}
            transition={{ duration: 0.95, ease: "easeOut" }}
          >
            <span className="absolute left-10 top-10 size-5 bg-white shadow-[0_0_10px_5px_rgba(255,255,255,1),0_0_24px_12px_rgba(255,255,255,0.78),0_0_0_1px_rgba(255,255,255,1)]" />
          </motion.div>
        ))}
      </div>

      <div className={`pointer-events-none fixed inset-0 z-[80] overflow-hidden transition-opacity duration-300 ${faxxTransitioning ? "opacity-100" : "opacity-0"}`}>
        <motion.div
          className="absolute inset-0 bg-[#24185d] [background-image:linear-gradient(45deg,rgba(255,255,255,0.12)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.12)_75%),linear-gradient(45deg,rgba(255,255,255,0.12)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.12)_75%)] [background-position:0_0,8px_8px] [background-size:16px_16px]"
          initial={false}
          animate={{ scaleX: faxxTransitioning ? 1 : 0 }}
          transition={{ duration: 0.42, ease: "easeInOut" }}
        />
        {[0, 1, 2, 3, 4, 5].map((stripe) => (
          <motion.div
            key={stripe}
            className="absolute h-[17vh] w-full border-y-2 border-[#24185d] bg-[#8f67ff] shadow-[inset_0_4px_0_rgba(255,255,255,0.24),inset_0_-5px_0_rgba(36,24,93,0.3)]"
            style={{ top: `${stripe * 16.66}%` }}
            initial={false}
            animate={{ x: faxxTransitioning ? "0%" : stripe % 2 === 0 ? "-110%" : "110%" }}
            transition={{ duration: 0.58, delay: stripe * 0.035, ease: "easeInOut" }}
          />
        ))}
        <motion.div
          className="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-white bg-[#fff8bf] font-['Pixelify_Sans'] text-sm font-bold uppercase tracking-[0.18em] text-[#24185d] shadow-[0_0_0_6px_#24185d,0_0_0_10px_#8f67ff,0_0_36px_rgba(255,255,255,0.85)]"
          initial={false}
          animate={{ scale: faxxTransitioning ? [0.7, 1.08, 1] : 0, rotate: faxxTransitioning ? [0, 2, 0] : 0 }}
          transition={{ duration: 0.62, ease: "easeInOut" }}
        >
          FAXX
        </motion.div>
      </div>

      <header className={`absolute inset-x-0 top-0 z-50 flex items-start justify-between px-4 py-4 transition-opacity duration-300 sm:px-8 sm:py-7 ${faxxEntered ? "pointer-events-none opacity-0" : "opacity-100"}`}>
        <div className="relative">
          <button
            type="button"
            aria-label={navOpen ? "Close pixel navigation menu" : "Open pixel navigation menu"}
            aria-expanded={navOpen}
            onClick={() => {
              setNavOpen((open) => !open);
              setProfileOpen(false);
            }}
            className="group relative grid size-16 place-items-center border-2 border-[#24185d] bg-[#eee8ff] p-2 shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#8b7ad8,5px_5px_0_#24185d,9px_9px_0_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#fffdf2] hover:shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#9d8ee4,7px_7px_0_#24185d,12px_12px_0_rgba(0,0,0,0.18)] active:translate-y-0"
          >
            <span className="absolute left-2 top-2 size-1.5 bg-white" />
            <span className="absolute bottom-2 right-2 size-1.5 bg-[#6d5cca]" />
            {navOpen ? (
              <X className="relative size-8 text-[#24185d]" strokeWidth={3.25} />
            ) : (
              <span className="relative flex w-9 flex-col gap-1.5" aria-hidden="true">
                <span className="h-1.5 w-9 bg-[#24185d] shadow-[2px_2px_0_#ffffff] transition-transform duration-200 group-hover:translate-x-1" />
                <span className="h-1.5 w-7 bg-[#24185d] shadow-[2px_2px_0_#ffffff] transition-transform duration-200 group-hover:translate-x-0.5" />
                <span className="h-1.5 w-9 bg-[#24185d] shadow-[2px_2px_0_#ffffff] transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            )}
          </button>

          <div className={`absolute left-0 top-[5.2rem] w-72 origin-top-left border-2 border-[#24185d] bg-[#eee8ff] p-2 text-[#24185d] shadow-[inset_2px_2px_0_#ffffff,inset_-4px_-4px_0_#8b7ad8,7px_7px_0_#24185d,14px_14px_0_rgba(0,0,0,0.18)] transition-all duration-200 ${navOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"}`}>
            <div className="mb-2 border-b-2 border-[#24185d] bg-[#6d5cca] px-4 py-3 font-['Archivo_Black'] text-xs uppercase tracking-[0.22em] text-white shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.18)]">
              System Menu
            </div>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace("™", "")}`}
                className="group/item mb-2 flex items-center justify-between border-2 border-[#24185d] bg-[#fffdf8] px-4 py-3 font-['Archivo_Black'] text-sm uppercase tracking-[0.14em] transition-all duration-150 last:mb-0 hover:translate-x-1 hover:bg-[#fff8bf]"
              >
                {item}
                <span className="size-3 bg-[#6d5cca] shadow-[2px_2px_0_#24185d] transition-colors group-hover/item:bg-[#ff88d2]" />
              </a>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col items-end">
          <button
            type="button"
            aria-label="Open pixel user profile menu"
            aria-expanded={profileOpen}
            onClick={() => {
              setProfileOpen((open) => !open);
              setNavOpen(false);
            }}
            className="group relative inline-flex items-center gap-3 border-2 border-[#24185d] bg-[#eee8ff] py-2 pl-2 pr-3 text-[#24185d] shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#8b7ad8,5px_5px_0_#24185d,9px_9px_0_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#fff8bf] hover:shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#9d8ee4,7px_7px_0_#24185d,12px_12px_0_rgba(0,0,0,0.18)] active:translate-y-0 sm:pr-5"
          >
            <span className="grid size-12 place-items-center border-2 border-[#24185d] bg-[#fffdf8] shadow-[inset_-3px_-3px_0_rgba(122,105,216,0.35)]">
              <img src={profileIcon} alt="" className="size-10 rounded-full object-cover mix-blend-multiply contrast-125" />
            </span>
            <span className="hidden flex-col items-start leading-none sm:flex">
              <span className="font-['Inter'] text-[0.62rem] font-black uppercase tracking-[0.28em] text-[#6d5cca]">Player</span>
              <span className="mt-1 font-['Archivo_Black'] text-xs uppercase tracking-[0.16em]">PRON33R</span>
            </span>
            <ChevronDown className={`hidden size-5 transition-transform duration-200 sm:block ${profileOpen ? "rotate-180" : ""}`} strokeWidth={3.5} />
          </button>

          <div className={`absolute right-0 top-[5.2rem] w-72 origin-top-right border-2 border-[#24185d] bg-[#eee8ff] p-2 text-[#24185d] shadow-[inset_2px_2px_0_#ffffff,inset_-4px_-4px_0_#8b7ad8,7px_7px_0_#24185d,14px_14px_0_rgba(0,0,0,0.18)] transition-all duration-200 ${profileOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"}`}>
            <div className="m-1 mb-3 flex items-center gap-3 border-2 border-[#24185d] bg-[#fffdf8] p-3 shadow-[inset_-4px_-4px_0_rgba(122,105,216,0.25)]">
              <img src={profileIcon} alt="PRON33R profile" className="size-14 rounded-full object-cover mix-blend-multiply contrast-125" />
              <div>
                <div className="font-['Inter'] text-[0.6rem] font-black uppercase tracking-[0.26em] text-[#6d5cca]">Logged in</div>
                <div className="font-['Archivo_Black'] text-xl uppercase tracking-[-0.04em]">PRON33R</div>
              </div>
            </div>
            {profileItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className="mb-2 block border-2 border-[#24185d] bg-[#fffdf8] px-4 py-3 font-['Inter'] text-sm font-black uppercase tracking-[0.12em] transition-all duration-150 last:mb-0 hover:-translate-x-1 hover:bg-[#fff8bf]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </header>

      <section className={`relative z-20 flex min-h-screen flex-col items-center justify-center px-5 pb-24 pt-8 text-center transition-opacity duration-300 sm:px-8 sm:pb-20 lg:pb-16 ${faxxEntered ? "pointer-events-none opacity-0" : "opacity-100"}`}>
        <div className="absolute inset-x-0 bottom-[1.8rem] z-20 mx-auto h-[min(78vh,50rem)] overflow-visible opacity-95 sm:bottom-[1.4rem] sm:h-[min(86vh,56rem)] lg:bottom-[0.8rem] lg:h-[min(91vh,60rem)]">
          <div className="relative mx-auto h-full w-fit">
            <motion.div
              className="pointer-events-none absolute left-1/2 top-[26%] z-30 ml-20 w-40 -translate-x-1/2 sm:w-52 lg:w-60"
              key={girlMessageIndex}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <img
                src={girlDialogueBox}
                alt=""
                className="w-full object-contain drop-shadow-[5px_5px_0_rgba(36,24,93,0.65)] [image-rendering:pixelated]"
              />
              <div className="absolute inset-x-[13%] bottom-[22%] top-[14%] flex flex-col items-center justify-center text-center font-['Pixelify_Sans'] text-[0.68rem] font-black leading-[1.05] tracking-[-0.03em] text-black sm:text-[0.9rem] lg:text-[1.05rem]">
                {(girlMessageIndex === -1
                  ? specialGirlMessages.pervert
                  : girlMessageIndex === -2
                    ? specialGirlMessages.stop
                    : formatDialogueLines(girlMotivationMessages[girlMessageIndex])
                ).map((line, idx) => (
                  <span key={`${line}-${idx}`} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.button
              type="button"
              aria-label="Touch anime character for pixel sound"
              data-no-block-effect="true"
              className="relative block h-full w-fit cursor-pointer bg-transparent p-0 focus:outline-none"
              whileHover={{ y: -8 }}
              whileTap={{ y: -18, rotate: -1.5, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 320, damping: 14 }}
              onClick={(e) => {
                playPixelTouchSound();
                refreshGirlMessage();
              }}
            >
              <img
                src={characterImage}
                alt="Anime character presenting the PRON33R Universe logo"
                className="h-full w-auto object-contain object-bottom drop-shadow-[8px_8px_0_rgba(23,16,63,0.58)] [image-rendering:auto]"
              />
              
              {/* Inappropriate touch zone aligned to visible torso */}
              <div
                role="button"
                aria-label="Inappropriate mascot touch reaction zone"
                data-no-block-effect="true"
                className="absolute left-[50.6%] top-[42%] z-10 mt-10 h-[14%] w-[18%] -translate-x-1/2 cursor-not-allowed"
                onPointerDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  playPixelTouchSound();
                  triggerPervertResponse();
                }}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              />
            </motion.button>
          </div>
        </div>

        <div className="relative z-30 -mt-14 flex flex-col items-center sm:-mt-10 lg:-mt-12">
          <div className="mb-2 border-2 border-[#24185d] bg-[#fffdf2] px-4 py-2 text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#24185d] shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#d8cf82,5px_5px_0_#24185d] sm:text-xs">
            <Sparkles className="mr-2 inline size-3.5 align-[-2px]" />
            Welcome to INVINCIBLE OS
          </div>

          <div className="relative isolate flex flex-col items-center" data-no-block-effect="true">
            <img
              src={pron33rUniverseLogo}
              alt="PRON33R universe"
              className="w-[min(96vw,62rem)] object-contain [image-rendering:auto]"
            />
            <motion.div
              className="absolute right-[4%] top-[8%] origin-center rotate-[14deg] select-none text-center font-['Heinrich','Pixelify_Sans'] text-xl font-black uppercase leading-[0.82] tracking-[0.035em] sm:right-[8%] sm:top-[10%] sm:text-3xl lg:text-4xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [14, 16, 14],
                color: ["#fff200", "#ffffff", "#ff5fd2", "#6dfff6", "#b7ff5a", "#fff200"],
              }}
              transition={{ duration: 2.35, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="absolute inset-0 translate-x-[5px] translate-y-[5px] text-[#24185d]" aria-hidden="true">
                {punchlineLines.map((line, index) => (
                  <span key={`shadow-${line}`} className="block">
                    {line}{index === 0 ? "_" : ""}
                  </span>
                ))}
              </span>
              <span className="absolute inset-0 translate-x-[2px] translate-y-[2px] text-[#ff7bd8] mix-blend-screen" aria-hidden="true">
                {punchlineLines.map((line, index) => (
                  <span key={`glow-${line}`} className="block">
                    {line}{index === 0 ? "_" : ""}
                  </span>
                ))}
              </span>
              <span className="relative block [text-shadow:2px_0_0_#24185d,-2px_0_0_#24185d,0_2px_0_#24185d,0_-2px_0_#24185d,4px_4px_0_rgba(36,24,93,0.74),0_0_12px_rgba(255,255,255,0.84)]">
                {punchlineLines.map((line, index) => (
                  <span key={line} className="block">
                    {line}{index === 0 ? "_" : ""}
                  </span>
                ))}
              </span>
            </motion.div>
          </div>

          <motion.p
            className="mt-5 max-w-2xl text-balance font-['Pixelify_Sans'] text-xl font-bold tracking-[0.08em] text-white drop-shadow-[3px_3px_0_#24185d] sm:text-3xl"
            animate={{ x: [0, -2, 2, -1, 1, 0], skewX: [0, -8, 7, -4, 3, 0] }}
            transition={{ duration: 0.36, repeat: Infinity, repeatDelay: 5.64, ease: "easeInOut" }}
          >
            <span className="font-['Dancing_Script'] text-3xl font-bold normal-case tracking-[0.01em] text-[#fff8bf] sm:text-4xl">“</span>
            <span className="inline-flex flex-col align-middle leading-tight">
              <span>Put text in</span>
              <span className="font-['Dancing_Script'] text-3xl font-bold normal-case tracking-[0.02em] text-[#fff8bf] sm:text-4xl">GitHub</span>
            </span>
            <span className="font-['Dancing_Script'] text-3xl font-bold normal-case tracking-[0.01em] text-[#fff8bf] sm:text-4xl">”</span>
          </motion.p>

          <button
            type="button"
            onClick={enterFaxxImperial}
            data-no-block-effect="true"
            className={`group mt-6 inline-flex items-center gap-3 border-2 border-[#24185d] px-7 py-4 font-['Inter'] text-sm font-black uppercase tracking-[0.16em] shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#c9c0ea,6px_6px_0_#24185d,12px_12px_0_rgba(0,0,0,0.18)] transition-all duration-200 active:translate-y-0 sm:px-9 ${faxxTransitioning ? "bg-[#6d5cca] text-white shadow-[inset_2px_2px_0_rgba(255,255,255,0.34),inset_-3px_-3px_0_rgba(36,24,93,0.5),6px_6px_0_#24185d,12px_12px_0_rgba(0,0,0,0.18)]" : "bg-[#fffdf8] text-[#24185d] hover:-translate-y-1 hover:bg-[#fff8bf]"}`}
          >
            <span className="font-['Heinrich','Pixelify_Sans'] tracking-[0.14em]">Get Started with</span>
            <span className="font-['Archivo_Black'] text-base font-black tracking-[0.06em] sm:text-lg">FAXX™</span>
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={3.2} />
          </button>
        </div>
      </section>

      <footer className={`absolute inset-x-0 bottom-0 z-40 px-3 pb-3 font-['Inter'] text-white transition-opacity duration-300 sm:px-8 sm:pb-5 ${faxxEntered ? "pointer-events-none opacity-0" : "opacity-100"}`}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 border-2 border-[#24185d] bg-[#eee8ff]/95 px-4 py-2 text-center shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#8b7ad8,5px_5px_0_rgba(36,24,93,0.75)] sm:gap-3">
          <div className="flex flex-col items-center gap-2 text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#24185d] sm:flex-row sm:gap-5">
            <a className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#5143a7]" href="mailto:pron33rbusiness@gmail.com">
              <Mail className="size-3.5" />
              pron33rbusiness@gmail.com
            </a>
            <span className="hidden h-2 w-2 bg-[#24185d] sm:block" />
            <a className="transition-colors duration-200 hover:text-[#5143a7]" href="#terms">
              Terms and Conditions
            </a>
            <span className="hidden text-[#24185d] sm:block">|</span>
            <a className="transition-colors duration-200 hover:text-[#5143a7]" href="#privacy">
              Privacy Policies
            </a>
          </div>
          <div className="font-['Archivo_Black'] text-[0.68rem] uppercase tracking-[0.38em] text-[#24185d] sm:text-sm">
            UNIVERSE MADE ON EARTH
          </div>
        </div>
      </footer>
    </main>
  );
}
