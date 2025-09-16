
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import huella from '@/app/huella.png';
import { cn } from '@/lib/utils';
import Section from './Section';

const steps = [
  { id: 1, label: '15:00' },
  { id: 2, label: '16:00' },
  { id: 3, label: '17:00' },
  { id: 4, label: '18:30' },
  { id: 5, label: '19:00' },
  { id: 6, label: '19:30' },
  { id: 7, label: '20:00' },
  { id: 8, label: '24:00' },
];

export default function DogSteps() {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSteps((prev) => (prev < steps.length ? prev + 1 : 0));
    }, 1000); // Paw print appears every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <Section className="py-12">
      <div className="relative w-full h-24">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              'absolute transition-opacity duration-1000',
              index < visibleSteps ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              left: `${(index / (steps.length - 1)) * 95}%`,
              transform: `translateX(-50%) rotate(${index % 2 === 0 ? '-15deg' : '15deg'}) translateY(${index % 2 === 0 ? '0px' : '20px'})`,
            }}
          >
            <Image
              src={huella}
              alt="Huella de perro"
              width={50}
              height={50}
              className="opacity-70"
            />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-primary font-semibold">
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
