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
    const htmlBody = `
      <h2 style="color: #333;">Nueva Confirmación de Asistencia</h2>
      <p>Ha llegado una nueva confirmación de asistencia para la boda de Ricardo & Rocio.</p>
      <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
        <tr style="background-color: #f2f2f2;">
          <th style="text-align: left; padding: 8px;">Campo</th>
          <th style="text-align: left; padding: 8px;">Respuesta</th>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>Nombre</strong></td>
          <td style="padding: 8px;">${guestName}</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>Asistencia</strong></td>
          <td style="padding: 8px;">${attendance}</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>¿Lleva acompañante?</strong></td>
          <td style="padding: 8px;">${hasPlusOne === 'yes' ? 'Sí' : 'No'}</td>
        </tr>
        ${hasPlusOne === 'yes' && plusOneName ? `
        <tr>
          <td style="padding: 8px;"><strong>Nombre del acompañante</strong></td>
          <td style="padding: 8px;">${plusOneName}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px;"><strong>¿Restricciones alimentarias?</strong></td>
          <td style="padding: 8px;">${dietaryRestrictions === 'yes' ? 'Sí' : 'No'}</td>
        </tr>
        ${dietaryRestrictions === 'yes' && dietaryDetails ? `
        <tr>
          <td style="padding: 8px;"><strong>Detalles de la restricción</strong></td>
          <td style="padding: 8px;">${dietaryDetails}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px;"><strong>¿Necesita alojamiento?</strong></td>
          <td style="padding: 8px;">${accommodation}</td>
        </tr>
      </table>
    `;

    await transporter.sendMail({
      from: `"Notificaciones Boda" <${process.env.SMTP_USER}>`,
      to: emailTo,
      subject: subject,
      html: htmlBody,
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
    const htmlBody = `
      <h2 style="color: #333;">Nueva Sugerencia Musical</h2>
      <p>Se ha recibido una nueva sugerencia musical para la playlist de la boda.</p>
      <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
        <tr style="background-color: #f2f2f2;">
          <th style="text-align: left; padding: 8px;">Campo</th>
          <th style="text-align: left; padding: 8px;">Respuesta</th>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>Canción</strong></td>
          <td style="padding: 8px;">${song}</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>Artista</strong></td>
          <td style="padding: 8px;">${artist}</td>
        </tr>
      </table>
    `;

    await transporter.sendMail({
      from: `"Notificaciones Boda" <${process.env.SMTP_USER}>`,
      to: emailTo,
      subject: subject,
      html: htmlBody,
    });

    return { success: true, message: "¡Sugerencia recibida!" };
  } catch (error) {
    console.error("Error al enviar la sugerencia musical:", error);
    return { success: false, message: "Hubo un error al enviar tu sugerencia." };
  }
}
