import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Song } from './types';
import { ALBUMS } from './data/music';

// Import custom sub-modules
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Discography from './components/Discography';
import LyricsVisualizer from './components/LyricsVisualizer';
import MessageWall from './components/MessageWall';
import Events from './components/Events';
import Community from './components/Community';
import AudioPlayer from './components/AudioPlayer';

// Icons
import { Disc, Sparkles, Moon, Volume2, Info, Compass, Terminal, Shield } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState<Song | null>(ALBUMS[0].songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(192); // default estimation
  const [isLateNight, setIsLateNight] = useState(false);

  // Easter Eggs: Lyric Rain ("Sajak Rintik")
  const [konamiActive, setKonamiActive] = useState(false);
  const [rainDrops, setRainDrops] = useState<{ id: number; text: string; left: number; delay: number; duration: number }[]>([]);

  // HTML Audio Node Element Management
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Initial Fake Loader animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // 2. Audio object lifecycle hook
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (currentSong) {
      const audio = new Audio(currentSong.audioUrl);
      audioRef.current = audio;

      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });

      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });

      audio.addEventListener('ended', () => {
        handleNext();
      });

      if (isPlaying) {
        audio.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentSong]);

  // Handle play/pause commands safely
  const handlePlayPauseToggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  // Scrub timeline slider
  const handleScrub = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleNext = () => {
    if (!currentSong) return;
    
    // Find flattened track list
    const allSongs: Song[] = [];
    ALBUMS.forEach(a => {
      allSongs.push(...a.songs);
    });

    const activeIdx = allSongs.findIndex(s => s.id === currentSong.id);
    const nextIdx = (activeIdx + 1) % allSongs.length;
    setCurrentSong(allSongs[nextIdx]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!currentSong) return;

    const allSongs: Song[] = [];
    ALBUMS.forEach(a => {
      allSongs.push(...a.songs);
    });

    const activeIdx = allSongs.findIndex(s => s.id === currentSong.id);
    const prevIdx = (activeIdx - 1 + allSongs.length) % allSongs.length;
    setCurrentSong(allSongs[prevIdx]);
    setIsPlaying(true);
  };

  // 3. Konami Code Sequence listener for Easter egg "Lyric Rain"
  useEffect(() => {
    const sequence = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let keyInput: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      keyInput.push(e.key);
      keyInput = keyInput.slice(-sequence.length);

      if (keyInput.join(',').toLowerCase() === sequence.join(',').toLowerCase()) {
        triggerLyricRain();
        keyInput = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerLyricRain = () => {
    setKonamiActive(true);
    
    // Generate beautiful healing drops from Hindia / Feast lyrics
    const options = [
      'Esok akan kita cari',
      'Menangislah...',
      'Cinta kami kokoh!',
      'Bersedihlah secukupnya',
      'Semua ini akan berlalu',
      'Kita selesaikan ini bertiga',
      'Secukupnya...',
      'Peradaban!',
      'Rangkul lukamu',
      'Ikhlas menerima segala cuaca'
    ];

    const drops = Array.from({ length: 25 }).map((_, idx) => ({
      id: idx + Date.now(),
      text: options[Math.floor(Math.random() * options.length)],
      left: Math.random() * 92 + 4, // random bounds %
      delay: Math.random() * 5, // staggered starts
      duration: 6 + Math.random() * 5 // randomized falling velocities
    }));

    setRainDrops(drops);

    // Fade out lyric rain after 14 seconds to clean the UI
    setTimeout(() => {
      setKonamiActive(false);
      setRainDrops([]);
    }, 14000);
  };

  // Smooth scroll handler for anchor links
  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen relative selection:bg-red-900/40 select-none ${
      isLateNight ? 'bg-[#030202] text-amber-100' : 'bg-[#050505] text-neutral-200'
    }`}>
      {/* Animated noise backdrop for cinematic texture */}
      <div className="fixed inset-0 grain-overlay opacity-30 pointer-events-none z-30" />

      {/* Desktop magnetic custom cursor */}
      <CustomCursor />

      {/* EASTER EGG: Lyric Rain Renderer */}
      <AnimatePresence>
        {konamiActive && (
          <div className="fixed inset-0 z-45 overflow-hidden pointer-events-none bg-black/45 backdrop-blur-[1.5px]">
            {/* Soft code unlocked indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white/20 select-none">
              <Terminal className="w-16 h-16 mx-auto mb-2 opacity-30 animate-pulse" />
              <p className="text-xs font-mono tracking-widest uppercase">RAHASIA SINKRONISASI SAJAK DIAKTIFKAN</p>
            </div>

            {rainDrops.map((drop) => (
              <motion.div
                key={drop.id}
                initial={{ y: -100, opacity: 0 }}
                animate={{ 
                  y: '105vh',
                  opacity: [0, 0.7, 0.7, 0]
                }}
                transition={{
                  duration: drop.duration,
                  delay: drop.delay,
                  ease: 'linear',
                  repeat: Infinity
                }}
                style={{ left: `${drop.left}%` }}
                className="absolute text-glow font-serif text-sm sm:text-lg font-bold text-red-500/80 tracking-wide select-none"
              >
                {drop.text}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* CLIENT-SIDE LOADING TRANSITION SCREEN */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            className="fixed inset-0 bg-[#040404] z-50 flex flex-col justify-center items-center p-4 text-center"
          >
            <div className="max-w-md space-y-6">
              {/* Spinning record outline loader */}
              <div className="relative w-16 h-16 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border border-neutral-800 animate-pulse" />
                <div className="absolute inset-2 rounded-full border border-dashed border-red-700 animate-spin-slow" />
                <Disc className="absolute inset-[15px] w-8 h-8 text-neutral-300 animate-pulse" />
              </div>

              {/* High contrast artsy quotes */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-2.5"
              >
                <p className="text-white text-base sm:text-lg font-serif italic tracking-wide">
                  "Esok akan kita cari... semua yang kau cari esok hari..."
                </p>
                <p className="text-red-500 font-mono text-[10px] tracking-widest uppercase">
                  Mempersiapkan Semesta Hindia / .Feast
                </p>
              </motion.div>

              {/* Developer note */}
              <p className="text-neutral-600 text-[9px] font-mono mt-12 max-w-xs mx-auto">
                Press [↑ ↑ ↓ ↓ ← → ← → B A] at any time for therapeutic rain.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IMMERSIVE HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-35 bg-[#050505]/60 hover:bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.03] transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4.5 flex items-center justify-between">
          
          {/* Main Logo brand heading */}
          <a 
            href="#top" 
            onClick={(e) => handleAnchorClick(e, 'top')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform duration-300">
              <Disc className="w-4 h-4 animate-spin-slow text-red-400" />
            </div>
            <span className="text-white font-serif tracking-widest text-xs sm:text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
              HINDIA / .FEAST
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-[10px] tracking-widest text-neutral-400 uppercase font-medium">
            <a href="#story" onClick={(e) => handleAnchorClick(e, 'story')} className="hover:text-white transition-colors">Dualitas</a>
            <a href="#timeline" onClick={(e) => handleAnchorClick(e, 'timeline')} className="hover:text-white transition-colors">Kronologi</a>
            <a href="#discography" onClick={(e) => handleAnchorClick(e, 'discography')} className="hover:text-white transition-colors">Karya</a>
            <a href="#lyrics" onClick={(e) => handleAnchorClick(e, 'lyrics')} className="hover:text-white transition-colors">Altar Lirik</a>
            <a href="#wall" onClick={(e) => handleAnchorClick(e, 'wall')} className="hover:text-white transition-colors">Dinding Suara</a>
            <a href="#concerts" onClick={(e) => handleAnchorClick(e, 'concerts')} className="hover:text-white transition-colors">Ritual</a>
            <a href="#community" onClick={(e) => handleAnchorClick(e, 'community')} className="hover:text-white transition-colors">Komunitas</a>
          </nav>

          {/* Late-Night Mode Toggle Header button */}
          <button
            onClick={() => setIsLateNight(prev => !prev)}
            className={`p-2 rounded-xl transition-all duration-300 border ${
              isLateNight 
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]' 
                : 'glass border-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <Moon className="w-4.5 h-4.5" />
          </button>
        </div>
      </header>

      {/* CORE DISPLAY PAGES */}
      <main id="top" className="pt-2">
        {/* cinematic landing banners and tags */}
        <Hero 
          onExploreClick={() => {
            const el = document.getElementById('story');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onLateNightToggle={() => setIsLateNight(prev => !prev)}
          isLateNight={isLateNight}
        />

        {/* Dual dynamic Split layout stories and philosophies */}
        <About />

        {/* Vertical timeline scrolling milestone threads */}
        <Timeline />

        {/* Expanded discography and interactive song trigger card */}
        <Discography 
          onSongSelect={(song) => {
            setCurrentSong(song);
            setIsPlaying(true);
          }}
          currentSong={currentSong}
          isPlaying={isPlaying}
        />

        {/* Line-by-line synchronized visualizer lyrics arena */}
        <LyricsVisualizer 
          currentSong={currentSong}
          currentTime={currentTime}
          onTimelineScrub={handleScrub}
          isLateNight={isLateNight}
        />

        {/* Dynamic fan letters reflection and typewriter quotes citation generator */}
        <MessageWall />

        {/* Event calendars, countdown cards, and ticketing links */}
        <Events />

        {/* Interactive mini discussions forum and visual user posters boards */}
        <Community />
      </main>

      {/* CORE INTEGRATIVE FLOATING MEDIA PLAYER DOCK */}
      <AudioPlayer 
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPauseToggle={handlePlayPauseToggle}
        currentTime={currentTime}
        duration={duration}
        onScrub={handleScrub}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* SIMPLE INTIM METADATA FOOTER */}
      <footer className="bg-black py-12 px-4 border-t border-neutral-950 text-center text-neutral-600 font-mono text-[10px] pb-32">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="tracking-widest uppercase">
            HINDIA & .FEAST CO-CURATED UNIVERSE • PERSISTENCE SECURED VIA LOCALSTORAGE
          </p>
          <p className="font-sans text-[11px] text-neutral-500 max-w-md mx-auto leading-relaxed">
            Situs ini adalah bentuk apresiasi tidak resmi yang dikuratori secara bersahabat untuk menghargai warisan sajak Daniel Baskara Putra. Semua hak cipta materi musik adalah milik artis bersangkutan.
          </p>
          <p className="text-red-700/80">
            © 2026 PEJALAN ALUR HARI • ALL SYSTEMS OPERATIVE
          </p>
        </div>
      </footer>

    </div>
  );
}
