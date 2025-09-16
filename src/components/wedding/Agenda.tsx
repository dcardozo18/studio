
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
    { icon: agenda01, time: "15:00", title: "Bienvenidos a nuestro día" },
    { icon: agenda02, time: "16:00", title: "¡Sí, Acepto!" },
    { icon: agenda03, time: "17:00", title: "¡Say Cheese & Cocktail Party!" },
    { icon: agenda04, time: "18:30", title: "¡Brinda con nosotros!" },
    { icon: agenda05, time: "19:00", title: "¡La cena está lista!" },
    { icon: agenda06, time: "19:30", title: "¡A comer pastel!" },
    { icon: agenda07, time: "20:00", title: "¡Saca los prohibidos!" },
    { icon: Footprints, time: "24:00", title: "¡Deja tu zapatilla de Cenicienta!" }
];

export default function Agenda() {
    const [visibleSteps, setVisibleSteps] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const timeline = document.getElementById('timeline');
            if (timeline) {
                const { top } = timeline.getBoundingClientRect();
                const triggerPoint = window.innerHeight * 0.8; 
                if (top < triggerPoint && visibleSteps < agendaItems.length) {
                    const timers = agendaItems.map((_, index) =>
                        setTimeout(() => {
                            setVisibleSteps(prev => Math.max(prev, index + 1));
                        }, index * 300)
                    );
                    
                    return () => {
                        timers.forEach(clearTimeout);
                    };
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleSteps]);

    return (
        <Section animationDelay='800ms'>
            <div className="text-center">
                <h2 className="text-3xl font-headline uppercase tracking-widest text-primary mb-16">Agenda del Evento</h2>
                
                <div id="timeline" className="relative max-w-xl mx-auto">
                    {agendaItems.map((item, index) => {
                        const IconComponent = item.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <div key={index} className={cn("relative mb-8 flex items-center", isEven ? "justify-start" : "justify-end")}>
                                <div className={cn("w-1/2 relative", isEven ? "pr-8 text-right" : "pl-8 text-left")}>
                                    <div className={cn(
                                        "relative inline-block transition-all duration-700 delay-300",
                                        visibleSteps > index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    )}>
                                        <Card className="text-[#634F44] border-0 bg-transparent shadow-none">
                                            <CardContent className="flex flex-col items-center text-center p-0">
                                                {typeof IconComponent === 'string' || !('src' in IconComponent) ? (
                                                    <IconComponent className="w-10 h-10 text-accent mb-4 mx-auto" />
                                                ) : (
                                                    <Image src={IconComponent} alt={item.title} width={150} height={150} className="mb-1" />
                                                )}
                                                <p className="text-2xl font-headline text-primary mb-2" style={{ fontSize: "2rem", fontFamily: "'Mea Culpa', cursive" }}>{item.time}</p>
                                                <h3 className="text-base font-body uppercase tracking-wider leading-tight">{item.title}</h3>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    
                                    {/* Paw prints trail */}
                                    {index < agendaItems.length - 1 && (
                                        <div className={cn(
                                            "absolute top-1/2 -translate-y-1/2 h-full flex flex-col justify-around",
                                            isEven ? "right-[-20px]" : "left-[-20px]"
                                        )}>
                                            {[1, 2, 3].map(pawIndex => (
                                                <div key={pawIndex} className={cn(
                                                    "transition-opacity duration-1000",
                                                     visibleSteps > index + (pawIndex * 0.2) ? 'opacity-100' : 'opacity-0'
                                                )}>
                                                     <Image
                                                        src={huella}
                                                        alt="Huella de perro"
                                                        width={30}
                                                        height={30}
                                                        className="opacity-60"
                                                        style={{ transform: `rotate(${isEven ? -20 + pawIndex * 5 : 20 - pawIndex * 5}deg) scaleX(${isEven ? 1 : -1})` }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Section>
    )
}
