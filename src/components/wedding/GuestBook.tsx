"use client";

import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import Section from './Section';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type Message = {
  name: string;
  message: string;
  date: string;
};

const initialMessages: Message[] = [
    {
        name: "Aunt Maria",
        message: "Wishing you both a lifetime of love and happiness. We are so excited to celebrate with you!",
        date: "A few days ago"
    },
    {
        name: "John & Sarah",
        message: "Congratulations, Ricardo and Rocio! Your love is an inspiration. Can't wait for the big day!",
        date: "Last week"
    }
];

export default function GuestBook() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newMessage: Message = {
      ...values,
      date: "Just now",
    };
    setMessages([newMessage, ...messages]);
    form.reset();
    toast({
      title: "Message Posted!",
      description: "Thank you for your warm wishes.",
    });
  }

  return (
    <Section animationDelay='400ms'>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-headline text-primary">Guest Book</h2>
        <p className="text-muted-foreground mt-2 text-lg">Share your well wishes for the happy couple.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <Card className="bg-card/80 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="text-primary" />
              Leave a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your wishes, memories, or congratulations..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Post Message</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4">
            <h3 className="text-2xl font-headline text-primary mb-4">Wishes & Congratulations</h3>
            <div className="max-h-[500px] overflow-y-auto pr-4 space-y-4">
                {messages.map((msg, index) => (
                    <Card key={index} className="bg-card/50 animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                        <CardContent className="p-4">
                            <p className="text-foreground italic">"{msg.message}"</p>
                            <div className="flex justify-between items-center mt-3">
                                <p className="font-bold text-primary">{msg.name}</p>
                                <p className="text-xs text-muted-foreground">{msg.date}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </Section>
  );
}
