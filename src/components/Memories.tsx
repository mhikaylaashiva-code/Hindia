import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_MEMORIES } from '../data/music';
import { Camera, X, Award, Sparkles, SlidersHorizontal, Eye } from 'lucide-react';

export default function Memories() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Hindia' | 'Feast'>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<typeof GALLERY_MEMORIES[number] | null>(null);

  const filteredPhotos = GALLERY_MEMORIES.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.artist === activeFilter;
  });

  return (
    <section id="memories" className="relative py-24 px-4 bg-gradient-to-b from-[#080808] to-[#050505] border-t border-neutral-900">
      {/* Background visual spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[160px] bg-red-950/5 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#ef4444]">GALERI MOMEN INDIE</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight mt-1">
              Galeri & Memori Abadi
            </h2>
            <p className="text-neutral-400 text-sm mt-3 max-w-lg leading-relaxed">
              Kumpulan sorot cahaya, keringat penonton, dan kilatan lampu panggung yang membobol malam dan melahirkan peradaban baru.
            </p>
          </div>

          {/* Quick filter tabs */}
          <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-900">
            {(['All', 'Hindia', 'Feast'] as const).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300 ${
                  activeFilter === tag
                    ? 'bg-neutral-900 text-white border border-neutral-800'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tag === 'All' ? 'SEMUA MOMEN' : tag.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Responsive Image Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((item) => (
            <motion.div
              layoutId={`gallery-item-${item.id}`}
              onClick={() => setSelectedPhoto(item)}
              key={item.id}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="break-inside-avoid glass rounded-2xl md:rounded-3xl p-3 border border-neutral-950 hover:border-red-900/40 relative group cursor-pointer overflow-hidden shadow-lg shadow-black/80"
            >
              {/* Image Frame */}
              <div className="w-full h-auto max-h-[420px] rounded-xl overflow-hidden relative select-none">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover rounded-xl filter grayscale contrast-110 hover:contrast-100 transition-all duration-500 group-hover:grayscale-0"
                />
                
                {/* Micro hover icon card trigger */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <div className="p-3 rounded-full bg-red-600/90 text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Artist stamp */}
                <span className="absolute top-4 left-4 text-[9px] font-mono uppercase bg-black/80 border border-neutral-850 text-neutral-300 px-2 py-1 rounded">
                  {item.artist}
                </span>
              </div>

              {/* Text content details */}
              <div className="mt-3.5 px-1.5 pb-1">
                <p className="text-white text-xs sm:text-sm font-medium leading-relaxed font-sans">{item.caption}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Camera className="w-3.5 h-3.5 text-neutral-600" />
                  <span className="text-[10px] font-mono text-neutral-500">Official Archivist</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cinematic Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedPhoto(null)} />
              
              <motion.div
                layoutId={`gallery-item-${selectedPhoto.id}`}
                className="w-full max-w-4xl glass rounded-[32px] border border-neutral-900 overflow-hidden relative z-10 shadow-2xl flex flex-col md:flex-row"
              >
                {/* Left side: Expanded photo */}
                <div className="flex-grow aspect-video md:aspect-auto md:w-3/5 bg-black select-none">
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.caption}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right side: Editorial commentary information */}
                <div className="p-8 md:w-2/5 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase bg-red-950/40 text-red-300 border border-red-900/30 px-2.5 py-1 rounded-md">
                        {selectedPhoto.artist} EXCLUSIVE
                      </span>
                      <button
                        onClick={() => setSelectedPhoto(null)}
                        className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors duration-200 bg-neutral-950 border border-neutral-850"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white leading-normal mt-4">
                      {selectedPhoto.caption}
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                      Potret autentik ini menangkap aura magis pertunjukan langsung Baskara Putra dalam merayakan dualitas lirik-lirik emosional sekrupnya ke masyarakat.
                    </p>
                  </div>

                  <div className="border-t border-neutral-900 pt-6 space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500 font-mono">Arsiparis</span>
                      <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-orange-400" />
                        Hindia & .Feast Fanbase
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="w-full py-3 rounded-xl bg-orange-700/10 hover:bg-orange-700/20 text-orange-400 border border-orange-900/50 hover:border-orange-500/55 text-xs font-mono tracking-widest transition-all duration-300"
                    >
                      KEMBALI KE GALERI
                    </button>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
