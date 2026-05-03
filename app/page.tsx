"use client";
import React, { useState } from 'react';

const quartiers = [
  { name: "THOREZ", bg: "bg-givors-blue" },
  { name: "LES PLAINES", bg: "bg-givors-red" },
  { name: "LES VERNES", bg: "bg-givors-yellow" },
  { name: "BANS", bg: "bg-white" }
];

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      date_inscription: new Date().toLocaleString('fr-FR'),
      enfant: formData.get('enfant'),
      parent: formData.get('parent'),
      telephone: formData.get('telephone'),
      quartier: formData.get('quartier'),
      categorie: formData.get('categorie'),
    };

    try {
    const GOOGLE_WEBHOOK_URL = process.env.NEXT_PUBLIC_GOOGLE_WEBHOOK_URL;
    console.log("Envoi des données au webhook Google Sheets :", data);

  if (!GOOGLE_WEBHOOK_URL) {
    console.error("URL du Webhook manquante");
    return;
  }

  await fetch(GOOGLE_WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

      alert("Demande d'inscription envoyée !On rien vers toi pour te confirmer ta participation, hâte de le voir sur le terrain ⚽");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      alert("Erreur lors de l'inscription. Vérifie ta connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="selection:bg-givors-red selection:text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-pitch-dark/60 z-10" />
        <div className="absolute inset-0 bg-[url('/city.png')] bg-cover bg-center" />
        
        <div className="relative z-20 text-center px-4">
          <div className="inline-block bg-givors-red text-white font-oswald font-bold px-4 py-1 skew-sport mb-4 uppercase text-sm md:text-base drop-shadow-md">
            Association O Tours De Nous
          </div>
          {/* Correction de la taille ici : text-5xl sur mobile, text-7xl sur PC (au lieu de 7xl/9xl) */}
          <h1 className="text-5xl md:text-7xl font-oswald font-black uppercase italic leading-[0.9] tracking-tighter drop-shadow-2xl">
            Tournoi des<br />
            <span className="text-givors-yellow">Quartiers</span>
          </h1>
          {/* Correction du sous-titre : un peu plus petit et plus proche du titre */}
          <p className="mt-6 font-oswald text-lg md:text-xl tracking-[0.2em] uppercase font-light drop-shadow-md">
            Givors • City-Stade • 2026
          </p>
        </div>
      </section>

      <section className="py-12 bg-zinc-900 border-y border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-oswald text-4xl font-black uppercase italic text-givors-red mb-4">Le Tournoi des Quartiers, c'est quoi ?</h2>
          <p className="text-zinc-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Un tournoi de foot pour les jeunes de Givors, organisé par l'association O Tours De Nous. Rejoins-nous pour une journée de sport, de fun et de compétition amicale sur le City-Stade !
             U8 à U13, tous les quartiers sont invités à s'affronter dans une ambiance conviviale et festive.
             Une buvette  sur place, des lots à gagner et surtout, la fierté de représenter ton quartier !
             Les fonds collectés serviront à financer les activités de l'association et à faire vivre le quartier.
              Alors, prêt à faire vibrer le City-Stade ? Inscris-toi vite, les places sont limitées !
          </p>
        </div>
      </section>

      {/* SECTION PARTENAIRES */}
      <section className="py-12 bg-zinc-900 border-y border-zinc-800">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <span className="text-zinc-500 font-oswald uppercase tracking-widest text-sm mb-6">Nos Partenaires Officiels</span>
       
          <a href="https://www.eat-list.fr/givors-69700/restauration-rapide-4/bob-s-burger-207999" target="_blank" rel="noreferrer" className="grayscale hover:grayscale-0 transition-all">
                <img 
                  src="/bobs.jpg" 
                  alt="bobs burger" 
                  className="w-48 h-auto object-contain transition-transform duration-500 group-hover:scale-105 rounded"
                />
          </a>
        </div>
      </section>

      {/* SECTION INSCRIPTION + FLYER */}
      <section id="register" className="py-24 bg-pitch-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* GAUCHE : FORMULAIRE ENFANT */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-oswald text-5xl font-black uppercase italic text-givors-red mb-2">Inscription Joueur</h2>
              <p className="text-zinc-400 mb-8 font-oswald tracking-widest uppercase">Places limitées • U8 à U13</p>
              
              <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900 p-8 rounded-sm border border-zinc-800 shadow-2xl">
                
                {/* Infos Enfant */}
                <input type="text" name="enfant" required placeholder="NOM ET PRÉNOM DE L'ENFANT" className="w-full bg-zinc-800 border border-zinc-700 p-4 font-oswald text-lg focus:border-givors-yellow outline-none" />
                
                {/* Infos Parent */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="parent" required placeholder="NOM DU PARENT" className="w-full bg-zinc-800 border border-zinc-700 p-4 font-oswald text-lg focus:border-givors-yellow outline-none" />
                  <input type="tel" name="telephone" required placeholder="N° TÉLÉPHONE (WHATSAPP)" className="w-full bg-zinc-800 border border-zinc-700 p-4 font-oswald text-lg focus:border-givors-yellow outline-none" />
                </div>

                {/* Choix Sportifs */}
                <div className="grid grid-cols-2 gap-4">
                  <select name="quartier" required className="bg-zinc-800 border border-zinc-700 p-4 font-oswald outline-none focus:border-givors-yellow appearance-none">
                    <option value="">QUARTIER</option>
                    {quartiers.map(q => <option key={q.name} value={q.name}>{q.name}</option>)}
                  </select>
                  <select name="categorie" required className="bg-zinc-800 border border-zinc-700 p-4 font-oswald outline-none focus:border-givors-yellow appearance-none">
                    <option value="">CATÉGORIE</option>
                    <option value="U8/U9/U10">U8/U9/U10</option>
                    <option value="U11/U12/U13">U11/U12/U13</option>
                  </select>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-givors-blue py-5 font-oswald font-black text-2xl uppercase skew-sport hover:bg-givors-red transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? "ENVOI EN COURS..." : "VALIDER L'INSCRIPTION"}
                </button>
              </form>
            </div>

            {/* DROITE : LE FLYER */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative group overflow-hidden rounded-lg shadow-2xl border-4 border-zinc-800">
                <img 
                  src="/flyer2.png" 
                  alt="Flyer O Tours de Nous" 
                  className="max-w-full h-auto transition-transform duration-500 group-hover:scale-105 brightness-110 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-zinc-600 font-oswald uppercase tracking-tighter">
        © 2026 ASSOCIATION O TOURS DE NOUS - GIVORS
      </footer>
    </main>
  );
}