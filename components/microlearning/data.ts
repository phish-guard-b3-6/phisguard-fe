export type ItemType = "material" | "quiz";
export type ItemStatus = "done" | "pending" | "locked";

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface ModuleItem {
  id: string;
  title: string;
  type: ItemType;
  status: ItemStatus;
  content?: {
    heading: string;
    text: string;
  };
  quizContent?: {
    questions: QuizQuestion[];
  };
}

export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number; // 0 - 100
  items: ModuleItem[];
}

export const modules: Module[] = [
  {
    id: "mod-1",
    title: "Pengenalan Phishing",
    description: "Penipuan pencurian data melalui pesan WhatsApp, Email, dan SMS.",
    progress: 0,
    items: [
      {
        id: "m1-1",
        title: "Ancaman dan Saluran Penipuan",
        type: "material",
        status: "done",
        content: {
          heading: "Definisi dan Saluran Ancaman Phishing",
          text: "Phishing adalah upaya penipuan di mana pelaku menyamar sebagai pihak resmi (seperti bank) untuk memanipulasi Anda agar menyerahkan data pribadi, password, atau PIN. Serangan ini tidak hanya datang dari satu pintu. Penipu bisa melancarkan aksinya melalui berbagai saluran, seperti pesan WhatsApp (contoh: ancaman pemblokiran akun), Email (berkedok tagihan atau perubahan kebijakan), hingga SMS (berisi tautan pendek undian palsu). Kunci utamanya: bank resmi tidak pernah meminta data rahasia Anda melalui tautan di pesan-pesan tersebut.",
        },
      },
      {
        id: "m1-3",
        title: "Evaluasi Pemahaman Tujuan dan Ciri Pesan Phishing",
        type: "quiz",
        status: "locked",
        quizContent: {
          questions: [
            {
              id: "q1",
              text: "Apa tujuan utama dari serangan phishing?",
              options: [
                "Menawarkan promo diskon belanja bulanan.",
                "Mencuri data pribadi, password, dan PIN nasabah.",
                "Mengingatkan nasabah untuk membayar tagihan.",
              ],
              correctAnswer: 1,
            },
            {
              id: "q2",
              text: "Melalui saluran komunikasi apa saja penipu biasanya mengirimkan jebakan phishing?",
              options: ["Hanya melalui Email saja.", "Hanya melalui telepon langsung.", "Berbagai saluran seperti WhatsApp, SMS, dan Email."],
              correctAnswer: 2,
            },
            {
              id: "q3",
              text: "Apa ciri khas pesan phishing yang sering digunakan penipu untuk memancing korban?",
              options: [
                "Pesan yang menciptakan rasa panik, mendesak, atau menakut-nakuti.",
                "Pesan yang berisi informasi nilai tukar mata uang.",
                "Pesan yang menggunakan tata bahasa yang sangat sopan dan lambat.",
              ],
              correctAnswer: 0,
            },
          ],
        },
      },
    ],
  },
  {
    id: "mod-2",
    title: "Modus Phishing Terkini",
    description: "Waspada modus file APK palsu dan manipulasi alamat website.",
    progress: 0,
    items: [
      {
        id: "m2-1",
        title: "Bahaya APK dan Typosquatting",
        type: "material",
        status: "done",
        content: {
          heading: "Tren Kejahatan: File APK dan Link Palsu",
          text: "Saat ini, modus phishing semakin canggih. Dua tren utama yang paling sering memakan korban adalah pengiriman File APK palsu dan Link Domain atau URL palsu. Modus APK biasanya dikirim via WhatsApp dengan menyamar sebagai Undangan Pernikahan digital, Resi Paket kurir, atau Surat Tilang. Jika diunduh, aplikasi jahat ini diam-diam mencuri SMS OTP Anda. Sementara itu, modus Link Palsu menggunakan alamat website yang ejaannya sengaja dibuat sangat mirip dengan aslinya yang dikenal dengan Typosquatting untuk mengelabui Anda.",
        },
      },
      {
        id: "m2-3",
        title: "Uji Pengetahuan Ancaman Malware dan Typosquatting",
        type: "quiz",
        status: "locked",
        quizContent: {
          questions: [
            {
              id: "q1",
              text: 'Apa bahaya utama jika Anda mengunduh file berakhiran ".APK" dari pesan WhatsApp orang tidak dikenal?',
              options: [
                "Memori HP akan menjadi penuh oleh foto.",
                "File tersebut bisa berisi malware yang mencuri SMS OTP untuk membobol rekening.",
                "Mengubah tampilan layar HP menjadi gelap.",
              ],
              correctAnswer: 1,
            },
            {
              id: "q2",
              text: "Penipu sering menyamarkan file APK berbahaya sebagai dokumen berikut, kecuali:",
              options: ["Undangan pernikahan digital.", "Bukti resi pengiriman paket kurir.", "Stiker WhatsApp animasi."],
              correctAnswer: 2,
            },
            {
              id: "q3",
              text: "Apa itu Typosquatting dalam tren phishing terkini?",
              options: [
                "Trik membuat alamat website palsu yang ejaannya sangat mirip dengan aslinya.",
                "Teknik menebak password pengguna secara acak.",
                "Mengirimkan banyak pesan secara bersamaan ke satu nomor.",
              ],
              correctAnswer: 0,
            },
          ],
        },
      },
    ],
  },
  {
    id: "mod-3",
    title: "Cara Mencegah Phishing",
    description: "Teliti format dokumen asli dan selalu cek alamat URL.",
    progress: 0,
    items: [
      {
        id: "m3-1",
        title: "Deteksi File dan Tautan",
        type: "material",
        status: "pending",
        content: {
          heading: "Panduan Mengenali Dokumen dan Website Aman",
          text: "Anda bisa mencegah phishing dengan bersikap teliti. Untuk membedakan file aman dan berbahaya: ingat bahwa dokumen asli (seperti foto resi atau undangan) biasanya berformat gambar (.JPG) atau dokumen (.PDF), bukan aplikasi (.APK). Untuk mengenali tautan aman: selalu cek kolom alamat URL di bagian paling atas browser Anda. Website resmi CIMB Niaga adalah cimbniaga.co.id. Waspadai domain palsu seperti cimb-niaga-verifikasi.xyz atau tautan pendek seperti bit.ly yang dikirimkan oleh nomor tidak dikenal.",
        },
      },
      {
        id: "m3-3",
        title: "Cek Ketelitian Identifikasi Format File dan Domain Aman",
        type: "quiz",
        status: "locked",
        quizContent: {
          questions: [
            {
              id: "q1",
              text: "Jika kurir mengirimkan foto bukti resi pengiriman, format file apa yang wajar dan aman diterima?",
              options: [".APK", ".EXE", ".JPG atau .PNG"],
              correctAnswer: 2,
            },
            {
              id: "q2",
              text: "Manakah dari URL di bawah ini yang merupakan alamat website berbahaya (Typosquatting)?",
              options: ["cimbniagapromo-login.com", "cimbniaga.co.id", "octoclicks.co.id"],
              correctAnswer: 0,
            },
            {
              id: "q3",
              text: "Bagian mana di layar ponsel yang harus selalu dicek untuk memastikan Anda tidak berada di website palsu?",
              options: ["Gambar logo bank di tengah halaman.", "Kolom alamat URL di bagian paling atas browser.", "Warna desain halaman tersebut."],
              correctAnswer: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "mod-4",
    title: "Langkah Awal Menghadapi Phishing",
    description: "Jangan panik, abaikan tautan, dan segera lapor ke PhishGuard.",
    progress: 0,
    items: [
      {
        id: "m4-1",
        title: "Jangan Panik, Segera Laporkan",
        type: "material",
        status: "pending",
        content: {
          heading: "Tindakan Preventif Saat Menerima Pesan Mencurigakan",
          text: "Jika Anda menerima pesan, file, atau tautan yang mencurigakan, langkah preventif pertama yang paling penting adalah Jangan Panik dan Jangan Terburu-buru Mengklik apa pun. Penipu sengaja menakut-nakuti agar Anda bertindak tanpa berpikir panjang. Abaikan pesan tersebut dan segera konfirmasi dengan melaporkannya ke sistem CIMB PhishGuard. Dengan memvalidasi dan melaporkan ke PhishGuard, Anda membantu tim keamanan bank untuk segera memblokir ancaman tersebut agar nasabah lain tidak menjadi korban.",
        },
      },
      {
        id: "m4-3",
        title: "Evaluasi Respons Pertama dan Pelaporan Ancaman",
        type: "quiz",
        status: "locked",
        quizContent: {
          questions: [
            {
              id: "q1",
              text: "Apa hal pertama yang harus Anda lakukan saat menerima pesan ancaman pemblokiran akun bank?",
              options: [
                "Segera membalas pesan tersebut untuk meminta maaf.",
                "Langsung mengklik tautan yang diberikan untuk mengecek akun.",
                "Tetap tenang, jangan panik, dan jangan mengklik tautan apa pun.",
              ],
              correctAnswer: 2,
            },
            {
              id: "q2",
              text: "Mengapa penipu sering menggunakan bahasa yang mendesak atau menakut-nakuti korban?",
              options: [
                "Karena mereka memang pegawai bank yang sedang terburu-buru.",
                "Agar korban panik dan menyerahkan data tanpa berpikir panjang.",
                "Karena sistem bank akan mati dalam 5 menit.",
              ],
              correctAnswer: 1,
            },
            {
              id: "q3",
              text: "Di mana Anda bisa memvalidasi dan melaporkan tautan atau pesan yang Anda curigai sebagai penipuan?",
              options: [
                "Menulis status di media sosial pribadi.",
                "Melaporkannya melalui form sistem CIMB PhishGuard.",
                "Mengirim ulang pesan tersebut ke teman.",
              ],
              correctAnswer: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "mod-5",
    title: "Tindakan Darurat dan Edukasi Keamanan",
    description: "Matikan internet, hubungi 14041, lalu bagikan edukasi ke sekitar.",
    progress: 0,
    items: [
      {
        id: "m5-1",
        title: "Panduan Mitigasi Jika Terlanjur Mengklik Tautan",
        type: "material",
        status: "pending",
        content: {
          heading: "Panduan Mitigasi Jika Terlanjur Mengklik Tautan",
          text: "Bagaimana jika Anda terlanjur meng-klik tautan atau menginstal APK palsu? Segera matikan koneksi internet HP Anda (aktifkan Mode Pesawat) agar aplikasi jahat tidak bisa mengirimkan data keluar. Setelah itu, gunakan HP lain untuk menghubungi Call Center resmi CIMB Niaga di 14041 untuk memblokir kartu dan rekening sementara waktu. Terakhir, mari putus rantai penipuan ini! Bagikan edukasi keamanan yang baru saja Anda pelajari ini kepada keluarga, teman, dan lingkungan sekitarmu. Edukasi adalah senjata terbaik melawan phishing.",
        },
      },
      {
        id: "m5-3",
        title: "Uji Pemahaman Tindakan Mitigasi Darurat",
        type: "quiz",
        status: "locked",
        quizContent: {
          questions: [
            {
              id: "q1",
              text: "Berapa nomor layanan Call Center resmi CIMB Niaga yang harus dihubungi saat keadaan darurat?",
              options: ["14041", "14000", "1500888"],
              correctAnswer: 0,
            },
            {
              id: "q2",
              text: "Apa langkah mitigasi pertama yang bisa dilakukan dari HP Anda jika curiga telah menginstal file APK jahat?",
              options: [
                "Menghapus riwayat browser di HP.",
                "Langsung mematikan daya (Power Off) selamanya.",
                "Mengaktifkan Mode Pesawat agar internet terputus dan data tidak terkirim.",
              ],
              correctAnswer: 2,
            },
            {
              id: "q3",
              text: "Selain melindungi diri sendiri, apa tindakan lanjutan yang disarankan agar penipuan tidak memakan korban lagi?",
              options: [
                "Merahasiakan kejadian ini agar tidak malu.",
                "Membuang smartphone yang terkena virus.",
                "Membagikan edukasi dan materi anti-phishing ini ke keluarga dan lingkungan sekitar.",
              ],
              correctAnswer: 2,
            },
          ],
        },
      },
    ],
  },
];
