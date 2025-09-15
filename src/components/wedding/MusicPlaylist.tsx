import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music2 } from "lucide-react";
import Section from "./Section";

const favoriteSongs = [
  { title: "Perfect", artist: "Ed Sheeran" },
  { title: "A Thousand Years", artist: "Christina Perri" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley" },
  { title: "All of Me", artist: "John Legend" },
];

export default function MusicPlaylist() {
  return (
    <Section animationDelay='600ms'>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-headline text-primary">Our Music</h2>
        <p className="text-muted-foreground mt-2 text-lg">Songs that tell our story. Get inspired for the dance floor!</p>
      </div>
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <Card className="overflow-hidden bg-card/80 border-2">
            <CardContent className="p-0">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DXa2d3m5iG4bW?utm_source=generator"
                width="100%"
                height="450"
                allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Wedding Songs Playlist"
              ></iframe>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="h-full bg-card/80 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music2 className="text-primary" />
                Our Favorite Songs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {favoriteSongs.map((song, index) => (
                  <li key={index} className="flex flex-col">
                    <span className="font-semibold text-foreground">{song.title}</span>
                    <span className="text-sm text-muted-foreground">{song.artist}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
