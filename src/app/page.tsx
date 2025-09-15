import Hero from '@/components/wedding/Hero';
import WeddingDetails from '@/components/wedding/WeddingDetails';
import GuestBook from '@/components/wedding/GuestBook';
import MusicPlaylist from '@/components/wedding/MusicPlaylist';
import FlowerDivider from '@/components/wedding/FlowerDivider';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <WeddingDetails />
      <FlowerDivider />
      <GuestBook />
      <FlowerDivider />
      <MusicPlaylist />
      <footer className="w-full py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Ricardo & Rocio. All rights reserved.</p>
      </footer>
    </main>
  );
}
