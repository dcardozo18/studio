
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Section from './Section';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { submitMusicSuggestion } from "@/app/actions";
import { useState } from "react";

const musicSuggestionSchema = z.object({
  song: z.string().min(2, { message: "El nombre de la canción debe tener al menos 2 caracteres." }),
  artist: z.string().min(2, { message: "El nombre del artista debe tener al menos 2 caracteres." }),
});

type MusicSuggestionValues = z.infer<typeof musicSuggestionSchema>;

export default function MusicSuggestion() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const topFlowers = PlaceHolderImages.find(p => p.id === 'invitation-top-flowers');
  const bottomFlowers = PlaceHolderImages.find(p => p.id === 'invitation-bottom-flowers');

  const form = useForm<MusicSuggestionValues>({
    resolver: zodResolver(musicSuggestionSchema),
    defaultValues: {
      song: "",
      artist: "",
    },
  });

  async function onSubmit(data: MusicSuggestionValues) {
    setIsSubmitting(true);
    const result = await submitMusicSuggestion(data);
    setIsSubmitting(false);

    if (result.success) {
        toast({
            title: "¡Sugerencia recibida!",
            description: "Gracias por ayudarnos a crear la playlist perfecta.",
        });
        form.reset();
    } else {
        toast({
            variant: "destructive",
            title: "Error al enviar",
            description: result.message,
        });
    }
  }

  return (
    <Section>
        <div className="relative text-[#634F44] font-body text-center rounded-lg overflow-hidden max-w-2xl mx-auto">
            
            
            <div className="px-6 md:px-12 pb-8">
                <h2 className="text-2xl font-headline uppercase tracking-widest mb-4">Haznos bailar contigo</h2>
                <div className="text-sm italic space-y-2 max-w-md mx-auto">
                    <p>Queremos que la música hable también de ustedes, los que han hecho parte de nuestra historia.</p>
                    <p>Si hay una canción que no puede faltar en tu noche perfecta, cuéntanos cuál es.</p>
                    <p>Puede ser para bailar, dedicar o simplemente disfrutar.</p>
                </div>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left mt-8">
                        <FormField
                            control={form.control}
                            name="song"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">¿Qué canción quieres escuchar?</FormLabel>
                                    <FormControl>
                                        <Input className="bg-transparent border-0 border-b-2 border-primary/50 rounded-none focus-visible:ring-0 focus:border-primary" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="artist"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Intérprete o artista:</FormLabel>
                                    <FormControl>
                                        <Input className="bg-transparent border-0 border-b-2 border-primary/50 rounded-none focus-visible:ring-0 focus:border-primary" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg !mt-10" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Enviar Sugerencia'}
                        </Button>
                    </form>
                </Form>
            </div>

           
      </div>
    </Section>
  );
}
