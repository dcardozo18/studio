import Image from 'next/image';
import { cn } from '@/lib/utils';
import flowerDivider from '@/app/flowers.png';

export default function FlowerDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center my-8 md:my-12", className)}>
        <div className="relative h-24 w-full max-w-sm">
          <Image 
            src={flowerDivider} 
            alt="flower-divider"
            style={{ objectFit: 'contain' }}
            fill
            priority
          />
        </div>
    </div>
  );
}
