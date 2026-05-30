import { useState } from 'react';
import { motion } from 'motion/react';
import { TIMELINE_EVENTS } from '../data/music';
import { Calendar, Award, Music, Compass, Star } from 'lucide-react';

export default function Timeline() {
  const [filter, setFilter] = useState<'Both' | 'Hindia' | 'Feast'>('Both');

  const filteredEvents = TIMELINE_EVENTS.filter(e => {
    if (filter === 'Both') return true;
    return e.artist === filter || e.artist === 'Both';
  });

  const getIcon = (category: string) => {
    switch (category) {
      case 'album':
        return <Music className="w-4 h-4 text-orange-400" />;
      case 'milestone':
        return <Award className="w-4 h-4 text-emerald-400" />;
      default:
        return <Calendar className="w-4 h-4 text-red-500" />;
    }
  };

  const getBadgeStyle = (artist: string) => {
    if (artist === 'Hindia') return 'bg-red-950/40 text-red-300 border-red-900/40';
    if (artist === 'Feast') return 'bg-amber-950/40 text-amber-300 border-amber-900/40';
    return 'bg-neutral-900 text-neutral-300 border-neutral-800';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="timeline" className="relative py-24 px-4 border-t border-neutral-900 bg-black">
      {/* Visual glowing overlay lines */}
      <div className="absolute right-1/4 top-1/4 w-[400px] h-[400px] rounded-full blur-[140px] bg-amber-950/10 pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#f97316]">KRONOLOGI SEMESTA</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-white mt-2">
              Garis Waktu Perjalanan
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl mt-3">
              Mulai dari panggung bawah tanah kampus hingga memimpin tribun stadion raksasa secara intim.
            </p>
          </div>

          {/* Micro Filter Selector */}
          <div className="flex bg-neutral-950 p-1.5 rounded-xl border border-neutral-900/80 self-start md:self-auto">
            {(['Both', 'Hindia', 'Feast'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider font-mono transition-all duration-300 ${
                  filter === opt
                    ? 'bg-neutral-900 text-white border border-neutral-800 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {opt === 'Both' ? 'SEMUA KARYA' : opt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Milestones Feed */}
        <div className="relative border-l-2 border-neutral-900/80 pl-6 sm:pl-10 ml-4 sm:ml-8 gap-10">
          
          {/* Pulsing Glowing Line Header Marker */}
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-600 animate-ping" />
          <div className="absolute -left-[7px] top-[2px] w-3 h-3 rounded-full bg-red-500" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12"
          >
            {filteredEvents.map((ev, idx) => (
              <motion.div
                key={ev.id}
                variants={cardVariants}
                className="relative group transition-all duration-300"
              >
                {/* Visual Connector Dot */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 transition-transform duration-300 group-hover:scale-130 w-8 h-8 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                  {getIcon(ev.category)}
                </div>

                {/* Main Glass Milestone Box */}
                <div className="glass hover:bg-neutral-950/65 group-hover:border-neutral-700/60 transition-all duration-500 rounded-3xl p-6 sm:p-8 border border-neutral-900 shadow-xl flex flex-col md:flex-row gap-6 relative overflow-hidden">
                  
                  {/* Absolute Corner Soft glow indicator */}
                  <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-5 pointer-events-none rounded-full transition-all duration-500 group-hover:opacity-15 ${
                    ev.artist === 'Hindia' ? 'bg-red-500' : 'bg-orange-500'
                  }`} />

                  {/* Left Column: Year Stamp */}
                  <div className="flex flex-row md:flex-col justify-between items-baseline md:justify-start gap-2 md:w-32 shrink-0">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#f5f5f7] to-[#52525b] leading-none">
                      {ev.year}
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-semibold font-mono uppercase border tracking-wider ${getBadgeStyle(ev.artist)}`}>
                      {ev.artist === 'Both' ? 'KOLABORASI' : ev.artist}
                    </span>
                  </div>

                  {/* Right Column: Descriptions */}
                  <div className="flex-grow space-y-3">
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white group-hover:text-red-400 transition-colors duration-300 flex items-center gap-2">
                      {ev.title}
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                      {ev.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
