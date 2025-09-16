import Image from 'next/image';
import Countdown from './Countdown';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'wedding-hero');

  return (
    <div className="relative text-[#634F34] w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0" />
      <div className="relative z-10 p-4 animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-headline" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)', fontSize: "8rem", fontFamily: "'Mea Culpa', cursive" }}>
          Ricardo & Rocio
        </h1>
        <div className="mt-8">
          <Countdown />
        </div>
      </div>
    </div>
  );
}
