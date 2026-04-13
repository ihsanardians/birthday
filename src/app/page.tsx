"use client";
import { useState, useEffect } from "react";
import { useTimeLock } from "@/hooks/useTimeLock";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";

import Background from "@/components/Background";
import MusicPlayer from "@/components/MusicPlayer";
import ItinerarySection from "@/components/ItinerarySection";
import CandleSection from "@/components/CandleSection";
import MessageSection from "@/components/MessageSection";
import DomeGallery from "@/components/DomeGallery";

export default function BirthdayPage() {
  const { isUnlocked, timeLeft } = useTimeLock();

  // 0: Itinerary, 1: Lilin, 2: Ucapan, 3: Galeri
  const [currentStage, setCurrentStage] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fungsi untuk mengecek lebar layar
    const checkScreen = () => setIsMobile(window.innerWidth < 768);

    checkScreen(); // Jalankan sekali saat web dibuka
    window.addEventListener("resize", checkScreen); // Pantau jika layar diputar/diubah

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 1. Logika Tembak Confetti Meriah saat masuk Stage 1 (Lilin)
  useEffect(() => {
    if (hasStarted && currentStage === 1) {
      const count = 300;
      const defaults = {
        origin: { y: 1.1 },
        spread: 160,
        colors: ["#FFC0CB", "#FF69B4", "#FFD700", "#FF4500", "#FF1493"],
      };

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55, angle: 120 });
      fire(0.2, { spread: 60, angle: 120 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, angle: 120 });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        angle: 120,
      });
      fire(0.1, { spread: 120, startVelocity: 45, angle: 120 });

      setTimeout(() => {
        fire(0.25, { spread: 26, startVelocity: 55, angle: 60 });
        fire(0.2, { spread: 60, angle: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, angle: 60 });
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
          angle: 60,
        });
        fire(0.1, { spread: 120, startVelocity: 45, angle: 60 });
      }, 500);
    }
  }, [hasStarted, currentStage]);

  return (
    <>
      {/* Background disembunyikan saat Stage 1 */}
      {hasStarted && (
        <div
          className={`fixed z-[90] transition-opacity duration-1000 ${
            currentStage === 1 ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {hasStarted && (
            <div
              className={`fixed z-[90] transition-opacity duration-1000 ${
                currentStage >= 1
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <MusicPlayer
                isSurpriseTime={currentStage >= 1}
                hasStarted={hasStarted}
                // Volume otomatis menyesuaikan: agak pelan saat tiup lilin agar syahdu,
                // lalu kembali normal saat baca pesan dan lihat galeri.
                volume={currentStage === 1 ? 0 : 0.6}
              />
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pink-100/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-10 rounded-3xl border-4 border-black shadow-[12px_12px_0px_0px_rgba(255,105,180,1)] text-center max-w-sm mx-4"
            >
              <div className="text-6xl mb-6 animate-bounce">💌</div>
              <h1 className="text-2xl font-black uppercase mb-2">
                Hadiah Kecil
              </h1>
              <p className="text-gray-600 font-medium mb-8">
                Pastikan volume HP kamu nyala ya!
              </p>

              <button
                onClick={() => setHasStarted(true)}
                className="w-full py-4 bg-[#FF69B4] text-white font-black text-xl uppercase tracking-widest border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
              >
                Buka Sekarang
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PERBAIKAN KUNCI SCROLL: 
        Jika currentStage === 1 (Lilin), main jadi "h-screen overflow-hidden bg-black".
        Jika stage lain, jadi "min-h-screen pt-12 pb-24" agar bisa di-scroll dengan wajar.
      */}
      <main
        className={`relative overflow-x-hidden z-10 transition-colors duration-1000 
          ${!hasStarted || currentStage === 1 || currentStage === 3 ? "h-screen overflow-hidden bg-black" : "min-h-screen pt-12 pb-24"}
          ${currentStage >= 2 ? "bg-black text-white" : "text-black"}`}
      >
        {/* HEADER */}
        {currentStage === 0 && (
          <header className="px-6 pb-6 text-center">
            <h1 className="text-5xl font-black tracking-tighter uppercase drop-shadow-md">
              Our Journey
            </h1>
          </header>
        )}

        <AnimatePresence mode="wait">
          {/* STAGE 0: ITINERARY */}
          {currentStage === 0 && (
            <motion.div
              key="stage0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="max-w-md mx-auto"
            >
              <ItinerarySection />

              <div className="mt-16 px-4">
                <button
                  disabled={!isUnlocked}
                  onClick={() => setCurrentStage(1)}
                  className={`w-full p-8 rounded-3xl border-[4px] border-black transition-all flex flex-col items-center justify-center gap-2
                    ${
                      isUnlocked
                        ? "bg-[#FF69B4] text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-105 active:scale-95 cursor-pointer"
                        : "bg-white text-gray-400 opacity-60 cursor-not-allowed border-dashed"
                    }`}
                >
                  <motion.span
                    animate={{ rotate: isUnlocked ? [0, 10, -10, 0] : 0 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-5xl mb-2"
                  >
                    🎁
                  </motion.span>
                  <p className="font-black text-xl uppercase tracking-widest">
                    {isUnlocked ? "Buka Kejutan!" : "Tunggu Jam 12 Malam"}
                  </p>
                  {!isUnlocked && (
                    <p className="font-bold text-sm bg-gray-100 text-gray-500 px-4 py-1 rounded-full mt-2">
                      Terkunci: {timeLeft}
                    </p>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* PERBAIKAN: Masukkan Stage 1 ke dalam AnimatePresence agar tidak menumpuk di bawah */}
          {currentStage === 1 && (
            <motion.div
              key="stage1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-screen flex items-center justify-center"
            >
              {/* Lilin Neo-Realistic hasil update kita sebelumnya yang sudah menyala */}
              <CandleSection onBlown={() => setCurrentStage(2)} />
            </motion.div>
          )}

          {/* STAGE 2: PESAN CINTA */}
          {currentStage === 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center min-h-screen p-6"
            >
              <MessageSection onNext={() => setCurrentStage(3)} />
            </motion.div>
          )}

          {/* STAGE 3: DOME GALLERY */}
          {currentStage === 3 && (
            <motion.div
              key="stage3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // absolute inset-0 akan memaksa galeri menempel dari ujung ke ujung layar
              className="absolute inset-0 w-full h-full overflow-hidden bg-[#060010]"
            >
              {/* TEKS MENGAMBANG */}
              <div className="absolute top-16 md:top-24 left-0 right-0 text-center z-50 pointer-events-none px-4">
                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
                  Core Memories
                </h2>
                <p className="text-pink-400 font-bold mt-2 italic drop-shadow-[0_3px_8px_rgba(0,0,0,1)]">
                  Swipe untuk melihat ✨
                </p>
              </div>

              {/* WADAH GALERI */}
              <div style={{ width: "100vw", height: "100vh" }}>
                <DomeGallery
                  fit={1}
                  minRadius={600}
                  maxVerticalRotationDeg={5}
                  segments={34}
                  dragDampening={2}
                  // grayscale
                  fitBasis="max"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
