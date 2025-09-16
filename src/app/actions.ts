"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

// Define Zod schemas for validation
const rsvpFormSchema = z.object({
  guestName: z.string().min(2),
  attendance: z.enum(["attending", "not_attending", "not_sure"]),
  hasPlusOne: z.enum(["yes", "no"]),
  plusOneName: z.string().optional(),
  dietaryRestrictions: z.enum(["yes", "no"]),
  dietaryDetails: z.string().optional(),
  accommodation: z.enum(["yes", "no"]),
});

const musicSuggestionSchema = z.object({
  song: z.string().min(2),
  artist: z.string().min(2),
});

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const emailTo = "dcardozo18@gmail.com";

// Server Action for RSVP Form
export async function submitRsvp(data: z.infer<typeof rsvpFormSchema>) {
  try {
    const validatedData = rsvpFormSchema.parse(data);

    const { guestName, attendance, hasPlusOne, plusOneName, dietaryRestrictions, dietaryDetails, accommodation } = validatedData;

    const subject = `Nueva confirmación de asistencia: ${guestName}`;
    const textBody = `
      Ha llegado una nueva confirmación de asistencia para la boda:
      
      Nombre: ${guestName}
      Asistencia: ${attendance}
      Lleva acompañante: ${hasPlusOne === 'no' ? `Sí, ${plusOneName}` : 'No'}
      Restricciones alimentarias: ${dietaryRestrictions === 'yes' ? `Sí, ${dietaryDetails}` : 'No'}
      Necesita alojamiento: ${accommodation}
    `;

    await transporter.sendMail({
      from: `"Notificaciones Boda" <${process.env.SMTP_USER}>`,
      to: emailTo,
      subject: subject,
      text: textBody,
    });

    return { success: true, message: "¡Confirmación enviada con éxito!" };
  } catch (error) {
    console.error("Error al enviar la confirmación:", error);
    return { success: false, message: "Hubo un error al enviar la confirmación." };
  }
}

// Server Action for Music Suggestion Form
export async function submitMusicSuggestion(data: z.infer<typeof musicSuggestionSchema>) {
  try {
    const validatedData = musicSuggestionSchema.parse(data);
    const { song, artist } = validatedData;
    
    const subject = `Nueva sugerencia musical: ${song}`;
    const textBody = `
      Se ha recibido una nueva sugerencia musical para la playlist de la boda:
      
      Canción: ${song}
      Artista: ${artist}
    `;

    await transporter.sendMail({
      from: `"Notificaciones Boda" <${process.env.SMTP_USER}>`,
      to: emailTo,
      subject: subject,
      text: textBody,
    });

    return { success: true, message: "¡Sugerencia recibida!" };
  } catch (error) {
    console.error("Error al enviar la sugerencia musical:", error);
    return { success: false, message: "Hubo un error al enviar tu sugerencia." };
  }
}
