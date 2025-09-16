import Image from 'next/image';
import { cn } from '@/lib/utils';
import flowerDivider from '@/app/flowers.png';

export default function FlowerDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
        <div className="relative w-full max-w-6xl">
          <Image 
            src={flowerDivider} 
            alt="flower-divider"
            priority
          />
        </div>
    </div>
  );
}
