import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import WeddingMap from "./Map";
import Section from "./Section";

const details = [
  {
    icon: CalendarDays,
    title: "Date",
    content: "Saturday, September 20, 2025",
  },
  {
    icon: Clock,
    title: "Time",
    content: "Ceremony starts at 4:00 PM",
  },
  {
    icon: MapPin,
    title: "Location",
    content: "The Grand Plaza, Los Angeles, CA",
  },
];

export default function WeddingDetails() {
  return (
    <Section animationDelay='200ms'>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-headline text-primary">The Big Day</h2>
        <p className="text-muted-foreground mt-2 text-lg">Here's what you need to know.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        <div className="space-y-6">
          {details.map((item, index) => (
            <Card key={index} className="bg-card/80 border-2">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <item.icon className="w-8 h-8 text-accent" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-foreground">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden bg-card/80 border-2">
            <CardContent className="p-0 h-full">
                <WeddingMap />
            </CardContent>
        </Card>
      </div>
    </Section>
  );
}
