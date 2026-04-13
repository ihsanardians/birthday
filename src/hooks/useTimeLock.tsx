"use client";
import { useState, useEffect } from "react";

export const useTimeLock = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  // Target: 15 April 2026 jam 00:00
  const targetDate = new Date("2026-04-14T00:00:00").getTime();

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsUnlocked(true);
        setTimeLeft("00:00:00");
      } else {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format agar selalu 2 digit (misal: 09:05:01)
        const format = (num: number) => num.toString().padStart(2, "0");
        setTimeLeft(`${format(hours)}:${format(minutes)}:${format(seconds)}`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return { isUnlocked, timeLeft };
};
