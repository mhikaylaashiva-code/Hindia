import { motion } from 'motion/react';
import { Sparkles, Compass, HelpCircle, Flame } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onLateNightToggle: () => void;
  isLateNight: boolean;
}

export default function Hero({ onExploreClick, onLateNightToggle, isLateNight }: HeroProps) {
  const lyricsMarquee = [
    'ESOK AKAN KITA CARI SEMUA YANG KAU CARI ESOK HARI',
    'BERSEDIHLAH SECUKUPNYA MENANGISLAH JIKA HARUS',
    'PERADABAN AKAN RUNTUH DAN LAHIR KEMBALI NAMUN CINTA KAMI KOKOH',
    'LAGIPULA HIDUP AKAN BERAKHIR MAKA NIKMATILAH KEKACAUAN INI',
    'SALING MEMBASUH RASA KECEWA YANG MENGENDAP DI DADA',
    'SALING MENGUNCI DENGAN CINCIN KOMPROMI TIADA AKHIR'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 20, stiffness: 80 }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center text-center overflow-hidden px-4 pt-24 md:pt-32">
      {/* Cinematic Ambient Backdrop Layers */}
      <div className="absolute inset-0 z-0 bg-[#040404]">
        {/* Soft glowing organic orbs: moving around the screen */}
        <div 
          className={`absolute top-1/4 left-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full blur-[100px] md:blur-[160px] mix-blend-screen opacity-35 transition-all duration-1000 ${
            isLateNight 
              ? 'bg-amber-600/30' 
              : 'bg-red-950/40'
          } animate-pulse-slow`}
          style={{ animationDuration: '10s' }}
        />
        <div 
          className={`absolute bottom-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[90px] md:blur-[140px] mix-blend-screen opacity-25 transition-all duration-1000 ${
            isLateNight 
              ? 'bg-amber-800/15' 
              : 'bg-orange-900/25'
          } animate-pulse-slow`}
          style={{ animationDuration: '14s', animationDelay: '2s' }}
        />

        {/* Cinematic horizontal scanline or noise overlay */}
        <div className="absolute inset-0 grain-overlay opacity-35 pointer-events-none z-10" />
        
        {/* Subtle radial center vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_95%)] pointer-events-none" />
      </div>

      <div className="w-full max-w-5xl mx-auto z-10 flex-grow flex flex-col justify-center items-center py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Subtle upper badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-white/[0.04] text-[10px] md:text-xs tracking-widest text-[#f5f5f7]/60 font-mono uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            INDONESIA INDIE ROCK / POP LEGENDS
          </motion.div>

          {/* Majestic Cinematic Display Title */}
          <motion.div variants={itemVariants} className="relative mt-2">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e5e5e7] to-[#a3a3a3] leading-none">
              HINDIA <span className="font-sans text-red-700 italic">/</span> .FEAST
            </h1>
            <div className="absolute -inset-x-20 -inset-y-10 bg-white/5 blur-3xl opacity-10 pointer-events-none -z-10" />
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-base sm:text-xl md:text-2xl font-sans tracking-wide max-w-2xl text-neutral-400 font-light"
          >
            "Menari di atas reruntuhan krisis, membasuh luka secukupnya." An immersive showcase of the sound, rebellion, and philosophy of Daniel Baskara Putra.
          </motion.h2>

          {/* Action buttons with soft glow hover */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto items-center"
          >
            <button
              onClick={onExploreClick}
              className="group relative w-full sm:w-auto px-8 py-4 rounded-xl font-medium tracking-wide text-sm bg-stone-100 text-neutral-950 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-white/5 border border-white/10 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Compass className="w-4 h-4 text-neutral-950 transition-transform group-hover:rotate-45" />
                Masuki Semesta Seni
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-amber-200 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-0" />
            </button>

            <button
              onClick={onLateNightToggle}
              className={`w-full sm:w-auto px-6 py-4 rounded-xl font-mono text-xs tracking-wider border transition-all duration-500 flex items-center justify-center gap-2 ${
                isLateNight 
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                  : 'glass border-neutral-800 text-neutral-300 hover:border-red-800/40 hover:text-red-400'
              }`}
            >
              <Flame className={`w-4 h-4 ${isLateNight ? 'animate-bounce text-amber-400' : 'text-neutral-500'}`} />
              LATE NIGHT LISTENING: {isLateNight ? 'ON' : 'OFF'}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Rotating Record Ornament */}
      <div className="absolute right-[-100px] bottom-[15%] opacity-15 hover:opacity-30 transition-opacity duration-500 hidden xl:block w-[300px] h-[300px]">
        <div className="w-full h-full rounded-full border border-neutral-700 p-8 animate-spin-slow">
          <div className="w-full h-full rounded-full border border-dashed border-neutral-600 p-8">
            <div className="w-full h-full rounded-full border border-neutral-500 flex items-center justify-center text-[10px] font-mono tracking-widest text-neutral-300">
              EVALUASI // PERADABAN
            </div>
          </div>
        </div>
      </div>

      {/* Ticker / Running Marquee Bar */}
      <div className="w-full bg-black/60 backdrop-blur-md border-y border-neutral-900 py-3 relative z-25 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Double content for seamless looping */}
          {[...lyricsMarquee, ...lyricsMarquee].map((text, idx) => (
            <span
              key={idx}
              className="inline-flex items-center text-[10px] md:text-xs font-mono tracking-[0.25em] text-neutral-400/80 mx-8 uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 mr-4 text-red-800 animate-pulse" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
