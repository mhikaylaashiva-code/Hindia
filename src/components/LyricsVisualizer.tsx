import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Song } from '../types';
import { Sparkles, Volume2, VolumeX, Eye, Flame, Moon, Compass, Play, RotateCcw } from 'lucide-react';

interface LyricsVisualizerProps {
  currentSong: Song | null;
  currentTime: number;
  onTimelineScrub: (time: number) => void;
  isLateNight: boolean;
}

export default function LyricsVisualizer({
  currentSong,
  currentTime,
  onTimelineScrub,
  isLateNight
}: LyricsVisualizerProps) {
  const [synthActive, setSynthActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Active Lyrics Line Finder
  const getActiveLineIndex = () => {
    if (!currentSong) return -1;
    const times = currentSong.lyricTimes;
    let activeIdx = 0;
    for (let i = 0; i < times.length; i++) {
      if (currentTime >= times[i]) {
        activeIdx = i;
      } else {
        break;
      }
    }
    return activeIdx;
  };

  const activeIdx = getActiveLineIndex();

  // Scroll active lyric to center
  useEffect(() => {
    const activeEl = containerRef.current?.querySelector(`[data-lyric-idx="${activeIdx}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIdx]);

  // Dynamic Web Audio API Synthesizer Pad Engine
  const startSynth = () => {
    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Root Frequency mapping based on selected song theme or artist
      let baseFreq = 110; // A2
      if (currentSong?.id === 'evaluasi') baseFreq = 130.81; // C3 healing node
      if (currentSong?.id === 'peradaban') baseFreq = 87.31; // F2 deep cinematic rebellion
      if (currentSong?.id === 'cincin') baseFreq = 146.83; // D3 romantic compromise
      if (currentSong?.id === 'secukupnya') baseFreq = 98.00; // G2 synthwave dark loop

      // Low pass filter for warm analogue lofi texture
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(320, ctx.currentTime);
      lowpass.Q.setValueAtTime(1.5, ctx.currentTime);
      filterRef.current = lowpass;

      // Master output volume control
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime); // ramp up
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 2);
      gainNodeRef.current = masterGain;

      // Clean old oscillators
      oscillatorsRef.current.forEach(o => {
        try { o.stop(); } catch(err){}
      });
      oscillatorsRef.current = [];

      // Create a warm multi-oscillator chord (Root, Fifth, Octave, and Major Thirds or Minor sevenths)
      const pitches = [1, 1.5, 2.0, 3.0, 1.25]; // Root, 5th, Octave, 12th, 3rd harmonics
      pitches.forEach((multiplier, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(baseFreq * multiplier, ctx.currentTime);
        
        // Slight detuning for beautiful analogue chorus effect
        osc.detune.setValueAtTime((Math.random() - 0.5) * 15, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.03, ctx.currentTime);

        // LFO volume swell for organic ocean-wave breathing effect
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + (Math.random() * 0.15), ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.015, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(lowpass);
        osc.start();

        oscillatorsRef.current.push(osc);
      });

      lowpass.connect(masterGain);
      masterGain.connect(ctx.destination);
      setSynthActive(true);
    } catch (e) {
      console.warn('Web Audio failure:', e);
    }
  };

  const stopSynth = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      const g = gainNodeRef.current;
      const ctx = audioContextRef.current;
      try {
        g.gain.setValueAtTime(g.gain.value, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        
        setTimeout(() => {
          oscillatorsRef.current.forEach(osc => {
            try { osc.stop(); } catch(e){}
          });
          oscillatorsRef.current = [];
          setSynthActive(false);
        }, 1300);
      } catch (err) {
        setSynthActive(false);
      }
    } else {
      setSynthActive(false);
    }
  };

  const toggleSynth = () => {
    if (synthActive) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  useEffect(() => {
    // If synth is active, update frequencies dynamically when song switches
    if (synthActive && currentSong) {
      stopSynth();
      setTimeout(() => {
        startSynth();
      }, 500);
    }
  }, [currentSong?.id]);

  useEffect(() => {
    // Graceful automatic cleanup
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch(e){}
      });
    };
  }, []);

  return (
    <section id="lyrics" className="relative py-24 px-4 bg-gradient-to-b from-[#040404] to-[#080808] border-t border-neutral-900 min-h-[90vh] flex flex-col justify-center">
      
      {/* 3D Atmospheric Liquid Glow Wall: Syncs colors to the active song theme! */}
      <div 
        style={{
          backgroundColor: currentSong?.themeColor || 'rgba(185, 28, 28, 0.08)',
          boxShadow: `0 0 150px 10px ${currentSong?.themeColor || 'rgba(185, 28, 28, 0.04)'}`
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full blur-[100px] sm:blur-[180px] pointer-events-none transition-all duration-1000 opacity-25 z-0" 
      />

      <div className="w-full max-w-4xl mx-auto z-10 flex flex-col items-center">
        
        {/* Module Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-red-500 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4.5 h-4.5 text-orange-500" />
            VISUALISASI LIRIK IMERSIF {isLateNight && '• LATE NIGHT ACTIVE'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight mt-2">
            Altar Renungan
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto">
            {currentSong 
              ? `Sedang Memutar: "${currentSong.title}" (${currentSong.artist}). Ketuk lirik apa pun untuk melompati waktu langsung.`
              : 'Pilih salah satu lagu di modul diskografi di atas untuk memulai ritual sinkronisasi kata.'}
          </p>
        </div>

        {/* Ambient Synthesizer Deck controls */}
        {currentSong && (
          <div className="mb-10 w-full max-w-md">
            <div className={`p-4 rounded-2xl border transition-all duration-500 flex items-center justify-between ${
              synthActive 
                ? 'bg-red-950/20 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                : 'glass border-neutral-900/60'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${synthActive ? 'bg-red-500/20' : 'bg-neutral-900'}`}>
                  {synthActive ? (
                    <Volume2 className="w-5 h-5 text-red-400 animate-pulse" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-neutral-500" />
                  )}
                </div>
                <div>
                  <h4 className="text-white text-xs font-semibold">SYNTHESIZER MEDITATIF</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Drone analog Web Audio harmoni C3/A2</p>
                </div>
              </div>

              <button
                onClick={toggleSynth}
                className={`px-4 py-2 rounded-xl text-[10px] font-mono tracking-widest transition-all duration-300 font-bold border ${
                  synthActive
                    ? 'bg-red-800 text-white border-red-500 scale-102 hover:bg-red-700'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                {synthActive ? 'SUARA: AKTIF' : 'SUARA: NYALAKAN'}
              </button>
            </div>
          </div>
        )}

        {/* Lyrics Scrolling Board */}
        {currentSong ? (
          <div 
            ref={containerRef}
            className="w-full max-w-2xl h-[450px] overflow-y-auto pr-4 select-none scrollbar-none flex flex-col gap-8 py-44 mask-image-blur-v"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)'
            }}
          >
            {currentSong.lyrics.map((line, idx) => {
              const isActive = idx === activeIdx;
              const isPast = idx < activeIdx;
              const isFuture = idx > activeIdx;

              return (
                <div
                  key={idx}
                  data-lyric-idx={idx}
                  onClick={() => onTimelineScrub(currentSong.lyricTimes[idx])}
                  className={`text-center transition-all duration-700 cursor-pointer py-1.5 rounded-xl px-4 flex flex-col items-center gap-1.5 group ${
                    isActive
                      ? 'scale-110 opacity-100 font-serif'
                      : isPast
                      ? 'scale-95 opacity-30 font-sans'
                      : 'scale-95 opacity-15 font-sans'
                  }`}
                >
                  <p 
                    className={`text-lg sm:text-2xl md:text-3xl font-bold tracking-tight transition-all duration-700 leading-snug ${
                      isActive
                        ? 'text-white text-glow'
                        : 'text-neutral-300 group-hover:text-neutral-100 group-hover:opacity-60'
                    }`}
                    style={isActive ? {
                      textShadow: isLateNight 
                        ? '0 0 25px rgba(245, 158, 11, 0.45)' 
                        : '0 0 20px rgba(239, 68, 68, 0.4)'
                    } : undefined}
                  >
                    {line}
                  </p>
                  
                  {/* Subtle Time Tag Indicator on Hover */}
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-[9px] font-mono mt-1 text-red-500 bg-red-950/40 border border-red-900/30 px-2 py-0.5 rounded-md">
                    Ketuk untuk melompat ke {Math.floor(currentSong.lyricTimes[idx] / 60)}:{(currentSong.lyricTimes[idx] % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full max-w-lg glass border-dashed border-neutral-900 rounded-[32px] p-12 text-center text-neutral-500">
            <Moon className="w-10 h-10 text-neutral-700 mx-auto mb-4 animate-bounce" />
            <h3 className="text-neutral-300 font-serif text-lg font-bold">Instruksi Sinkronisasi Lirik</h3>
            <p className="text-xs text-neutral-500 mt-2 max-w-xs mx-auto leading-relaxed">
              Silakan pilih salah satu lagu yang siap dimainkan pada daftar putar diskografi di atas untuk mengaktifkan modul Altar Renungan Lirik Imerisif.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
