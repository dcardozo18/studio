
"use client";

import Section from './Section';
import Script from 'next/script';

export default function RsvpForm() {

  return (
    <Section>
        <div className="relative text-[#634F44] font-body text-center rounded-lg overflow-hidden max-w-4xl mx-auto">
            <div className="px-2 md:px-6 pb-8 w-full">
                <h2 className="text-3xl font-headline uppercase tracking-widest mb-8">Confirmación de Asistencia</h2>
                
                <div className="w-full">
                    <iframe src="https://www.cognitoforms.com/f/yI8ZrDlxkU-0kw-C81yCMA/11" allow="payment" style={{border:0, width:'100%'}} height="755"></iframe>
                    <Script src="https://www.cognitoforms.com/f/iframe.js"></Script>
                </div>
            </div>
      </div>
    </Section>
  );
}
