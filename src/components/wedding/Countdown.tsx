"use client";

import { useState, useEffect } from 'react';

const weddingDate = new Date('2025-12-27T16:00:00');

type TimeLeft = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

const calculateTimeLeft = (): TimeLeft => {
  const difference = +weddingDate - +new Date();
  let timeLeft: TimeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl md:text-6xl font-headline text-primary">{value.toString().padStart(2, '0')}</span>
    <span className="text-sm md:text-base text-foreground/80 uppercase tracking-widest">{label}</span>
  </div>
);

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});

  useEffect(() => {
    // Set initial time left on mount to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerComponents = Object.keys(timeLeft).length ? (
    <div className="grid grid-cols-4 gap-4 md:gap-8">
      <CountdownUnit value={timeLeft.days || 0} label="Days" />
      <CountdownUnit value={timeLeft.hours || 0} label="Hours" />
      <CountdownUnit value={timeLeft.minutes || 0} label="Minutes" />
      <CountdownUnit value={timeLeft.seconds || 0} label="Seconds" />
    </div>
  ) : (
    <span className="text-2xl font-headline text-primary">The day is here!</span>
  );

  return (
    <div className="py-8">
      {timerComponents}
    </div>
  );
}
