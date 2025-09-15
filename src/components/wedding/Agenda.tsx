import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Section from "./Section";
import { MapPin, Shirt, Gift, CheckCircle } from 'lucide-react';
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
            <div className="bg-[#F5EFE8] text-[#634F44] font-body text-center rounded-lg shadow-lg p-8 md:p-12 max-w-2xl mx-auto">

                <div className="space-y-8">
                    {agendaItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <item.icon className="w-10 h-10 text-accent mb-3" />
                            <h3 className="text-xl font-headline uppercase tracking-widest">{item.title}</h3>
                            <div className="mt-2 text-sm leading-relaxed">
                                {item.lines.map((line, lineIndex) => <p key={lineIndex}>{line}</p>)}
                            </div>
                            <div className="flex gap-4 mt-3">
                                {item.links.map((link, linkIndex) => (
                                     <Button key={linkIndex} asChild variant="link" className="text-accent hover:text-accent/80 p-0 h-auto">
                                        <Link href={link.url} target="_blank">{link.text}</Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 pt-6 border-t border-dashed border-[#C5B5A4]">
                    <h3 className="text-2xl font-headline text-accent uppercase tracking-wider">Confirma tu asistencia aquí</h3>
                    <Button size="lg" className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground text-lg">
                        <CheckCircle className="mr-2" />
                        RSVP
                    </Button>
                </div>
            </div>
        </Section>
    )
}
