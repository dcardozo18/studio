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
      <div className="relative z-10 p-4 animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-headline" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)', lineHeight: "80px", fontSize: "7rem", fontFamily: "'Mea Culpa', cursive" }}>
          Ricardo<br /><span className="text-primary" style={{ fontSize: "6rem", fontFamily: "'Mea Culpa', cursive" }}>&</span><br />Duvis Rocio
        </h1>
        <div className="mt-8">
          <Countdown />
        </div>
      </div>
    </div>
  );
}
