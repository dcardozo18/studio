
import { Card, CardContent } from "@/components/ui/card";
import Section from "./Section";
import { DoorOpen, HeartHandshake, Camera, Wine, Utensils, CakeSlice, Music, Footprints } from 'lucide-react';

const agendaItems = [
    {
        icon: DoorOpen,
        time: "15:00",
        title: "Bienvenidos a nuestro día",
    },
    {
        icon: HeartHandshake,
        time: "16:00",
        title: "¡Sí, Acepto!",
    },
    {
        icon: Camera,
        time: "17:00",
        title: "Say Cheese & Cocktail Party",
    },
    {
        icon: Wine,
        time: "18:30",
        title: "Brinda con nosotros",
    },
    {
        icon: Utensils,
        time: "19:00",
        title: "La cena está lista",
    },
    {
        icon: CakeSlice,
        time: "19:30",
        title: "A comer pastel",
    },
    {
        icon: Music,
        time: "20:00",
        title: "Saca los prohibidos",
    },
    {
        icon: Footprints,
        time: "24:00",
        title: "Deja tu zapatilla de Cenicienta",
    }
];


export default function Agenda() {
    return (
        <Section animationDelay='800ms'>
            <div className="text-center">
                <h2 className="text-3xl font-headline uppercase tracking-widest text-primary mb-12">Itinerario</h2>
                <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
                    {agendaItems.map((item, index) => (
                        <Card key={index} className="text-[#634F44] border-0 bg-transparent shadow-none flex flex-col items-center">
                            <CardContent className="flex flex-col items-center text-center p-4">
                                <item.icon className="w-10 h-10 text-accent mb-4" />
                                <p className="text-2xl font-headline text-primary mb-2">{item.time}</p>
                                <h3 className="text-base font-body uppercase tracking-wider leading-tight">{item.title}</h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Section>
    )
}
