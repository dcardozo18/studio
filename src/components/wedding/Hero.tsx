import Image from 'next/image';
import Countdown from './Countdown';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'wedding-hero');

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 p-4 animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-headline" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)', fontFamily: "'Mea Culpa', cursive" }}>
          Ricardo & Rocio
        </h1>
        <p className="mt-4 text-xl md:text-2xl" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
          Are getting married!
        </p>
        <div className="mt-8">
          <Countdown />
        </div>
      </div>
    </div>
  );
}
