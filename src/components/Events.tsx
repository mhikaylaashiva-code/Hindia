import { useState, useEffect } from 'react';
import { CONCERTS } from '../data/music';
import { Calendar, MapPin, Clock, Ticket, Sparkles } from 'lucide-react';

export default function Events() {
  const [ticketStatus, setTicketStatus] = useState<Record<string, string>>({});
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer target date (Senayan Intimate Concert - 15 June 2026)
  useEffect(() => {
    const targetDate = new Date('June 15, 2026 19:00:00 WIB').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference < 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBuyTicket = (id: string, soldOut: boolean) => {
    if (soldOut) return;
    setTicketStatus(prev => ({ ...prev, [id]: 'MENGHUBUNGKAN...' }));
    
    setTimeout(() => {
      setTicketStatus(prev => ({ ...prev, [id]: 'TIKET DIAMANKAN!' }));
    }, 1800);
  };

  return (
    <section id="concerts" className="relative py-24 px-4 bg-black border-t border-neutral-900">
      {/* Background shadow glow */}
      <div className="absolute right-1/4 top-1/3 w-[300px] h-[300px] rounded-full blur-[140px] bg-red-950/10 pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto">
        
        {/* Module Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-[#f97316] flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
            PANGGUNG RITUAL SEBELUM KIAMAT
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-1.5">
            Agenda Ritual Konser
          </h2>
          <p className="text-neutral-400 text-sm mt-3 max-w-xl mx-auto">
            Jangan biarkan diri Anda menari sendirian di rumah. Kosongkan jadwal Anda, amankan tiket, bersiap membasuh luka bersama ribuan pejalan lainnya.
          </p>
        </div>

        {/* Featured Concert & COUNTDOWN Card */}
        <div className="glass-marmalade rounded-[32px] p-6 md:p-8 border border-red-950/40 mb-12 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="absolute top-0 right-0 w-44 h-44 rounded-full blur-[120px] bg-orange-600/10 pointer-events-none" />
          
          {/* Featured details */}
          <div className="col-span-1 lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 border border-red-900/40 text-[10px] font-bold font-mono uppercase tracking-widest rounded-full">
              KONSER UTAMA PILIHAN
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Blue Valley Intimate Concert
            </h3>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md font-light">
              Pertunjukan intim bertabur ornamen tata cahaya atmosferik, merayakan 7 tahun rilis mahakarya ".Feast" dan rintihan meditatif Hindia di jantung ibu kota Jakarta.
            </p>

            {/* Icons indicators */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#f97316]" />
                <span className="text-xs text-neutral-300">Basket Hall Senayan, Jakarta</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#dc2626]" />
                <span className="text-xs text-neutral-300">15 Juni 2026, 19:00 WIB</span>
              </div>
            </div>
          </div>

          {/* Countdown timer */}
          <div className="col-span-1 lg:col-span-5 p-6 rounded-2xl glass border-neutral-900 shadow-xl flex flex-col items-center justify-center text-center">
            <h4 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-4">WAKTU TERSISA RITUAL</h4>
            
            <div className="flex gap-4 sm:gap-6 justify-center">
              {[
                { label: 'HARI', val: countdown.days },
                { label: 'JAM', val: countdown.hours },
                { label: 'MENIT', val: countdown.minutes },
                { label: 'DETIK', val: countdown.seconds }
              ].map((c) => (
                <div key={c.label} className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-mono font-extrabold text-white leading-none">
                    {c.val.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-mono text-neutral-500 mt-2 tracking-widest">{c.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleBuyTicket('c1', false)}
              className="mt-6 w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest transition-all duration-300 bg-red-700 hover:bg-red-600 hover:text-white text-white border border-red-500/30 hover:scale-102"
            >
              {ticketStatus['c1'] || 'AMANKAN TIKET INDIVIDU'}
            </button>
          </div>

        </div>

        {/* Regular Concert list */}
        <div className="space-y-4">
          <h4 className="text-neutral-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">AGENDA KONSER MENDATANG</h4>
          {CONCERTS.filter(c => !c.featured).map((conc) => {
            const status = ticketStatus[conc.id];
            return (
              <div
                key={conc.id}
                className="glass p-5 rounded-2xl md:rounded-3xl border border-neutral-900 hover:border-neutral-850 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300"
              >
                {/* Visual date block */}
                <div className="flex md:flex-col items-center gap-2 shrink-0 md:w-28 border-r-0 md:border-r border-neutral-900 pr-0 md:pr-4">
                  <Calendar className="w-5 h-5 text-neutral-600 block md:hidden" />
                  <span className="text-sm font-bold font-mono text-white">{conc.date.split(',')[0]}</span>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">{conc.date.split(',')[1]}</span>
                </div>

                {/* Info Text */}
                <div className="flex-grow min-w-0 space-y-1.5 md:px-2">
                  <h4 className="text-white text-base font-semibold truncate font-sans">{conc.title}</h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <span className="text-xs text-neutral-400 font-light flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                      {conc.venue} ({conc.city})
                    </span>
                    <span className="text-xs text-neutral-400 font-light flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-600" />
                      {conc.time}
                    </span>
                  </div>
                </div>

                {/* CTA Action button */}
                <button
                  type="button"
                  disabled={conc.soldOut || status === 'TIKET DIAMANKAN!'}
                  onClick={() => handleBuyTicket(conc.id, conc.soldOut)}
                  className={`w-full md:w-auto px-6 py-3 rounded-xl font-mono text-[10px] font-bold tracking-widest border transition-all duration-300 flex items-center justify-center gap-2 ${
                    conc.soldOut
                      ? 'bg-neutral-950 text-neutral-600 border-neutral-900 cursor-not-allowed'
                      : status === 'TIKET DIAMANKAN!'
                      ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/60'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-850 hover:text-white hover:border-neutral-700 active:scale-95'
                  }`}
                >
                  <Ticket className="w-3.5 h-3.5" />
                  {conc.soldOut ? 'LUDES HABIS' : status || 'BELI TIKET'}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
