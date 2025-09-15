import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
    animationDelay?: string;
}

export default function Section({ className, style, animationDelay, ...props }: SectionProps) {
  const combinedStyle = { ...style, animationDelay };
  
  return (
    <section
      className={cn(
        'w-full max-w-6xl mx-auto py-12 md:py-20 px-4 md:px-6 opacity-0 animate-fade-in-up',
        className
      )}
      style={combinedStyle}
      {...props}
    />
  );
}
