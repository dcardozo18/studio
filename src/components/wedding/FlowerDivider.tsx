import { Flower, Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FlowerDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4 my-8 md:my-12 text-primary/50", className)}>
      <Flower className="w-6 h-6" />
      <Sprout className="w-5 h-5" />
      <Flower className="w-6 h-6" />
    </div>
  );
}
