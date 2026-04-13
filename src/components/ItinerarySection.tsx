"use client";
import { motion } from "framer-motion";

const itineraryData = [
  {
    time: "09:00",
    activity: "Jemput Pacarku",
    desc: "Siap-siap, This Day is Yours!",
    loc: "https://maps.app.goo.gl/onbhdF3xTWdDr6mm9",
  },
  {
    time: "09:30",
    activity: "Sarapan Enak",
    desc: "Pagi-pagi enaknya makan sotoo!",
    loc: "https://maps.app.goo.gl/socXKoduwmX3VHtN8",
  },
  {
    time: "10:30",
    activity: "Istirahat Bentar",
    desc: "Kembali ke rumah duluu",
    loc: "https://maps.app.goo.gl/PkVPREYXVDEbGZ5x7",
  },
  {
    time: "15:00",
    activity: "Ayo Siap-Siap",
    desc: "Siap Siap acara mau dimulaiii!!!",
    loc: "https://maps.app.goo.gl/PkVPREYXVDEbGZ5x7",
  },
  {
    time: "17:00",
    activity: "Yakalii Ngga Foto",
    desc: "Photobox terakhir di umur 19 tahun",
    loc: "https://maps.app.goo.gl/KW7aEQNVUcPYDz4W6",
  },
  {
    time: "18:30",
    activity: "Dinner di LokalFolk",
    desc: "Makan malam spesial sebelum jam 12 malam tiba.",
    loc: "https://maps.app.goo.gl/4fyrmNFJiiDjBVpbA",
  },
];

export default function ItinerarySection() {
  return (
    <div className="max-w-md mx-auto px-4 py-8 relative">
      {/* Garis Vertikal Penghubung Ala Timeline */}
      <div className="absolute left-[44px] top-12 bottom-32 w-1 bg-black rounded-full" />

      <div className="space-y-12">
        {itineraryData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              type: "spring",
              bounce: 0.4,
            }}
            className="relative flex items-start gap-6"
          >
            {/* Indikator Waktu (Bulat Hitam) */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="z-10 flex flex-col items-center justify-center w-14 h-14 bg-black rounded-full border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,105,180,1)] flex-shrink-0"
            >
              <span className="text-[10px] font-bold text-white tracking-widest">
                JAM
              </span>
              <span className="text-sm font-black text-[#FFC0CB] leading-none">
                {item.time}
              </span>
            </motion.div>

            {/* Kartu Scrapbook Playful */}
            <motion.div
              whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1.5 : -1.5 }}
              className="flex-1 bg-white p-5 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,105,180,1)] transition-shadow cursor-pointer relative"
            >
              {/* Efek Selotip di atas kartu */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-[#FFC0CB]/90 rotate-2 border border-black/10" />

              <h3 className="text-xl font-black text-black uppercase tracking-tight">
                {item.activity}
              </h3>
              <p className="text-sm text-gray-700 mt-2 font-medium italic">
                "{item.desc}"
              </p>

              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => window.open(item.loc)}
                className="mt-5 inline-block font-black text-[10px] uppercase tracking-widest bg-[#FF69B4] text-white px-3 py-1.5 rounded-lg border-2 border-black hover:bg-black hover:text-[#FF69B4] transition-colors"
              >
                Lihat Lokasi 📍
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
