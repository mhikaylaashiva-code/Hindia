import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALBUMS } from '../data/music';
import { Song, Album } from '../types';
import { Play, Pause, Search, Music, Disc, Info, Heart, Sparkles, ExternalLink } from 'lucide-react';

interface DiscographyProps {
  onSongSelect: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
}

export default function Discography({ onSongSelect, currentSong, isPlaying }: DiscographyProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Hindia' | 'Feast'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAlbumId, setExpandedAlbumId] = useState<string | null>('menari-dengan-bayangan'); // default expanded

  const filteredAlbums = ALBUMS.filter((album) => {
    // Artist tab filter
    if (activeTab !== 'All' && album.artist !== activeTab) return false;
    
    // Search filter across album name or songs inside it
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const matchesAlbum = album.title.toLowerCase().includes(term);
    const matchesSong = album.songs.some(
      (song) => song.title.toLowerCase().includes(term) || song.lyrics.some(line => line.toLowerCase().includes(term))
    );
    return matchesAlbum || matchesSong;
  });

  return (
    <section id="discography" className="relative py-24 px-4 border-t border-neutral-900 bg-gradient-to-b from-[#0a0a0a] to-[#040404]">
      {/* Background ambient mesh */}
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full blur-[120px] bg-red-950/15 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#dc2626]">KATALOG LENGKAP</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-white mt-1">
              Karya & Diskografi
            </h2>
            <p className="text-neutral-400 text-sm max-w-md mt-3">
              Jelajahi album-album legendaris yang merubah arah musik indie populer tanah air.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search Box */}
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari lagu, album, atau lirik..."
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl text-neutral-200 text-xs bg-neutral-950 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-600 border border-neutral-900 transition-all duration-300"
              />
            </div>

            {/* Selector Grid */}
            <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-900">
              {(['All', 'Hindia', 'Feast'] as const).map((artistTab) => (
                <button
                  key={artistTab}
                  onClick={() => setActiveTab(artistTab)}
                  className={`px-4 py-2 rounded-lg text-[10px] md:text-xs font-semibold tracking-wider transition-all duration-300 ${
                    activeTab === artistTab
                      ? 'bg-neutral-850 text-white shadow-md'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {artistTab === 'All' ? 'SEMUA ARTIS' : artistTab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Catalog Main Frame */}
        {filteredAlbums.length === 0 ? (
          <div className="text-center p-16 glass rounded-3xl border-dashed border-neutral-800">
            <Music className="w-8 h-8 text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-400 text-sm">Tidak ditemukan lagu atau album yang cocok dengan pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Albums List Column (Grid of albums) */}
            <div className="col-span-1 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {filteredAlbums.map((album) => {
                const isExpanded = expandedAlbumId === album.id;
                return (
                  <motion.div
                    key={album.id}
                    layoutId={`album-card-${album.id}`}
                    onClick={() => setExpandedAlbumId(album.id)}
                    style={{ perspective: 1000 }}
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`glass cursor-pointer rounded-3xl p-5 border transition-all duration-300 relative group overflow-hidden ${
                      isExpanded 
                        ? 'border-red-900/40 bg-gradient-to-r from-red-950/20 to-neutral-950/40 ring-1 ring-red-500/20' 
                        : 'border-neutral-900 hover:border-neutral-850 hover:shadow-xl shadow-black/40'
                    }`}
                  >
                    <div className="flex gap-4 items-center">
                      {/* Album Cover Art with hover 3D zoom */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden relative shadow-lg group-hover:shadow-red-900/10 shrink-0 select-none">
                        <img
                          src={album.coverUrl}
                          alt={album.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                        />
                        {/* Vinyl record preview coming out of casing */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                          <Disc className="w-8 h-8 text-white/90 animate-spin-slow" />
                        </div>
                      </div>

                      {/* Info lines */}
                      <div className="flex-grow space-y-1">
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800">
                          {album.year} • {album.artist.toUpperCase()}
                        </span>
                        <h3 className="text-white font-serif font-bold text-base md:text-lg group-hover:text-red-400 transition-colors duration-300 leading-tight">
                          {album.title}
                        </h3>
                        <p className="text-neutral-500 text-[10px] md:text-xs leading-relaxed line-clamp-2">
                          {album.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Songs tracklist of EXPANDED ALBUM */}
            <div className="col-span-1 lg:col-span-7">
              <AnimatePresence mode="wait">
                {expandedAlbumId && (() => {
                  const activeAlbum = ALBUMS.find((a) => a.id === expandedAlbumId);
                  if (!activeAlbum) return null;
                  
                  return (
                    <motion.div
                      key={activeAlbum.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="glass rounded-[32px] p-6 md:p-8 border border-neutral-900 shadow-2xl relative overflow-hidden"
                    >
                      {/* Sub-atmospheric styling background behind tracklist */}
                      <div className="absolute top-0 right-0 w-44 h-44 rounded-full blur-[90px] bg-red-950/10 pointer-events-none" />

                      {/* Expanded Album Header Banner */}
                      <div className="border-b border-neutral-900 pb-6 mb-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <span className="text-[10px] tracking-wider font-mono text-red-500 uppercase font-bold">ALBUM PILIHAN</span>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mt-0.5">{activeAlbum.title}</h2>
                            <p className="text-neutral-400 text-xs mt-1 font-light italic leading-relaxed">
                              "{activeAlbum.description}"
                            </p>
                          </div>
                          
                          {/* Spotify Link */}
                          <a
                            href={activeAlbum.spotifyUrl || '#'}
                            target="_blank"
                            rel="referrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-mono tracking-widest border border-neutral-800 hover:border-emerald-500/50 hover:text-emerald-400 glass transition-all duration-300 shrink-0"
                          >
                            LISTEN FULL ALBUM
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Album list details */}
                      <div className="space-y-4">
                        <h4 className="text-neutral-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">DAFTAR TREK PILIHAN</h4>
                        {activeAlbum.songs.map((song, index) => {
                          const isActivePlaying = currentSong?.id === song.id;
                          return (
                            <div
                              key={song.id}
                              className={`group/song p-4 rounded-xl flex items-center justify-between transition-all duration-300 border ${
                                isActivePlaying
                                  ? 'bg-red-950/30 border-red-900/50 shadow-[0_4px_15px_rgba(239,68,68,0.1)] translate-x-2'
                                  : 'bg-neutral-950/40 border-neutral-900/40 hover:border-neutral-800/80 hover:bg-neutral-950 hover:translate-x-1'
                              }`}
                            >
                              {/* Left details: Index & Title */}
                              <div className="flex items-center gap-4 min-w-0 flex-grow">
                                <button
                                  onClick={() => onSongSelect(song)}
                                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border relative transition-all duration-300 ${
                                    isActivePlaying
                                      ? 'bg-red-800 border-red-500 rotate-12 scale-105'
                                      : 'bg-neutral-900/80 hover:bg-neutral-850 border-neutral-800'
                                  }`}
                                >
                                  {isActivePlaying && isPlaying ? (
                                    <Pause className="w-4 h-4 text-white fill-white" />
                                  ) : (
                                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                                  )}
                                </button>

                                <div className="min-w-0 pr-4">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-neutral-600">0{index + 1}.</span>
                                    <h4 className={`text-sm font-semibold truncate transition-colors duration-300 ${
                                      isActivePlaying ? 'text-red-400' : 'text-neutral-100 group-hover/song:text-red-400'
                                    }`}>
                                      {song.title}
                                    </h4>
                                  </div>
                                  <p className="text-[10px] text-neutral-500 truncate mt-1 leading-relaxed">
                                    {song.story}
                                  </p>
                                </div>
                              </div>

                              {/* Right details: Duration */}
                              <div className="flex items-center gap-4 shrink-0">
                                <span className="text-xs font-mono text-neutral-500">{song.duration}</span>
                                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                  isActivePlaying ? 'bg-red-500 scale-125 shadow-[0_0_8px_#ef4444]' : 'bg-transparent'
                                }`} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
