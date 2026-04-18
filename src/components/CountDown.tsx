"use client";
import React, { useState, useEffect } from "react";

const CountDown = () => {
  const [mounted, setMounted] = useState(false);

  // Set your target date here
  const targetDate = new Date(`7/3/2026`).getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    setMounted(true); // Ensures this only runs on the client side

    const timer = setInterval(() => {
      const calculatedTime = targetDate - Date.now();
      if (calculatedTime >= 0) {
        setTimeLeft(calculatedTime);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Prevent Hydration error by not rendering on server
  if (!mounted) return null;

  const d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const h = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const m = Math.floor((timeLeft / 1000 / 60) % 60);
  const s = Math.floor((timeLeft / 1000) % 60);

  return (
    <span className="font-bold text-5xl text-yellow-300">
      {d}:{h}:{m}:{s}
    </span>
  );
};

export default CountDown;
