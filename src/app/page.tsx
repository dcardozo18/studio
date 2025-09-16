
import Hero from '@/components/wedding/Hero';
import CountDown from '@/components/wedding/Countdown';
import FlowerDivider from '@/components/wedding/FlowerDivider';
import Invitation from '@/components/wedding/Invitation';
import Agenda from '@/components/wedding/Agenda';
import RsvpForm from '@/components/wedding/RsvpForm';
import MusicSuggestion from '@/components/wedding/MusicSuggestion';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <CountDown />
      <Invitation />
      <FlowerDivider />
      <Agenda />
      <FlowerDivider />
      <RsvpForm />
      <FlowerDivider />
      <MusicSuggestion />
      <footer className="w-full py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Ricardo & Rocio. All rights reserved.</p>
      </footer>
    </main>
  );
}
