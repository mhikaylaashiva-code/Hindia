import { Album, TimelineEvent, ConcertEvent, LyricQuote } from '../types';

export const ARTISTS = {
  Hindia: {
    name: 'Hindia',
    realName: 'Daniel Baskara Putra',
    bio: 'The solo project of Daniel Baskara Putra. Hindia explores the chaotic nature of growing up in modern Jakarta, addressing mental health, self-reflection, relationship cycles, and personal reconciliation in deeply lyrical indie-pop, folk, and electronic configurations.',
    philosophies: ['Self-acceptance in absolute chaos', 'Emotional vulnerability as primary strength', 'Sincere, everyday poetic conversations'],
    colors: {
      primary: '#b91c1c', // Maroon
      secondary: '#f97316', // Orange
      gradient: 'from-red-950 via-neutral-950 to-orange-950/20'
    }
  },
  Feast: {
    name: '.Feast',
    realName: '.Feast (Band)',
    bio: 'Formed in Jakarta in 2012, .Feast is a legendary multi-faceted rock band known for high-velocity social treatises, blistering alternative guitar riffs, and heavy tribal atmospheres that voice the fury, frustration, and solidarity of modern youth.',
    philosophies: ['Riotous energy mapping collective trauma', 'Gravelly narrative critiques of corrupt systems', 'Catharsis through heavy sonic percussion'],
    colors: {
      primary: '#7f1d1d', // Muted dark red
      secondary: '#171717', // Onyx charcoal
      gradient: 'from-amber-950 via-neutral-950 to-red-950/20'
    }
  }
};

export const ALBUMS: Album[] = [
  {
    id: 'menari-dengan-bayangan',
    title: 'Menari dengan Bayangan',
    year: 2019,
    artist: 'Hindia',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=600&auto=format&fit=crop', // Dark minimalist record
    description: 'Baskara Putra\'s seminal solo debut. A deeply introspective journal detailing modern loneliness, career anxieties, and finding safety in simple, repeated habits.',
    accentColor: 'from-red-900/50 to-neutral-900/50',
    songs: [
      {
        id: 'evaluasi',
        title: 'Evaluasi',
        albumId: 'menari-dengan-bayangan',
        artist: 'Hindia',
        duration: '03:12',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        themeColor: 'rgba(239, 68, 68, 0.15)', // Neon Red Light Glow
        story: 'Baskara\'s legendary healing anthem, written during a deep breakdown. It aims to remind listeners that "it is okay to rest, and we will find of what we seek tomorrow."',
        lyricTimes: [0, 8, 20, 32, 45, 59, 74, 90, 110, 130, 150, 172],
        lyrics: [
          '♩ (Intro - Atmospheric Synth) ♩',
          'Yang belum usai dengan dirimu',
          'Alur hidup yang tak indah kamu pimpin sendiri',
          'Semua yang kau sayangi satu per satu meninggalkanmu',
          'Dan kau mulai mempertanyakan eksistensi diri di bumi',
          'Masalah yang datang, tak kunjung menemui titik terang',
          'Perjalanan yang jauh, namun tak tahu ke mana jalan pulang',
          'Tapi ku berjanji padamu, semua ini akan berlalu...',
          'Basuh cuci mukamu, tenangkan sejenak jiwamu',
          'Esok akan kita cari... semua yang kau cari esok hari...',
          'Evaluasi kembali mimpi yang telah kau buang jauh',
          '♩ (Outro - Soft Electric Orbs) ♩'
        ]
      },
      {
        id: 'secukupnya',
        title: 'Secukupnya',
        albumId: 'menari-dengan-bayangan',
        artist: 'Hindia',
        duration: '03:27',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        themeColor: 'rgba(249, 115, 22, 0.15)', // Orange glow
        story: 'An upbeat synth-pop track hiding a bitter reality. It criticizes the toxic positivity that demands people to always conceal their heavy sadness.',
        lyricTimes: [0, 10, 22, 35, 48, 62, 75, 88, 105, 125, 145, 170],
        lyrics: [
          '♩ (Intro - Fast Synthwave Pulsing) ♩',
          'Kapan terakhir kali kamu tidur tenang?',
          'Atau semua mimpimu diganti dengan bayang ketakutan',
          'Mereka bilang hidup harus terus melangkah',
          'Tapi kaki ini terlalu berat untuk menyeret lelah',
          'Semua kesedihan ini dipaksakan tersapu hilang',
          'Dibalut senyum palsu untuk menyenangkan semua orang',
          'Bersedihlah secukupnya, menangislah jika harus',
          'Tak perlu berpura-pura menjadi yang paling tangguh',
          'Karena dunia tak selamanya adil bagi perjuanganmu',
          'Rangkul lukamu, jadikan saksi perjalanan ini',
          '♩ (Outro - Reverb Echo Fading) ♩'
        ]
      },
      {
        id: 'membasuh',
        title: 'Membasuh',
        albumId: 'menari-dengan-bayangan',
        artist: 'Hindia',
        duration: '04:15',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        themeColor: 'rgba(139, 92, 246, 0.12)', // Muted Purple
        story: 'A highly emotional, acoustic folk-duet with Rara Sekar about learning to love without demanding a single return.',
        lyricTimes: [0, 15, 30, 48, 65, 85, 105, 125, 150, 180, 210, 235],
        lyrics: [
          '♩ (Intro - Nostalgic Raw Acoustic Guitar) ♩',
          'Cukupkah apa yang ku beri selama ini?',
          'Saat dunia terus meminta lebih dari yang ku miliki',
          'Tangan yang terbuka kadang pulang dengan luka',
          'Namun ku belajar ikhlas menerima segala cuaca',
          'Bisakah ku membasuh lukamu yang tergores tajam?',
          'Tanpa mengharap pelukan hangat di ujung malam',
          'Menjadi sandaran di kala badaimu mendera hebat',
          'Menjadi tenang meskipun jalanan semakin sempit berkarat',
          'Saling membasuh rasa kecewa yang mengendam di dada',
          'Menyisakan kasih suci yang tak lekang oleh usia',
          'Kita hanyalah pejalan kaki yang sama-sama tersesat',
          '♩ (Outro - Soft Rain and Guitar Fading) ♩'
        ]
      }
    ]
  },
  {
    id: 'lagipula-hidup-akan-berakhir',
    title: 'Lagipula Hidup Akan Berakhir',
    year: 2023,
    artist: 'Hindia',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop', // Minimalist conceptual structure
    description: 'A monument of Baskara\'s career. A sprawling double-album addressing ecological dread, late-stage capitalism, marriage anxieties, and finding peace while waiting for the absolute end.',
    accentColor: 'from-orange-950/40 to-neutral-900/40',
    songs: [
      {
        id: 'cincin',
        title: 'Cincin',
        albumId: 'lagipula-hidup-akan-berakhir',
        artist: 'Hindia',
        duration: '03:40',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        themeColor: 'rgba(234, 179, 8, 0.15)', // Neon Yellow-Amber Glow
        story: 'A massive hit about long-term relationships, self-sabotage, and the complex daily negotiation called "love".',
        lyricTimes: [0, 11, 24, 38, 52, 68, 84, 102, 120, 140, 160, 185],
        lyrics: [
          '♩ (Intro - Uplifting Indie Drum Rimshots) ♩',
          'Kita semua tahu hubungan ini penuh kecatatan',
          'Tapi mengapa kita masih keras kepala menjaga harapan?',
          'Kau tahu buruknya aku, ku tahu rapuhnya hatimu',
          'Namun di akhir hari, ku kembali bersandar padamu',
          'Biar badai melahap semua keyakinan kita yang retak',
          'Kita perbaiki perlahan, meski napas kita sesak',
          'Jangan pergi dulu, kita selesaikan ini bertiga',
          'Kau, aku, dan ego kita yang sama-sama menggila',
          'Saling mengunci dengan cincin kompromi tiada akhir',
          'Melihat dunia runtuh bersama sambil terus mengukir',
          'Cerita konyol tentang akhir abad yang terus bergulir',
          '♩ (Outro - Warm Electric Piano outro) ♩'
        ]
      },
      {
        id: 'masalah-masa-depan',
        title: 'Masalah Masa Depan',
        albumId: 'lagipula-hidup-akan-berakhir',
        artist: 'Hindia',
        duration: '03:05',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        themeColor: 'rgba(16, 185, 129, 0.15)', // Emerald Green Glow
        story: 'A retro danceable beat highlighting the economic despair of the millennials and Gen-Z, facing hyperinflation and climate crisis.',
        lyricTimes: [0, 8, 18, 29, 40, 52, 65, 80, 95, 115, 135, 155],
        lyrics: [
          '♩ (Intro - Funky 80s Synthesized Bassline) ♩',
          'Gaji yang didapat mengalir layaknya air keran',
          'Tak sempat tertabung, habis tersapu sewa bulanan',
          'Mereka bilang beli rumah adalah sebuah kewajiban',
          'Tapi kami tahu itu mimpi yang mustahil dikabulkan',
          'Masalah masa depan terus menumpuk di depan mata',
          'Sedang bumi perlahan mendidih diterpa jelaga',
          'Mari menari berputar di atas krisis yang menyala!',
          'Tertawa lepas melihat semua statistik yang gila!',
          'Tak ada harta karun yang tersisa untuk masa tua',
          'Lagipula esok hari kita semua akan berakhir jua',
          'Maka nikmatilah kekacauan ini sebaik yang kau bisa',
          '♩ (Outro - Cosmic Retro Synthesizer Outro) ♩'
        ]
      }
    ]
  },
  {
    id: 'beberapa-orang-memaafkan',
    title: 'Beberapa Orang Memaafkan (EP)',
    year: 2018,
    artist: 'Feast',
    coverUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop', // Abstract dramatic texture
    description: 'A revolutionary mini-album addressing modern Indonesian socio-politics, religious trauma, and the complex challenge of forgiving structural atrocities.',
    accentColor: 'from-amber-950/40 to-neutral-900/40',
    songs: [
      {
        id: 'peradaban',
        title: 'Peradaban',
        albumId: 'beberapa-orang-memaafkan',
        artist: 'Feast',
        duration: '05:38',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        themeColor: 'rgba(220, 38, 38, 0.2)', // Volcanic Crimson Red glow
        story: 'The volcanic, rebellious anthem that became the voice of Indonesian student demonstrations, highlighting that governments fall and civilizations rot, but human bonds prevail.',
        lyricTimes: [0, 15, 35, 55, 75, 95, 115, 135, 160, 190, 220, 260],
        lyrics: [
          '♩ (Intro - Industrial Metal Stomp + Haunting Synth) ♩',
          'Bawa pesan ini ke angkasa raya yang kelam',
          'Bahwa peradaban kita sedang berdarah dan tenggelam',
          'Semua berhala lama roboh dibakar ketakutan masal',
          'Sementara penguasa sibuk merapikan singgasana sesal',
          'Bakar semua prasasti dan benteng yang kau banggakan',
          'Sebab bumi tak butuh upacara kepatuhan yang murahan',
          'Peradaban akan hancur dan lahir berulang kali!',
          'Namun cinta kami berdiri kokoh tak pernah mati!',
          'Kami membangun harapan dari puing peradaban purba',
          'Meneriakkan keadilan di depan moncong senapan durjana',
          '♩ (Heavy Guitar Solo - Riot Action) ♩',
          '♩ (Outro - Slow Funeral Bell Sounds) ♩'
        ]
      },
      {
        id: 'kami-belum-tentu',
        title: 'Kami Belum Tentu',
        albumId: 'beberapa-orang-memaafkan',
        artist: 'Feast',
        duration: '03:52',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        themeColor: 'rgba(244, 63, 94, 0.15)', // Neon Pink Glow
        story: 'A high-energy critique pointing out that the current generation of youth may criticize older authorities, but are equally prone to repeating the same corrupt cycles.',
        lyricTimes: [0, 12, 25, 38, 52, 68, 84, 100, 120, 140, 165],
        lyrics: [
          '♩ (Intro - Fast Garage Punk Drum Roll) ♩',
          'Kalian tunjuk hidung mereka yang korup bertingkah',
          'Seakan kalian suci tanpa setitik pun noda berserakah',
          'Namun berikan kami sedikit kekuasaan dan takhta',
          'Maka kami pun akan buta menutup mata dari fakta',
          'Kami hanyalah calon penjahat masa depan yang berselimut kata',
          'Bersiap mengkhianati idealisme demi segenggam harta',
          'Jangan percaya omong kosong kami tentang kebebasan!',
          'Sebelum kalian menguji kami di altar kekuasaan!',
          'Sebab manusia selalu gagal menjaga kejujuran yang murni',
          'Saat emas berkilau menggoda di sekeliling bumi',
          '♩ (Outro - Abrupt Punk Noise Cutoff) ♩'
        ]
      }
    ]
  },
  {
    id: 'membangun-dan-menghancurkan',
    title: 'Membangun & Menghancurkan',
    year: 2024,
    artist: 'Feast',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop', // Burning embers glow
    description: '.Feast\'s latest masterpiece, representing their darkest, most brutalist rock arrangements yet. It deconstructs Indonesian historical narratives and private failures.',
    accentColor: 'from-amber-900/50 to-neutral-900/50',
    songs: [
      {
        id: 'tarian-penghancur-raya',
        title: 'Tarian Penghancur Raya',
        albumId: 'membangun-dan-menghancurkan',
        artist: 'Feast',
        duration: '04:10',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        themeColor: 'rgba(249, 115, 22, 0.2)', // Neon Marigold/Amber glow
        story: 'A thunderous groove-rock performance that comments on humanity\'s tendency to build spectacular natural and social marvels just to burn them down in a single cultural frenzy.',
        lyricTimes: [0, 14, 28, 42, 56, 72, 88, 105, 125, 150, 175, 200],
        lyrics: [
          '♩ (Intro - Percussive Tribal Drums & Distorted Bass) ♩',
          'Tanah ini dipijak dengan nafsu seribu serigala',
          'Mengambil paksa apa yang diwariskan luluhur mulia',
          'Lalu kita sebut ini kemajuan peradaban modern',
          'Sembari membiarkan hutan-hutan indah hangus paten',
          'Mari kita menari bersama di lingkaran kehancuran!',
          'Merayakan keserakahan yang dibungkus dengan kesucian!',
          'Hancurkan... bangun kembali untuk kau hancurkan lagi!',
          'Begitulah lingkaran setan ketamakan manusia di bumi!',
          'Sampai tak tersisa setetes pun mata air bersih',
          'Hanya menyisakan air mata penyesalan yang pedih',
          '♩ (Explosive Heavy Drum Roll Transition) ♩',
          '♩ (Outro - Soft Acoustic Guitar Outro and Rain) ♩'
        ]
      }
    ]
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 't1',
    year: '2012',
    title: 'The Inception of .Feast',
    description: 'Formed at the University of Indonesia, Baskara Putra, Adnan Satyanugraha, Dicky Renanda, Fikriawan, and Bodat start Jamming, aiming to channel structural frustration into aggressive, narrative rock.',
    artist: 'Feast',
    category: 'milestone'
  },
  {
    id: 't2',
    year: '2017',
    title: 'Multiverses Debut',
    description: '.Feast launches their debut raw concept album "Multiverses", featuring "Sectumsempra" (which caught Indonesian indie scene\'s eyes immediately).',
    artist: 'Feast',
    category: 'album'
  },
  {
    id: 't3',
    year: '2018',
    title: 'The Great Rebellion: Peradaban',
    description: '.Feast launches "Beberapa Orang Memaafkan" EP. The lead track "Peradaban" becomes an overnight social phenomenon and is adopted as the unofficial anthem of youth protests and civil rights demonstrations nationwide.',
    artist: 'Feast',
    category: 'album'
  },
  {
    id: 't4',
    year: '2019',
    title: 'Baskara Steps Solo: Hindia Borns',
    description: 'Looking to write intimate diary-entries that didn\'t fit .Feast\'s explosive canvas, Baskara Putra debuts solo moniker "Hindia" and launches the masterpiece album "Menari dengan Bayangan".',
    artist: 'Hindia',
    category: 'album'
  },
  {
    id: 't5',
    year: '2020',
    title: 'Hindia Wins AMI Awards',
    description: 'Hindia wins the highly prestigious Best Solo Artist award at the Indonesian Music Awards (Anugerah Musik Indonesia) for his boundary-breaking work on "Menari Dengan Bayangan".',
    artist: 'Hindia',
    category: 'milestone'
  },
  {
    id: 't6',
    year: '2023',
    title: 'Lagipula Hidup Akan Berakhir Launch',
    description: 'Hindia releases a double studio album with 28 songs, tackling ecology, anxiety, financial realities, and personal development. He tours across major arenas in Indonesia and Southeast Asia.',
    artist: 'Hindia',
    category: 'album'
  },
  {
    id: 't7',
    year: '2024',
    title: 'Membangun & Menghancurkan Launch',
    description: '.Feast launches their highly-anticipated, critically acclaimed 3rd album "Membangun & Menghancurkan", showing their most mature, heavy, and raw production ever.',
    artist: 'Feast',
    category: 'album'
  }
];

export const CONCERTS: ConcertEvent[] = [
  {
    id: 'c1',
    title: 'Blue Valley Intimate Concert',
    venue: 'Basket Hall Senayan',
    city: 'Jakarta',
    date: 'Jun 15, 2026',
    time: '19:00 WIB',
    ticketLink: '#',
    soldOut: false,
    featured: true
  },
  {
    id: 'c2',
    title: '.Feast Membangun & Menghancurkan Tour',
    venue: 'Graha Cakrawala',
    city: 'Malang',
    date: 'Jul 04, 2026',
    time: '18:30 WIB',
    ticketLink: '#',
    soldOut: false
  },
  {
    id: 'c3',
    title: 'Lagipula Hidup Akan Berakhir Arena',
    venue: 'Jatim International Expo',
    city: 'Surabaya',
    date: 'Jul 18, 2026',
    time: '19:00 WIB',
    ticketLink: '#',
    soldOut: true
  },
  {
    id: 'c4',
    title: 'The Great Echo Indie Festival',
    venue: 'Kridosono Stadium',
    city: 'Yogyakarta',
    date: 'Aug 10, 2026',
    time: '17:00 WIB',
    ticketLink: '#',
    soldOut: false
  }
];

export const LYRIC_QUOTES: LyricQuote[] = [
  {
    text: '“Menangislah kan kau juga manusia, bersedihlah secukupnya.”',
    song: 'Secukupnya',
    artist: 'Hindia',
    meaning: 'A reminder that feeling overwhelmed is natural, and crying is a human necessity, rather than a sign of defeat. Feel but do not drown.'
  },
  {
    text: '“Esok akan kita cari... semua yang kau cari esok hari...”',
    song: 'Evaluasi',
    artist: 'Hindia',
    meaning: 'An assurance of dynamic resolution. What is broken and lost tonight does not mean your journey is over; sleep, and we will try again tomorrow.'
  },
  {
    text: '“Peradaban akan runtuh dan lahir kembali... namun cinta kami berdiri kokoh tak pernah mati”',
    song: 'Peradaban',
    artist: 'Feast',
    meaning: 'Even during political revolutions, systemic collapses, and societal shifts, structural hatred can never dissolve the organic love and solidarity built by people.'
  },
  {
    text: '“Lagipula hidup akan berakhir, maka nikmatilah kekacauan ini seadanya.”',
    song: 'Masalah Masa Depan',
    artist: 'Hindia',
    meaning: 'An invitation to active cynicism—since time will inevitably swallow all anxieties, laugh at the statistical chaos and live as truthfully as possible right now.'
  },
  {
    text: '“Kau belajar membasuh lukaku tajam... tanpa mengharap pelukan hangat di malam kelam.”',
    song: 'Membasuh',
    artist: 'Hindia',
    meaning: 'The definition of unconditional human connection. Giving support and empathy to a suffering soul without requiring reciprocal returns or validations.'
  }
];

export const GALLERY_MEMORIES = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=700&auto=format&fit=crop',
    caption: 'Multiverses Album Concert Launch, 2017',
    artist: 'Feast'
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=700&auto=format&fit=crop',
    caption: 'Baskara Putra Singing evaluator arena, AMI Awards, 2020',
    artist: 'Hindia'
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=700&auto=format&fit=crop',
    caption: 'The rebellion crowd of .Feast Peradaban, Yogyakarta Tour, 2018',
    artist: 'Feast'
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=700&auto=format&fit=crop',
    caption: 'Intimate setting backdrop lights, Lagipula Hidup Akan Berakhir, 2023',
    artist: 'Hindia'
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=700&auto=format&fit=crop',
    caption: '.Feast Live in Surabaya Stadium, Membangun & Menghancurkan, 2024',
    artist: 'Feast'
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=700&auto=format&fit=crop',
    caption: 'Sunset acoustics singing "Membasuh" in Bali beach showcase, 2022',
    artist: 'Hindia'
  }
];
