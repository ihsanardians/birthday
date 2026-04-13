"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: "500",
});

export default function MessageSection({ onNext }: { onNext: () => void }) {
  const fullMessage = `haii sayangg selamat bertambah usiaa ...
                      \nSebelumnya aku harus berterima kasih ke Allah, bunda, ayah kamu karena sudah melahirkan wanita yang penyayang, baik hatinya, cantik, dan super lucu ini. Aku bersyukur banget bisa dipertemukan sama kamu di satu kesempatan hidup di dunia ini bii.. 
                      \nSemoga di umur kamu yang menginjak usia kepala dua ini, semakin rajin ibadahnya, selalu diberi kesehatan, panjang umur, selalu bahagia, berbakti terus sama orang tua, semoga segala doa dan cita-cita yang kamu inginkan mulai sekarang bisa terwujud satu per satu dan dimudahkan selalu dalam segala urusan. Aaamiinn...
                      \nSekarang kamu makin dewasa yang dimana kamu pasti tau yang terbaik atau yang ngga buat diri kamuu, semoga lebih dewasa dari sebelumnya yaaa, jangan pernah cape buat perbaiki diri jadi lebih baik lagii, semangat terus buat kejar semua keinginan kamu, aku yakin kamu pasti bisa sayangg, jangan pernah takut gagal yaa, aku selalu dukung kamu, dan akan nemenin kamu dalam kondisi apapun.
                      \nSelalu rendah hati, jadi anak yg baikkk, selalu sayang sama keluarga yaa. Oiyaa jangan lupa bersyukur bibiii, semoga apapun yang kamu lakukan hari ini dan hari-hari besok selalu diberi kelancaran serta keselamatan.
                      \nTerakhir, maaf kalo tulisanku berantakan atau kepanjangan, dan maaf gabisa selalu ada di samping kamu, walaupun kita ldr, aku selalu berdoa agar kamu selalu dalam lindungan Allah, semoga aku bisa nemenin kamu di ulang tahun di tahun tahun berikutnya yaa sayaangg aamiinn
                      \nI love you, always. ❤️`;

  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullMessage.length) {
        setDisplayedText(fullMessage.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingDone(true);
      }
    }, 40);
    return () => clearInterval(typingInterval);
  }, [fullMessage]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl w-full">
      {/* BAGIAN FOTO POLAROID (Soft Pastel Touch) */}
      <motion.div
        initial={{ y: -100, opacity: 0, rotate: -15 }}
        animate={{ y: 0, opacity: 1, rotate: -4 }}
        transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.5 }}
        className="relative z-10"
      >
        {/* Border fotonya tidak putih terang, tapi pink super lembut/krem */}
        <div className="bg-[#fff0f5] p-4 pb-12 rounded-sm shadow-[0_0_40px_rgba(244,143,177,0.15)] border border-pink-200/50 transform hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer">
          <div className="w-48 h-56 md:w-64 md:h-72 bg-gray-300 overflow-hidden rounded-sm relative">
            <img
              src="/images/polaroid.jpeg"
              alt="My Love"
              className="w-full h-full object-cover grayscale-[20%] sepia-[10%]"
            />
            {/* Overlay pastel sangat tipis di atas foto biar estetik */}
            <div className="absolute inset-0 bg-pink-300 mix-blend-overlay opacity-20"></div>
          </div>
          <p className="absolute bottom-4 left-0 right-0 text-center font-black text-gray-800 text-sm tracking-widest uppercase">
            My Everything ✨
          </p>
        </div>
      </motion.div>

      {/* BAGIAN SURAT CINTA (Dark & Soft Pastel) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        // Kotak surat transparan gelap dengan border pink pastel tipis
        className="flex-1 bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-pink-200/20 shadow-[0_0_50px_rgba(244,143,177,0.05)] relative"
      >
        {/* Hiasan Pin Soft Pastel */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-pink-200/60 rotate-2 border border-white/10 shadow-sm backdrop-blur-md rounded-sm" />

        <h2 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-tighter">
          Untuk Pacarku Yang Gemas...
        </h2>

        <div className="min-h-[250px]">
          {/* Teks surat warna abu terang (lebih rileks di mata) */}
          <p
            className={`${caveat.className} text-3xl md:text-4xl text-gray-300 leading-relaxed whitespace-pre-line`}
          >
            {displayedText}
            {/* Kursor ngetik warna soft pink */}
            {!isTypingDone && (
              <span className="animate-pulse ml-1 inline-block w-1 h-8 bg-pink-300 translate-y-1"></span>
            )}
          </p>
        </div>

        <div className="mt-10 min-h-[60px] flex justify-end">
          {isTypingDone && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              // Tombol Ghost (Transparan) dengan border dan teks Soft Pink
              className="px-6 py-3 bg-pink-400/10 border border-pink-300/50 text-pink-300 font-black uppercase tracking-widest text-sm rounded-full shadow-[0_0_20px_rgba(244,143,177,0.1)] hover:bg-pink-400/20 hover:text-pink-200 transition-all flex items-center gap-2"
            >
              Lihat Memori Kita <span className="text-lg">→</span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
