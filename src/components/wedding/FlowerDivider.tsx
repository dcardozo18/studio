import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function FlowerDivider({ className }: { className?: string }) {
  const dividerImage = PlaceHolderImages.find(p => p.id === 'flower-divider');

  return (
    <div className={cn("flex items-center justify-center my-8 md:my-12", className)}>
      {dividerImage && (
        <div className="relative h-24 w-full max-w-sm">
            <Image
                src={dividerImage.imageUrl}
                alt={dividerImage.description}
                fill
                className="object-contain"
                data-ai-hint={dividerImage.imageHint}
            />
        </div>
      )}
    </div>
  );
}
