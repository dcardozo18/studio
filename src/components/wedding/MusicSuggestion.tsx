
"use client";

import Section from './Section';
import Script from 'next/script';


export default function MusicSuggestion() {
  
  return (
    <Section>
        <div className="relative text-[#634F44] font-body text-center rounded-lg overflow-hidden max-w-2xl mx-auto">
            <div className="px-6 md:px-12 pb-8">
                <h2 className="text-2xl font-headline uppercase tracking-widest mb-4">Haznos bailar contigo</h2>
                <div className="text-sm italic space-y-2 max-w-md mx-auto mb-8">
                    <p>Queremos que la música hable también de ustedes, los que han hecho parte de nuestra historia.</p>
                    <p>Si hay una canción que no puede faltar en tu noche perfecta, cuéntanos cuál es.</p>
                    <p>Puede ser para bailar, dedicar o simplemente disfrutar.</p>
                </div>
                
                <iframe src="https://www.cognitoforms.com/f/yI8ZrDlxkU-0kw-C81yCMA/12" allow="payment" style={{border:0, width:'100%'}} height="440"></iframe>
                <Script src="https://www.cognitoforms.com/f/iframe.js"></Script>
            </div>
      </div>
    </Section>
  );
}
