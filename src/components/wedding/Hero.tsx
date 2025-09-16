import Image from 'next/image';
import Countdown from './Countdown';
import flores from '@/app/flores.png';
import hexagono from '@/app/hexagono.png';


export default function Hero() {

  return (
    <div className="relative text-[#634F34] w-full h-svh h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Image
            src={hexagono}
            alt="hexagon background"
            layout="fill"
            objectFit="contain"
            quality={100}
            priority
            />
        </div>
        <div className="absolute inset-0 z-0">
            <Image
            src={flores}
            alt="flowers background"
            layout="fill"
            objectFit="contain"
            quality={100}
            priority
            />
      </div>
      <div className="relative z-10 p-4 animate-fade-in-up hero-section">
        <h1 className="text-6xl sm:text-6xl md:text-8xl font-headline">
          Ricardo<br /><span className="text-primary md:text-4xl">&</span><br />Duvis Rocio
        </h1>
      </div>
    </div>
  );
}
