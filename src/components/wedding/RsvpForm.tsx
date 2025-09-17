
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import Section from './Section';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { submitRsvp } from '@/app/actions';
import { useState } from "react";

const rsvpFormSchema = z.object({
  guestName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  attendance: z.enum(["attending", "not_attending", "not_sure"], {
    required_error: "Por favor selecciona una opción.",
  }),
  hasPlusOne: z.enum(["yes", "no"], {
    required_error: "Por favor selecciona una opción.",
  }),
  plusOneName: z.string().optional(),
  dietaryRestrictions: z.enum(["yes", "no"], {
    required_error: "Por favor selecciona una opción.",
  }),
  dietaryDetails: z.string().optional(),
  accommodation: z.enum(["yes", "no"], {
    required_error: "Por favor selecciona una opción.",
  }),
})
.superRefine((data, ctx) => {
  if (data.hasPlusOne === 'no' && (!data.plusOneName || data.plusOneName.trim().length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "El nombre del acompañante debe tener al menos 2 caracteres.",
      path: ["plusOneName"],
    });
  }
  if (data.dietaryRestrictions === 'yes' && (!data.dietaryDetails || data.dietaryDetails.trim().length === 0)) {
    ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Por favor, especifica las preferencias o alergias.",
        path: ["dietaryDetails"],
    });
  }
});


type RsvpFormValues = z.infer<typeof rsvpFormSchema>;

export default function RsvpForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const topFlowers = PlaceHolderImages.find(p => p.id === 'invitation-top-flowers');
  const bottomFlowers = PlaceHolderImages.find(p => p.id === 'invitation-bottom-flowers');

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      guestName: "",
      plusOneName: "",
      dietaryDetails: "",
    },
  });

  const watchHasPlusOne = form.watch("hasPlusOne");
  const watchDietary = form.watch("dietaryRestrictions");


  async function onSubmit(data: RsvpFormValues) {
    setIsSubmitting(true);
    const result = await submitRsvp(data);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "¡Confirmación enviada!",
        description: "Gracias por confirmar tu asistencia. ¡Nos vemos en la boda!",
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

  async function handleTestSubmit() {
    const testData: RsvpFormValues = {
        guestName: "Invitado de Prueba",
        attendance: "attending",
        hasPlusOne: "no",
        plusOneName: "Acompañante de Prueba",
        dietaryRestrictions: "yes",
        dietaryDetails: "Pescetariano",
        accommodation: "yes",
    };
    await onSubmit(testData);
  }

  return (
    <Section>
        <div className="relative text-[#634F44] font-body text-center rounded-lg overflow-hidden max-w-2xl mx-auto">
            
            
            <div className="px-6 md:px-12 pb-8">
                <h2 className="text-3xl font-headline uppercase tracking-widest mb-8">Confirmación de Asistencia</h2>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                        <FormField
                            control={form.control}
                            name="guestName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="font-headline text-lg">Nombre de invitado:</FormLabel>
                                <FormControl>
                                    <Input className="bg-transparent border-0 border-b-2 border-primary/50 rounded-none focus-visible:ring-0 focus:border-primary" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="attendance"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel className="font-headline text-lg">¿Vas a asistir a nuestra boda?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-2"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="attending" />
                                            </FormControl>
                                            <FormLabel className="font-normal">SI, ¡ALLÁ ESTARÉ!</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="not_attending" />
                                            </FormControl>
                                            <FormLabel className="font-normal">NO PODRÉ</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="not_sure" />
                                            </FormControl>
                                            <FormLabel className="font-normal">NO ESTOY SEGURO</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <p className="text-sm text-muted-foreground pt-1">(Plazo 20 NOV para confirmación)</p>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="hasPlusOne"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel className="font-headline text-lg">¿La invitación que recibiste es solo para ti?</FormLabel>
                                 <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex items-center space-x-4"
                                    >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="no" />
                                        </FormControl>
                                        <FormLabel className="font-normal">NO</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="yes" />
                                        </FormControl>
                                        <FormLabel className="font-normal">SI</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        {watchHasPlusOne === 'no' && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="plusOneName"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="font-headline text-lg">Nombre de tu acompañante:</FormLabel>
                                        <p className="text-sm text-muted-foreground">(Solo si fue incluido en tu invitación).</p>
                                        <FormControl>
                                            <Input className="bg-transparent border-0 border-b-2 border-primary/50 rounded-none focus-visible:ring-0 focus:border-primary" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        
                        {watchHasPlusOne === 'yes' && (
                            <p className="text-sm text-muted-foreground !mt-2">
                                Nuestra boda ha sido pensada y organizada con mucho amor, cuidando cada detalle para quienes han sido parte de nuestra historia. Si tu invitación fue para ti únicamente, te pedimos que no incluyas acompañantes adicionales. Sabemos que lo vas a disfrutar muchísimo así, y estaremos felices de compartir contigo ese día.
                            </p>
                        )}


                        <FormField
                            control={form.control}
                            name="dietaryRestrictions"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel className="font-headline text-lg">¿Tienes alguna preferencia alimentaria o alergia que debamos tener en cuenta?</FormLabel>
                                 <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex items-center space-x-4"
                                    >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="yes" />
                                        </FormControl>
                                        <FormLabel className="font-normal">SI</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="no" />
                                        </FormControl>
                                        <FormLabel className="font-normal">NO</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         {watchDietary === 'yes' && (
                             <FormField
                                control={form.control}
                                name="dietaryDetails"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="font-headline text-lg">¿Cuál?</FormLabel>
                                    <FormControl>
                                        <Textarea className="bg-transparent border-2 border-primary/50 rounded-md focus-visible:ring-0 focus:border-primary" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                         )}


                        <FormField
                            control={form.control}
                            name="accommodation"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel className="font-headline text-lg">¿Te gustaría recibir información de alojamiento?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex items-center space-x-4"
                                    >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="yes" />
                                        </FormControl>
                                        <FormLabel className="font-normal">SI</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="no" />
                                        </FormControl>
                                        <FormLabel className="font-normal">NO</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col sm:flex-row gap-4 !mt-12">
                            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Enviar Confirmación'}
                            </Button>
                            <Button type="button" size="lg" variant="outline" className="w-full text-lg" onClick={handleTestSubmit} disabled={isSubmitting}>
                                Prueba de Envío
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>


      </div>
    </Section>
  );
}

    