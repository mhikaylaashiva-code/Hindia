import { useRef, useEffect } from 'react';
import { Song } from '../types';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Disc, RefreshCw } from 'lucide-react';

interface AudioPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPauseToggle: () => void;
  currentTime: number;
  duration: number;
  onScrub: (time: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function AudioPlayer({
  currentSong,
  isPlaying,
  onPlayPauseToggle,
  currentTime,
  duration,
  onScrub,
  onNext,
  onPrev
}: AudioPlayerProps) {
  
  if (!currentSong) return null;

  const formatTime = (timeInSecs: number) => {
    if (isNaN(timeInSecs)) return '0:00';
    const minutes = Math.floor(timeInSecs / 60);
    const seconds = Math.floor(timeInSecs % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
      
      {/* Floating dock glass controller */}
      <div className="w-full max-w-4xl mx-auto glass rounded-2xl md:rounded-3xl p-4 md:px-6 md:py-4 pointer-events-auto shadow-2xl shadow-red-950/20 border border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
        
        {/* Underlay glow that syncs with current song theme color */}
        <div 
          style={{ backgroundColor: currentSong.themeColor }}
          className="absolute -left-10 bottom-0 w-44 h-24 rounded-full blur-2xl opacity-20 pointer-events-none transition-all duration-1000" 
        />

        {/* Left Column: Rotating Vinyl cover */}
        <div className="flex items-center gap-3.5 w-full md:w-auto self-start md:self-auto">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 group">
            {/* Vinyl record disc that sleeves out */}
            <div 
              className={`absolute top-0 left-0 w-full h-full rounded-full bg-neutral-950 border border-neutral-800 shadow-md ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              <div className="absolute inset-2 border border-dashed border-neutral-800 rounded-full" />
              <img
                src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop"
                alt="vinyl center sticker"
                className="absolute inset-[15px] rounded-full object-cover border border-neutral-900"
              />
            </div>
            {/* Standalone album jacket overlay */}
            <div className="absolute -top-0.5 -left-0.5 w-12 h-12 rounded-lg overflow-hidden border border-neutral-900/80 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop" 
                alt={currentSong.title}
                className="w-full h-full object-cover filter contrast-110 grayscale brightness-95"
              />
            </div>
          </div>

          <div className="min-w-0 pr-2">
            <h4 className="text-white text-xs sm:text-sm font-semibold truncate hover:text-red-400 transition-colors duration-300">
              {currentSong.title}
            </h4>
            <p className="text-[10px] text-neutral-400 font-mono mt-0.5 tracking-wider truncate uppercase">
              {currentSong.artist}
            </p>
          </div>

          {/* Micro Equalizer Bar animation (Plays only when music is active) */}
          <div className="flex items-end gap-0.5 h-3 ml-2 shrink-0">
            {[2, 4, 3, 1].map((h, i) => (
              <div
                key={i}
                style={{
                  height: isPlaying ? '100%' : '20%',
                  animationDelay: `${i * 0.15}s`,
                }}
                className={`w-[2.5px] rounded-t-sm bg-red-600 ${
                  isPlaying ? 'animate-[pulse_1s_infinite_alternate]' : 'transition-all duration-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Center Column: Interactive media buttons */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-auto flex-grow max-w-md">
          <div className="flex items-center gap-6">
            <button
              onClick={onPrev}
              className="p-1 px-2 rounded-lg text-neutral-500 hover:text-white transition-colors duration-300"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={onPlayPauseToggle}
              className="w-10 h-10 rounded-full bg-neutral-100 hover:scale-105 active:scale-95 text-neutral-950 flex items-center justify-center transition-all duration-300 shadow-md"
            >
              {isPlaying ? (
                <Pause className="w-4.5 h-4.5 text-neutral-950 fill-neutral-950" />
              ) : (
                <Play className="w-4.5 h-4.5 text-neutral-950 fill-neutral-950 ml-0.5" />
              )}
            </button>

            <button
              onClick={onNext}
              className="p-1 px-2 rounded-lg text-neutral-500 hover:text-white transition-colors duration-300"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline slider row */}
          <div className="w-full flex items-center gap-3 mt-1.5 px-2">
            <span className="text-[9px] font-mono text-neutral-500 w-8 text-right shrink-0">
              {formatTime(currentTime)}
            </span>

            {/* Custom slider click */}
            <div className="relative flex-grow h-1 rounded-full bg-neutral-900 group/timeline cursor-pointer">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => onScrub(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {/* Progress visual bar overlay */}
              <div 
                style={{ width: `${progressPercent}%` }}
                className="absolute top-0 left-0 h-full bg-red-700 group-hover/timeline:bg-red-500 rounded-full transition-all duration-75 relative"
              >
                {/* Pointer handle tip */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white scale-0 group-hover/timeline:scale-100 transition-all duration-300 shadow-md" />
              </div>
            </div>

            <span className="text-[9px] font-mono text-neutral-500 w-8 shrink-0">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right Column: Audio details or instructions */}
        <div className="hidden lg:flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-neutral-500" />
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Atmosphere output</span>
        </div>

      </div>
    </div>
  );
}
