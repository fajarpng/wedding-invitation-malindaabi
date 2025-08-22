'use client'

import React, { useEffect, useState } from "react";

type CountdownProps = {
  date: string; // e.g. "2026-06-20T10:00:00+07:00"
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(target: number): TimeLeft {
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const Countdown: React.FC<CountdownProps> = ({ date }) => {
  const target = new Date(date).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(target)); // ✅ calculate only after mount
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  if (!timeLeft) {
    return (
      <div className="flex gap-5 justify-center">
        <Box value={0} label="Days" />
        <Box value={0} label="Hours" />
        <Box value={0} label="Minutes" />
        <Box value={0} label="Seconds" />
      </div>
    );
  }

  return (
    <div className="flex gap-5 justify-center">
      <Box value={timeLeft.days} label="Days" />
      <Box value={timeLeft.hours} label="Hours" />
      <Box value={timeLeft.minutes} label="Minutes" />
      <Box value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

const Box: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-2xl font-bold">
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-xs">{label}</div>
  </div>
);

export default Countdown;
