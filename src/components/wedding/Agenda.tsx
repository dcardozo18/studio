
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Section from "./Section";
import { MapPin, Shirt, Gift } from 'lucide-react';
import Link from "next/link";

const agendaItems = [
    {
        icon: MapPin,
        title: "Ceremonia y Recepción",
        lines: [
            "Hacienda Pilares del Rosal",
            "Subachoque El Rosal KM 3, El Rosal",
            "Cundinamarca"
        ],
        links: [
            { text: "Google Maps", url: "https://maps.app.goo.gl/UGLRZQC46Z8QWKYF9" },
            { text: "Waze", url: "https://waze.com/ul/hd2g5wtyy0" }
        ]
    },
    {
        icon: Shirt,
        title: "Código de Vestuario: Coctel",
        lines: [
            "Luce tu mejor atuendo para una noche inolvidable."
        ],
        links: [
            { text: "Ver inspiración", url: "https://pin.it/5VNMVMOZA" }
        ]
    },
    {
        icon: Gift,
        title: "Lluvia de Sobres",
        lines: [
            "Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo, que sea una lluvia de sobres."
        ],
        links: []
    }
];


export default function Agenda() {
    return (
        <Section animationDelay='800ms'>
            <div className="text-center">
                <h2 className="text-3xl font-headline uppercase tracking-widest text-primary mb-10">Itinerario</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {agendaItems.map((item, index) => (
                        <Card key={index} className="text-[#634F44] border-0 flex flex-col pt-8 pb-6 px-6">
                            <CardContent className="flex flex-col items-center text-center flex-grow">
                                <item.icon className="w-12 h-12 text-accent mb-4" />
                                <h3 className="text-xl font-headline uppercase tracking-widest mb-3">{item.title}</h3>
                                <div className="text-sm leading-relaxed mb-4 flex-grow">
                                    {item.lines.map((line, lineIndex) => <p key={lineIndex}>{line}</p>)}
                                </div>
                                <div className="flex gap-4">
                                    {item.links.map((link, linkIndex) => (
                                         <Button key={linkIndex} asChild variant="link" className="text-accent hover:text-accent/80 p-0 h-auto">
                                            <Link href={link.url} target="_blank">{link.text}</Link>
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Section>
    )
}
