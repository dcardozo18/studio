
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import Section from "./Section";
import { Footprints } from 'lucide-react';
import agenda01 from '@/app/agenda01.png';
import agenda02 from '@/app/agenda02.png';
import agenda03 from '@/app/agenda03.png';
import agenda04 from '@/app/agenda04.png';
import agenda05 from '@/app/agenda05.png';
import agenda06 from '@/app/agenda06.png';
import agenda07 from '@/app/agenda07.png';
import huella from '@/app/huella.png';
import { cn } from '@/lib/utils';


const agendaItems = [
    {
        icon: agenda01,
        time: "15:00",
        title: "Bienvenidos a nuestro día",
    },
    {
        icon: agenda02,
        time: "16:00",
        title: "¡Sí, Acepto!",
    },
    {
        icon: agenda03,
        time: "17:00",
        title: "Say Cheese & Cocktail Party",
    },
    {
        icon: agenda04,
        time: "18:30",
        title: "Brinda con nosotros",
    },
    {
        icon: agenda05,
        time: "19:00",
        title: "La cena está lista",
    },
    {
        icon: agenda06,
        time: "19:30",
        title: "A comer pastel",
    },
    {
        icon: agenda07,
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
    const [visibleSteps, setVisibleSteps] = useState(0);

    useEffect(() => {
      const timers = agendaItems.map((_, index) => 
        setTimeout(() => {
          setVisibleSteps(prev => prev + 1);
        }, (index + 1) * 500) // Each paw print appears after 500ms
      );
  
      return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <Section animationDelay='800ms'>
            <div className="text-center">
                <h2 className="text-3xl font-headline uppercase tracking-widest text-primary mb-12">Agenda del Evento</h2>
                <div className="grid md:grid-cols-2 sm:grid-cols-2 gap-6">
                    {agendaItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <Card 
                                key={index} 
                                className={`text-[#634F44] border-0 bg-transparent shadow-none flex flex-col items-center relative ${index % 2 !== 0 ? 'md:mt-[100px]' : ''}`}
                            >
                                {index < visibleSteps && (
                                     <div
                                     className={cn(
                                       'absolute -top-8 left-1/2 -translate-x-1/2 transition-opacity duration-1000 opacity-100',
                                     )}
                                     style={{
                                       transform: `translateX(-50%) rotate(${index % 2 === 0 ? '-15deg' : '15deg'})`
                                     }}
                                   >
                                     <Image
                                       src={huella}
                                       alt="Huella de perro"
                                       width={40}
                                       height={40}
                                       className="opacity-70 animate-fade-in-up"
                                     />
                                   </div>
                                )}
                                <CardContent className="flex flex-col items-center text-center p-4">
                                    {typeof IconComponent === 'string' || !IconComponent.src ? (
                                        <IconComponent className="w-10 h-10 text-accent mb-4" />
                                    ) : (
                                        <Image src={IconComponent} alt={item.title} width={150} height={150} className="mb-1" />
                                    )}
                                    <p className="text-2xl font-headline text-primary mb-2" style={{ fontSize: "2rem", fontFamily: "'Mea Culpa', cursive" }}>{item.time}</p>
                                    <h3 className="text-base font-body uppercase tracking-wider leading-tight">{item.title}</h3>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </Section>
    )
}
