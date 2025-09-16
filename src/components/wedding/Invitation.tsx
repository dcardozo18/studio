import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Section from './Section';

export default function Invitation() {
  const topFlowers = PlaceHolderImages.find(p => p.id === 'invitation-top-flowers');
  const bottomFlowers = PlaceHolderImages.find(p => p.id === 'invitation-bottom-flowers');

  return (
    <Section className="!py-0">
      <div className="relative text-[#634F44] font-body text-center rounded-lg overflow-hidden max-w-2xl mx-auto">
        <div className="px-6 pb-4 pt-0">
          <p className="text-sm uppercase tracking-widest leading-relaxed">
            Dos almas, una vida y el deseo de compartirla con quienes amamos
          </p>

          <h2 className="text-7xl md:text-7xl font-headline my-4" style={{ fontFamily: "'Mea Culpa', cursive" }}>
            Ricardo & Rocio
          </h2>

          <p className="text-xs uppercase tracking-wide leading-relaxed max-w-md mx-auto">
            Los invitan a ser parte de un día lleno de amor, sueños compartidos y momentos inolvidables
          </p>

          <div className="flex justify-center items-center space-x-4 md:space-x-6 my-8 text-2xl md:text-3xl font-light tracking-widest">
            <span>DICIEMBRE</span>
            <span className="border-l border-[#634F44] h-6"></span>
            <span className="font-bold text-4xl">27</span>
            <span className="border-l border-[#634F44] h-6"></span>
            <span>2025</span>
          </div>

          <div className="uppercase text-sm tracking-wider">
            <p className="font-semibold">Hacienda Pilares del Rosal</p>
            <p>El Rosal, Subachoque</p>
          </div>
        </div>

      </div>
    </Section>
  );
}
