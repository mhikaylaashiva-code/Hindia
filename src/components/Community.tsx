import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, Heart, HelpCircle, Send, Radio } from 'lucide-react';

interface ForumPost {
  id: string;
  category: string;
  username: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
}

export default function Community() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Lagu Sedih' | 'Teori Album' | 'Momen Konser'>('All');
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [newContent, setNewContent] = useState('');
  const [postCategory, setPostCategory] = useState<'Lagu Sedih' | 'Teori Album' | 'Momen Konser'>('Lagu Sedih');

  const CATEGORIES = ['All', 'Lagu Sedih', 'Teori Album', 'Momen Konser'] as const;

  useEffect(() => {
    const saved = localStorage.getItem('hindia_feast_forum_posts');
    if (saved) {
      setForumPosts(JSON.parse(saved));
    } else {
      const defaultPosts: ForumPost[] = [
        {
          id: 'p1',
          category: 'Lagu Sedih',
          username: 'BaskaraFanatic99',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
          content: '"Membasuh" bagi saya adalah definisi cinta tanpa tuntutan paling suci. Setiap kali mendengar petikan gitar Rara Sekar di menit ke-2, dada saya selalu terasa disiram air dingin yang menenangkan.',
          time: '2 jam yang lalu',
          likes: 18
        },
        {
          id: 'p2',
          category: 'Teori Album',
          username: 'RakyatSipil_Feast',
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop',
          content: 'Siapa yang merasa album Membangun & Menghancurkan adalah refleksi pribadi Baskara tentang kelelahan politik? Lirik di lagu Tarian Penghancur terasa menyentil ego kita semua.',
          time: '5 jam yang lalu',
          likes: 29
        },
        {
          id: 'p3',
          category: 'Momen Konser',
          username: 'PejalanMalam_Cincin',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
          content: 'Kemarin di konser Surabaya, saat seisi stadion bernyanyi bait "Evaluasi" secara acapella gila-gilaan, saya benar-benar menangis sejadi-jadinya bersama orang di sebelah saya yang tidak saling kenal. Pengalaman magis luar biasa!',
          time: '1 hari yang lalu',
          likes: 54
        }
      ];
      setForumPosts(defaultPosts);
      localStorage.setItem('hindia_feast_forum_posts', JSON.stringify(defaultPosts));
    }
  }, []);

  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newContent.trim()) return;

    const newPost: ForumPost = {
      id: `p_${Date.now()}`,
      category: postCategory,
      username: newUsername.trim(),
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?q=80&w=150&auto=format&fit=crop`,
      content: newContent.trim(),
      time: 'Baru saja',
      likes: 0
    };

    const updated = [newPost, ...forumPosts];
    setForumPosts(updated);
    localStorage.setItem('hindia_feast_forum_posts', JSON.stringify(updated));

    setNewUsername('');
    setNewContent('');
  };

  const handleLikePost = (id: string) => {
    const updated = forumPosts.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    setForumPosts(updated);
    localStorage.setItem('hindia_feast_forum_posts', JSON.stringify(updated));
  };

  const filteredPosts = forumPosts.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  const fanArts = [
    {
      id: 'fa1',
      title: 'Menari Dengan Reruntuhan',
      artist: '@RakaVisual',
      src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400&auto=format&fit=crop',
      votes: 124
    },
    {
      id: 'fa2',
      title: 'Krisis Peradaban Poster',
      artist: '@IndieCreative',
      src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop',
      votes: 98
    },
    {
      id: 'fa3',
      title: 'Dualitas Jiwa Baskara',
      artist: '@ArtisMalam',
      src: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=400&auto=format&fit=crop',
      votes: 145
    }
  ];

  return (
    <section id="community" className="relative py-24 px-4 bg-gradient-to-b from-[#050505] to-[#010101] border-t border-neutral-900">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full blur-[140px] bg-red-950/10 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-red-600 flex items-center justify-center gap-1.5">
            <Radio className="w-4.5 h-4.5 text-red-500 animate-pulse" />
            FORUM DISKUSI & APRESIASI VISUAL
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-1.5">
            Semesta Komunitas Fans
          </h2>
          <p className="text-neutral-400 text-sm mt-3 max-w-xl mx-auto">
            Diskusikan lagu-lagu paling emosional, buat teori album berikutnya, dan dukung karya poster buatan sesama pejalan Hindia & .Feast.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Forum Column (Left) */}
          <div className="col-span-1 lg:col-span-8 space-y-6">
            
            {/* Forums Filters Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-950 pb-4">
              <h3 className="text-white text-base font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-red-500" />
                Ruang Diskusi Rakyat
              </h3>

              <div className="flex overflow-x-auto gap-2 p-1 bg-neutral-950 rounded-xl border border-neutral-900 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold tracking-wider transition-all duration-300 shrink-0 ${
                      activeCategory === cat
                        ? 'bg-neutral-900 text-white border border-neutral-850'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {cat === 'All' ? 'SEMUA TOPIK' : cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Forum post creator */}
            <form onSubmit={handleCreatePost} className="p-5 rounded-2xl glass border border-neutral-950 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Username Anda (Cth: PejalanMalam)"
                  className="px-4 py-2 rounded-xl text-xs bg-neutral-950 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-600 border border-neutral-900 text-neutral-200"
                />

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Topik:</span>
                  <select
                    value={postCategory}
                    onChange={(e: any) => setPostCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl text-xs bg-neutral-950 focus:outline-none border border-neutral-900 text-neutral-300"
                  >
                    <option value="Lagu Sedih">Lagu Sedih</option>
                    <option value="Teori Album">Teori Album</option>
                    <option value="Momen Konser">Momen Konser</option>
                  </select>
                </div>
              </div>

              <textarea
                required
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Bagikan opini, emosi, atau analisis mendalam Anda di sini..."
                className="w-full px-4 py-3 rounded-xl text-xs bg-neutral-950 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-600 border border-neutral-900 text-neutral-200 resize-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-950 hover:bg-white text-xs font-semibold flex items-center gap-2 transition-all duration-300 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim Diskusi
                </button>
              </div>
            </form>

            {/* Posts Grid scroll timeline */}
            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
              <AnimatePresence initial={false}>
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-5 rounded-2xl glass hover:bg-neutral-950/60 border border-neutral-900/60 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <img
                        src={post.avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border border-neutral-800 object-cover shrink-0"
                      />

                      {/* Content details */}
                      <div className="flex-grow min-w-0 space-y-1.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-white text-xs font-bold font-sans">{post.username}</span>
                          <span className="text-[10px] font-mono text-neutral-500">{post.time}</span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-red-950/40 border border-red-900/30 text-red-300">
                            #{post.category.toUpperCase()}
                          </span>
                        </div>

                        <p className="text-neutral-300 font-light text-xs sm:text-sm leading-relaxed select-text">
                          {post.content}
                        </p>

                        {/* Likes action */}
                        <div className="flex items-center gap-4 pt-2 border-t border-neutral-950 mt-2">
                          <button
                            onClick={() => handleLikePost(post.id)}
                            className="flex items-center gap-1.5 text-neutral-500 hover:text-red-500 transition-colors duration-305 text-xs font-mono"
                          >
                            <Heart className="w-3.5 h-3.5" />
                            {post.likes} Sepakat
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

          {/* Fan Art Column (Right) */}
          <div className="col-span-1 lg:col-span-4 space-y-6">
            <h3 className="text-white text-base font-semibold flex items-center gap-2 border-b border-neutral-950 pb-4">
              <Sparkles className="w-5 h-5 text-orange-400" />
              Apresiasi Fan Art Poster
            </h3>

            <div className="grid grid-cols-1 gap-5">
              {fanArts.map((art) => {
                return (
                  <div key={art.id} className="p-4 rounded-3xl glass border border-neutral-950 group overflow-hidden">
                    {/* Visual poster frame */}
                    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative select-none">
                      <img
                        src={art.src}
                        alt={art.title}
                        className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Ambient label bottom */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex justify-between items-end">
                        <div>
                          <p className="text-white text-xs font-bold truncate">{art.title}</p>
                          <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{art.artist}</p>
                        </div>
                        <span className="text-[9px] font-mono bg-orange-700/80 border border-orange-500/20 text-white px-2 py-0.5 rounded">
                          POPULER
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
