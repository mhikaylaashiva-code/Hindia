import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ARTISTS } from '../data/music';
import { Sparkles, HelpCircle, Heart, Flame, ShieldAlert } from 'lucide-react';

export default function About() {
  const [activeArtist, setActiveArtist] = useState<'Hindia' | 'Feast'>('Hindia');

  const artistInfo = ARTISTS[activeArtist];

  return (
    <section id="story" className="relative py-24 px-4 overflow-hidden border-t border-neutral-900 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
      {/* Background visual detail */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full blur-[120px] bg-red-950/20 pointer-events-none -translate-y-1/2" />
      
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-red-600">DUALITA MAESTRO INDONESIA</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-neutral-100 mt-2">
            Satu Jiwa, Dua Suara
          </h2>
          <p className="text-neutral-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Daniel Baskara Putra hidup dalam dualitas artistik. Ketika jiwanya membutuhkan introspeksi, lahirlah <span className="text-red-500 font-medium">Hindia</span>. Di kala amarah kolektif membakar dadanya, lahirlah <span className="text-orange-500 font-medium">.Feast</span>.
          </p>
        </div>

        {/* Artistic Tabs Switchboard */}
        <div className="flex justify-center p-1 rounded-2xl glass border-neutral-800/60 max-w-md mx-auto mb-12">
          <button
            onClick={() => setActiveArtist('Hindia')}
            className={`flex-1 py-3 text-center rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 ${
              activeArtist === 'Hindia'
                ? 'bg-red-950/50 text-red-100 border border-red-900/40 shadow-[0_4px_20px_rgba(239,68,68,0.1)]'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            HINDIA (Solo Introspeksi)
          </button>
          <button
            onClick={() => setActiveArtist('Feast')}
            className={`flex-1 py-3 text-center rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 ${
              activeArtist === 'Feast'
                ? 'bg-amber-950/40 text-amber-200 border border-amber-900/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            .FEAST (Rock Perlawanan)
          </button>
        </div>

        {/* Dynamic Showcase Panel with Smooth Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArtist}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
          >
            {/* Visual Column */}
            <div className="col-span-1 lg:col-span-5 relative">
              <div 
                className={`w-full aspect-square rounded-3xl overflow-hidden glass border-neutral-800 relative z-10 group shadow-2xl transition-all duration-500 hover:border-red-500/35`}
              >
                {/* Simulated Artist Painting/Avatar Portrait */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-red-950/10 pointer-events-none z-10`}
                />
                <img
                  src={
                    activeArtist === 'Hindia'
                      ? 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop' // Minimal aesthetic microphone/live
                      : 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop' // Energetic red rock lights / guitar
                  }
                  alt={artistInfo.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale contrast-115 group-hover:grayscale-0 brightness-75 group-hover:brightness-90"
                />
                
                {/* Floating overlay badge */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="px-4 py-3 rounded-xl glass border-white/[0.05] backdrop-blur-md flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Identitas</p>
                      <h4 className="text-white text-sm font-semibold">{artistInfo.realName}</h4>
                    </div>
                    {activeArtist === 'Hindia' ? (
                      <Heart className="w-5 h-5 text-red-500 fill-red-500/10 animate-pulse" />
                    ) : (
                      <Flame className="w-5 h-5 text-orange-500 animate-bounce" />
                    )}
                  </div>
                </div>
              </div>

              {/* Glowing Background Shadows */}
              <div className={`absolute inset-0 -m-4 filter blur-3xl rounded-full opacity-15 pointer-events-none -z-0 transition-colors duration-500 ${
                activeArtist === 'Hindia' ? 'bg-red-600' : 'bg-orange-600'
              }`} />
            </div>

            {/* Stories / Stories Column */}
            <div className="col-span-1 lg:col-span-7 flex flex-col justify-center gap-6">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-[1px] ${activeArtist === 'Hindia' ? 'bg-red-500' : 'bg-orange-500'}`} />
                <h3 className="text-2xl sm:text-3xl font-serif text-white">{artistInfo.name} Story</h3>
              </div>

              <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                {artistInfo.bio}
              </p>

              {/* Philosophies Board */}
              <div className="mt-4">
                <h4 className="text-white text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  Filosofi Karya & Karakter Musik
                </h4>
                <div className="flex flex-col gap-3">
                  {artistInfo.philosophies.map((ph, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-3 p-4 rounded-xl glass hover:bg-neutral-900/60 border-neutral-800/40 transition-colors duration-300"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-950/60 border border-red-900/50 text-[10px] font-mono text-red-400">
                        {idx + 1}
                      </span>
                      <p className="text-neutral-300 text-xs sm:text-sm leading-snug">
                        {ph}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Small quote snippet */}
              <div className="mt-2 text-center lg:text-left">
                <p className="text-neutral-500 font-serif italic text-xs sm:text-sm">
                  {activeArtist === 'Hindia' 
                    ? '"Ada kalanya dunia menolak memberi pelukan, maka evaluasi sejenak jiwamu."'
                    : '".Feast merangkum gejolak amarah kota yang bergetar di ujung tenggorokan rakyat."'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
