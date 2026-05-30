import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LYRIC_QUOTES } from '../data/music';
import { FanMessage } from '../types';
import { Heart, Send, Copy, RefreshCw, MessageSquare, Quote, Sparkles, Check } from 'lucide-react';

export default function MessageWall() {
  const [messages, setMessages] = useState<FanMessage[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [artistTarget, setArtistTarget] = useState<'Hindia' | 'Feast' | 'Both'>('Both');
  const [moodColor, setMoodColor] = useState('rgba(239, 68, 68, 0.1)'); // default red tint
  const [copiedTypewriter, setCopiedTypewriter] = useState(false);

  // Typewriter Quote State
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const activeQuote = LYRIC_QUOTES[activeQuoteIdx];

  // Load existing letters & load default letters if empty
  useEffect(() => {
    const saved = localStorage.getItem('hindia_feast_ fan_messages');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const defaultMessages: FanMessage[] = [
        {
          id: 'def1',
          name: 'Sarah Amalia',
          location: 'Bandung',
          message: 'Lagu "Evaluasi" menyelamatkan masa kuliah tingkat akhirku saat semua pintu terasa tertutup rapat. Baskara adalah malaikat pelindung lewat sajak-sajaknya.',
          date: '30 Mei 2026',
          artistTarget: 'Hindia',
          likes: 24,
          moodColor: 'rgba(239, 68, 68, 0.15)'
        },
        {
          id: 'def2',
          name: 'Rian Prasetya',
          location: 'Surabaya',
          message: 'Punggawa perusuh .Feast luar biasa membakar panggung! "Peradaban" adalah bensin yang menopang idealisme kami semasa demonstrasi. Salam hormat!',
          date: '28 Mei 2026',
          artistTarget: 'Feast',
          likes: 42,
          moodColor: 'rgba(249, 115, 22, 0.15)'
        }
      ];
      setMessages(defaultMessages);
      localStorage.setItem('hindia_feast_fan_messages', JSON.stringify(defaultMessages));
    }
  }, []);

  // Simple typewritter animator for Quotes
  useEffect(() => {
    let timer: any;
    setTypedText('');
    let i = 0;
    const fullText = activeQuote.text;
    
    const type = () => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
        timer = setTimeout(type, 40);
      }
    };
    
    type();
    return () => clearTimeout(timer);
  }, [activeQuoteIdx]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newMessage: FanMessage = {
      id: `m_${Date.now()}`,
      name: name.trim(),
      location: location.trim() || 'Semesta',
      message: message.trim(),
      date: 'Hari ini',
      artistTarget,
      likes: 0,
      moodColor
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('hindia_feast_fan_messages', JSON.stringify(updated));

    // Reset Form
    setName('');
    setLocation('');
    setMessage('');
    setArtistTarget('Both');
  };

  const handleLikeMessage = (id: string) => {
    const updated = messages.map((m) => {
      if (m.id === id) {
        return { ...m, likes: m.likes + 1 };
      }
      return m;
    });
    setMessages(updated);
    localStorage.setItem('hindia_feast_fan_messages', JSON.stringify(updated));
  };

  const handleRotateQuote = () => {
    setActiveQuoteIdx((prev) => (prev + 1) % LYRIC_QUOTES.length);
  };

  const handleCopyQuote = () => {
    const formatted = `${activeQuote.text}\n- ${activeQuote.song} (${activeQuote.artist})\nDeper Meaning: ${activeQuote.meaning}`;
    navigator.clipboard.writeText(formatted);
    setCopiedTypewriter(true);
    setTimeout(() => setCopiedTypewriter(false), 2000);
  };

  return (
    <section id="wall" className="relative py-24 px-4 bg-black border-t border-neutral-900 overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full blur-[140px] bg-red-950/10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full blur-[120px] bg-amber-950/10 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        {/* Module title header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-[#ef4444]">KOMUNITAS DAN REFLEKSI</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight mt-1">
            Dinding Suara & Kutipan Jiwa
          </h2>
          <p className="text-neutral-400 text-sm mt-3 max-w-2xl mx-auto">
            Goreskan catatan perjalanan Anda di dinding suara penggemar, atau resapi ketukan sajak Baskara Putra lewat kotak kutipan terapis telegraf.
          </p>
        </div>

        {/* Section Split: Quotes machine (Left) & Messages wall (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT: Cinematic Typewriter Lyric Box */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between p-8 rounded-[32px] glass-marmalade border border-red-950/50 shadow-2xl relative min-h-[420px]">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[100px] bg-amber-800/10 pointer-events-none" />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase font-semibold flex items-center gap-1.5">
                  <Quote className="w-4 h-4 text-amber-500" />
                  KUTIPAN TERAPIS ELEKTRIK
                </span>
                <span className="text-[10px] font-mono text-neutral-500">
                  {activeQuoteIdx + 1}/{LYRIC_QUOTES.length}
                </span>
              </div>

              {/* Typewriter text line area */}
              <div className="min-h-[140px] flex items-center">
                <p className="text-lg sm:text-2xl font-serif text-white italic leading-relaxed text-glow select-text">
                  {typedText}
                  <span className="inline-block w-1.5 h-6 bg-red-500 ml-1.5 animate-pulse" />
                </p>
              </div>

              {/* Translation Explanation */}
              <div className="border-t border-red-950/40 pt-4 space-y-1.5 select-text">
                <h4 className="text-[10px] font-mono uppercase text-red-400 tracking-wider">
                  MAKNA LIRIK • {activeQuote.song.toUpperCase()} ({activeQuote.artist})
                </h4>
                <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                  {activeQuote.meaning}
                </p>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="flex items-center gap-3 mt-8 pt-4 border-t border-red-950/20">
              <button
                onClick={handleRotateQuote}
                className="flex-1 py-3 px-4 rounded-xl text-neutral-400 hover:text-white glass border-neutral-900 transition-all duration-300 hover:border-red-900/40 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-neutral-500 group-hover:rotate-180 transition-transform duration-500" />
                Kocok Kutipan
              </button>

              <button
                onClick={handleCopyQuote}
                className="px-4 py-3 rounded-xl border transition-all duration-300 text-xs font-semibold flex items-center gap-2 bg-[#f5f5f7] text-neutral-950 hover:bg-white"
              >
                {copiedTypewriter ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    Tersalin
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Salin Sajak
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: Fan message wall list and submit */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
            
            {/* Submit Letter Box */}
            <form onSubmit={handleSendMessage} className="glass p-6 rounded-3xl border border-neutral-900/80 space-y-4">
              <h3 className="text-white text-sm font-semibold tracking-wide flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-red-500" />
                Goreskan Catatan Jiwa Anda
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Panggilan / Nama Samaran"
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-neutral-950 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-600 border border-neutral-900 text-neutral-200"
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Kota Domisili (cth: Jakarta, Bandung)"
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-neutral-950 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-600 border border-neutral-900 text-neutral-200"
                />
              </div>

              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bagikan kenangan, cerita penyembuhan, atau apresiasi keras kepala Anda tentang Hindia & .Feast..."
                className="w-full px-4 py-3 rounded-xl text-xs bg-neutral-950 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-600 border border-neutral-900 text-neutral-200 resize-none"
              />

              {/* Target & Mood color selects */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Target Artist */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Tujuan:</span>
                  <div className="flex bg-neutral-900 p-0.5 rounded-lg border border-neutral-850">
                    {(['Both', 'Hindia', 'Feast'] as const).map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setArtistTarget(t)}
                        className={`px-3 py-1.5 rounded-md text-[9px] font-mono font-bold transition-all duration-200 ${
                          artistTarget === t
                            ? 'bg-neutral-800 text-white'
                            : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                      >
                        {t === 'Both' ? 'Keduanya' : t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood Ambient Glow Select */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Warna Mood:</span>
                  <div className="flex gap-2">
                    {[
                      { val: 'rgba(239, 68, 68, 0.1)', color: 'bg-red-500' },
                      { val: 'rgba(249, 115, 22, 0.1)', color: 'bg-orange-500' },
                      { val: 'rgba(139, 92, 246, 0.1)', color: 'bg-indigo-500' },
                      { val: 'rgba(115, 115, 115, 0.1)', color: 'bg-neutral-500' }
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.val}
                        onClick={() => setMoodColor(m.val)}
                        className={`w-4 h-4 rounded-full ${m.color} transition-all duration-300 ${
                          moodColor === m.val
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-120'
                            : 'opacity-40 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-650 transition-all duration-300 text-xs font-semibold tracking-wider text-white flex items-center gap-2 self-stretch sm:self-auto justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim Pesan
                </button>
              </div>
            </form>

            {/* Message grid scroll feed */}
            <div className="max-h-[360px] overflow-y-auto pr-2 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ backgroundColor: msg.moodColor }}
                    className="p-5 rounded-2xl border border-white/[0.04] transition-all duration-300 hover:border-white/[0.08]"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-white text-xs font-bold font-sans">{msg.name}</h4>
                          <span className="text-[10px] text-neutral-500 font-mono">• {msg.location}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-900/80 border border-neutral-850/40 text-neutral-400">
                            untuk {msg.artistTarget.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-neutral-300 font-light text-xs sm:text-sm mt-2.5 leading-relaxed select-text">
                          "{msg.message}"
                        </p>
                      </div>

                      {/* Hard Heart Button */}
                      <button
                        onClick={() => handleLikeMessage(msg.id)}
                        className="group flex flex-col items-center gap-1 text-neutral-500 hover:text-red-500 transition-colors duration-300"
                      >
                        <Heart className="w-4 h-4 group-active:scale-130 transition-transform duration-300 fill-red-500/10 group-hover:fill-red-500/35" />
                        <span className="text-[10px] font-mono">{msg.likes}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
