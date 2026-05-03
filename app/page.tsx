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

      alert("Demande d'inscription envoyée ! On revient vers toi pour te confirmer ta participation, hâte de le voir sur le terrain ⚽");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      alert("Erreur lors de l'inscription. Vérifie ta connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="selection:bg-givors-red selection:text-white bg-zinc-950 text-white font-sans scroll-smooth">
      
      {/* HEADER (MENU DE NAVIGATION STICKY) */}
      <header className="fixed top-0 left-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo / Nom Asso */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-givors-red text-white skew-sport flex items-center justify-center font-black font-oswald text-xl group-hover:bg-givors-yellow group-hover:text-black transition-colors shadow-lg">
              OTN
            </div>
            <span className="font-oswald font-bold text-xl md:text-2xl tracking-wide uppercase hidden sm:block text-white group-hover:text-givors-yellow transition-colors">
              O Tours de Nous
            </span>
          </a>

          {/* Navigation PC */}
          <nav className="hidden md:flex items-center gap-8 font-oswald uppercase tracking-widest text-sm text-zinc-300">
            <a href="#about" className="hover:text-givors-yellow transition-colors">Le Tournoi</a>
            <a href="#partners" className="hover:text-givors-yellow transition-colors">Partenaires</a>
          </nav>

          {/* Bouton Action */}
          <a href="#register" className="bg-givors-blue px-6 py-3 font-oswald font-bold uppercase tracking-wider skew-sport hover:bg-white hover:text-givors-blue transition-colors text-white shadow-lg shadow-givors-blue/20">
            S'inscrire
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Dégradé légèrement bleuté/rouge pour casser le noir pur */}
        <div className="absolute inset-0 bg-gradient-to-br from-pitch-dark/90 via-pitch-dark/60 to-givors-blue/20 z-10" />
        <div className="absolute inset-0 bg-[url('/city.png')] bg-cover bg-center" />
        
        <div className="relative z-20 text-center px-4">
          <div className="inline-block bg-givors-red text-white font-oswald font-bold px-4 py-1 skew-sport mb-4 uppercase text-sm md:text-base shadow-[4px_4px_0px_0px_rgba(255,204,0,1)] border border-givors-red">
            Association O Tours De Nous
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-oswald font-black uppercase italic leading-[0.9] tracking-tighter drop-shadow-2xl">
            Tournoi des<br />
            <span className="text-givors-yellow drop-shadow-[0_0_15px_rgba(255,204,0,0.4)]">Quartiers</span>
          </h1>
          <p className="mt-6 font-oswald text-lg md:text-2xl tracking-[0.2em] uppercase font-bold text-white drop-shadow-md">
            Givors <span className="text-givors-blue">•</span> City-Stade <span className="text-givors-red">•</span> 2026
          </p>
        </div>
      </section>

      {/* SECTION EXPLICATION */}
      <section id="about" className="py-20 bg-gradient-to-b from-zinc-950 to-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-oswald text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
            Le Tournoi, <span className="text-givors-red">c'est quoi ?</span>
          </h2>
          <div className="max-w-3xl mx-auto bg-zinc-800/50 p-8 md:p-10 border-l-4 border-givors-yellow rounded shadow-xl backdrop-blur-sm">
            <p className="text-zinc-300 text-lg leading-relaxed text-left">
              Un tournoi de foot pour les jeunes de Givors, organisé par l'association <strong>O Tours De Nous</strong>. Rejoins-nous pour une journée de sport, de fun et de compétition amicale sur le City-Stade !<br/><br/>
              <span className="text-white font-bold">U8 à U13</span>, tous les quartiers sont invités à s'affronter dans une ambiance conviviale et festive.
              Une buvette sur place, des lots à gagner et surtout, la fierté de représenter ton quartier !<br/><br/>
              Les fonds collectés serviront à financer les activités de l'association et à faire vivre le quartier. 
              <strong className="text-givors-yellow block mt-4 text-xl">Alors, prêt à faire vibrer le City-Stade ? Inscris-toi vite, les places sont limitées !</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION PARTENAIRES */}
      <section id="partners" className="py-12 bg-givors-blue/10 border-y border-zinc-800">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <span className="text-givors-blue font-oswald font-bold uppercase tracking-widest text-sm mb-6">Nos Partenaires Officiels</span>
          <a href="https://www.eat-list.fr/givors-69700/restauration-rapide-4/bob-s-burger-207999" target="_blank" rel="noreferrer" className="group">
            <div className="bg-white p-2 rounded shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] group-hover:shadow-[8px_8px_0px_0px_rgba(229,37,53,1)] transition-all duration-300">
              <img 
                src="/bobs.jpg" 
                alt="Bob's Burger" 
                className="w-48 h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </a>
        </div>
      </section>

      {/* SECTION INSCRIPTION + FLYER */}
      <section id="register" className="py-24 bg-gradient-to-b from-zinc-900 to-pitch-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* GAUCHE : FORMULAIRE ENFANT */}
            <div className="w-full lg:w-1/2">
              <div className="inline-block bg-givors-yellow text-black font-oswald font-bold px-3 py-1 skew-sport mb-4 uppercase text-sm">
                Rejoins l'élite
              </div>
              <h2 className="font-oswald text-5xl md:text-6xl font-black uppercase italic text-white mb-2">Inscription <span className="text-givors-blue">Joueur</span></h2>
              <p className="text-zinc-400 mb-8 font-oswald tracking-widest uppercase border-b border-zinc-800 pb-4">Places limitées • U8 à U13</p>
              
              <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-950 p-8 border-t-4 border-givors-red shadow-2xl relative">
                
                {/* Infos Enfant */}
                <input type="text" name="enfant" required placeholder="NOM ET PRÉNOM DE L'ENFANT" className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 p-4 font-oswald text-lg focus:border-givors-red focus:ring-1 focus:ring-givors-red outline-none transition-all" />
                
                {/* Infos Parent */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="parent" required placeholder="NOM DU PARENT" className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 p-4 font-oswald text-lg focus:border-givors-red focus:ring-1 focus:ring-givors-red outline-none transition-all" />
                  <input type="tel" name="telephone" required placeholder="N° TÉLÉPHONE (WHATSAPP)" className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 p-4 font-oswald text-lg focus:border-givors-red focus:ring-1 focus:ring-givors-red outline-none transition-all" />
                </div>

                {/* Choix Sportifs */}
                <div className="grid grid-cols-2 gap-4">
                  <select name="quartier" required className="bg-zinc-900 border border-zinc-800 text-white p-4 font-oswald outline-none focus:border-givors-red focus:ring-1 focus:ring-givors-red appearance-none transition-all cursor-pointer">
                    <option value="default" disabled selected className="text-zinc-500">QUARTIER</option>
                    {quartiers.map(q => <option key={q.name} value={q.name}>{q.name}</option>)}
                  </select>
                  <select name="categorie" required className="bg-zinc-900 border border-zinc-800 text-white p-4 font-oswald outline-none focus:border-givors-red focus:ring-1 focus:ring-givors-red appearance-none transition-all cursor-pointer">
                    <option value="" disabled selected className="text-zinc-500">CATÉGORIE</option>
                    <option value="U8/U9/U10">U8/U9/U10</option>
                    <option value="U11/U12/U13">U11/U12/U13</option>
                  </select>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-givors-red py-6 font-oswald font-black text-2xl text-white uppercase skew-sport hover:bg-givors-yellow hover:text-black transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none translate-y-0 hover:translate-y-1">
                  {isSubmitting ? "ENVOI EN COURS..." : "VALIDER L'INSCRIPTION"}
                </button>
              </form>
            </div>

            {/* DROITE : LE FLYER */}
            <div className="w-full lg:w-1/2 flex justify-center pt-8 lg:pt-0">
              <div className="relative group overflow-hidden shadow-[15px_15px_0px_0px_rgba(0,102,204,1)] border-4 border-zinc-900 bg-black">
                <img 
                  src="/flyer2.png" 
                  alt="Flyer O Tours de Nous" 
                  className="max-w-full h-auto transition-transform duration-700 group-hover:scale-105 brightness-110 contrast-105 opacity-90 group-hover:opacity-100"
                />
                {/* Reflet brillant sur le flyer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-black text-center border-t border-zinc-900">
        <div className="flex justify-center gap-4 mb-4">
            <span className="w-2 h-2 bg-givors-red rounded-full"></span>
            <span className="w-2 h-2 bg-givors-blue rounded-full"></span>
            <span className="w-2 h-2 bg-givors-yellow rounded-full"></span>
        </div>
        <p className="text-zinc-600 font-oswald uppercase tracking-widest text-sm">
          © 2026 ASSOCIATION O TOURS DE NOUS - GIVORS
        </p>
      </footer>
    </main>
  );
}