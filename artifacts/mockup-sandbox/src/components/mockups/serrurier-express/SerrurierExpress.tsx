import React, { useState, useEffect } from 'react';
import {
  Lock,
  Phone,
  Clock,
  Shield,
  Star,
  Car,
  Building2,
  ChevronRight,
  Check,
  MapPin,
  Menu,
  X,
  Key,
  ShieldCheck,
  FileText,
  BadgeCheck,
  DoorOpen,
  Wrench,
  ThumbsUp,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SerrurierExpress() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 selection:bg-[#c9a84c] selection:text-[#1a2744]">
      {/* 1. Sticky Navigation Bar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#1a2744] shadow-lg' : 'bg-[#1a2744]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-[#c9a84c] p-2 rounded-lg">
                <Lock className="w-6 h-6 text-[#1a2744]" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Serrurier Express
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {['Nos services', 'Tarifs', "Zones d'intervention", 'Contact'].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-slate-200 hover:text-[#c9a84c] font-medium transition-colors text-sm"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Button className="hidden md:flex bg-[#c9a84c] hover:bg-[#b09240] text-[#1a2744] font-bold gap-2 rounded-full px-6">
                <Phone className="w-4 h-4" />
                Appeler
              </Button>
              <button
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {/* French Tricolor Stripe */}
        <div className="h-[5px] w-full flex">
          <div className="h-full w-1/3 bg-[#002395]" />
          <div className="h-full w-1/3 bg-white" />
          <div className="h-full w-1/3 bg-[#ED2939]" />
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1a2744] border-t border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Nos services', 'Tarifs', "Zones d'intervention", 'Contact'].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-[#c9a84c] hover:bg-slate-800 rounded-md"
                  >
                    {item}
                  </a>
                )
              )}
              <div className="px-3 py-2">
                <Button className="w-full bg-[#c9a84c] hover:bg-[#b09240] text-[#1a2744] font-bold gap-2 rounded-full">
                  <Phone className="w-4 h-4" />
                  Appeler
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="pt-32 pb-20 bg-[#1a2744] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-medium mb-6 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Disponible 24h/24 – 7j/7
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Serrurier agréé, <br />
                <span className="text-[#c9a84c]">intervention rapide</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg leading-relaxed">
                Votre artisan serrurier de confiance. Intervention en urgence sans frais de déplacement cachés. Devis 100% gratuit avant toute intervention.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#c9a84c] hover:bg-[#b09240] text-[#1a2744] font-bold text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] transition-all">
                  <Phone className="w-5 h-5 mr-2" />
                  Urgence – appeler
                </Button>
                <Button variant="outline" className="border-slate-500 text-slate-900 bg-white hover:bg-slate-100 hover:text-slate-900 font-bold text-lg h-14 px-8 rounded-full transition-all">
                  Devis gratuit
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:ml-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#002395] to-[#c9a84c] opacity-20 rounded-3xl blur-2xl transform -rotate-6" />
              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl relative shadow-2xl">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700">
                  <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-8 h-8 text-[#c9a84c]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Technicien local</h3>
                    <p className="text-slate-400 text-sm">Prêt à intervenir</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#c9a84c]" />
                      <span className="font-medium text-slate-200">Arrivée estimée</span>
                    </div>
                    <span className="font-bold text-xl text-white">~25 min</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-[#c9a84c] fill-[#c9a84c]" />
                      <span className="font-medium text-slate-200">Note clients</span>
                    </div>
                    <span className="font-bold text-xl text-white">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust Bar */}
      <section className="bg-[#c9a84c] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-[#1a2744] font-semibold">
              <BadgeCheck className="w-5 h-5" />
              <span>Artisan certifié A2P</span>
            </div>
            <div className="flex items-center gap-2 text-[#1a2744] font-semibold">
              <Clock className="w-5 h-5" />
              <span>Urgence 24h/24</span>
            </div>
            <div className="flex items-center gap-2 text-[#1a2744] font-semibold">
              <FileText className="w-5 h-5" />
              <span>Devis gratuit & transparent</span>
            </div>
            <div className="flex items-center gap-2 text-[#1a2744] font-semibold">
              <ShieldCheck className="w-5 h-5" />
              <span>Prise en charge assurance</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Grid */}
      <section id="nos-services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#1a2744] mb-4">Nos domaines d'expertise</h2>
            <p className="text-slate-600 text-lg">
              Une équipe de serruriers qualifiés pour répondre à tous vos besoins de sécurité et d'urgence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<DoorOpen className="w-8 h-8" />}
              title="Ouverture de porte"
              description="Porte claquée ou verrouillée, nous l'ouvrons sans détruire votre serrure 9 fois sur 10."
            />
            <ServiceCard 
              icon={<Key className="w-8 h-8" />}
              title="Changement de serrure"
              description="Remplacement suite à un vol, une perte de clés ou pour améliorer votre sécurité."
            />
            <ServiceCard 
              icon={<Car className="w-8 h-8" />}
              title="Serrurier automobile"
              description="Ouverture de véhicules toutes marques sans dommages à la carrosserie."
            />
            <ServiceCard 
              icon={<Building2 className="w-8 h-8" />}
              title="Locaux professionnels"
              description="Solutions de contrôle d'accès et de haute sécurité pour les entreprises."
            />
            <ServiceCard 
              icon={<Shield className="w-8 h-8" />}
              title="Blindage de porte"
              description="Renforcement de votre porte existante pour résister aux tentatives d'effraction."
            />
            <ServiceCard 
              icon={<Lock className="w-8 h-8" />}
              title="Sécurisation"
              description="Fermeture provisoire après cambriolage et installation de systèmes anti-intrusion."
            />
          </div>
        </div>
      </section>

      {/* 5. Certifications Band */}
      <section className="py-12 bg-slate-200 border-y border-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-10 h-10 text-slate-700" />
              <span className="font-bold text-slate-700">Label A2P</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award className="w-10 h-10 text-slate-700" />
              <span className="font-bold text-slate-700">Artisan certifié</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Building2 className="w-10 h-10 text-slate-700" />
              <span className="font-bold text-slate-700">Agréé assurances</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FileText className="w-10 h-10 text-slate-700" />
              <span className="font-bold text-slate-700">Devis normalisé</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Emergency Banner */}
      <section className="bg-[#ED2939] py-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Vous êtes bloqué dehors ?</h2>
              <p className="text-white/90 text-lg">Ne paniquez pas. Un serrurier est chez vous dans moins de 30 minutes.</p>
            </div>
            <Button className="bg-white text-[#ED2939] hover:bg-slate-100 font-bold text-xl h-16 px-10 rounded-full shadow-xl hover:scale-105 transition-transform shrink-0">
              <Phone className="w-6 h-6 mr-3" />
              01 23 45 67 89
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Stats Row */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="25 min" label="Délai moyen" icon={<Clock className="w-6 h-6" />} />
            <StatCard value="20 ans" label="D'expérience" icon={<Award className="w-6 h-6" />} />
            <StatCard value="15 000+" label="Interventions" icon={<Wrench className="w-6 h-6" />} />
            <StatCard value="4,9/5" label="Note clients" icon={<ThumbsUp className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      {/* 8. Customer Reviews */}
      <section className="py-20 bg-[#1a2744] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ils nous ont fait confiance</h2>
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 text-[#c9a84c] fill-[#c9a84c]" />
              ))}
            </div>
            <p className="text-slate-400">Plus de 500 avis vérifiés sur Google et Trustpilot</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ReviewCard 
              initials="JP" 
              name="Jean P." 
              city="Paris 15e"
              quote="Intervention rapide un dimanche soir. Le serrurier a été très pro, le prix était annoncé d'avance et respecté. Je recommande vivement !"
            />
            <ReviewCard 
              initials="ML" 
              name="Marie L." 
              city="Lyon 3e"
              quote="Porte claquée avec les clés à l'intérieur. Ouverte en 5 minutes avec une radio, sans rien casser. Très honnête et rassurant."
            />
            <ReviewCard 
              initials="SD" 
              name="Sophie D." 
              city="Marseille 8e"
              quote="Suite à une tentative de cambriolage, l'équipe a sécurisé ma porte dans la nuit et installé une nouvelle serrure A2P le lendemain."
            />
          </div>
        </div>
      </section>

      {/* 9. Service Zones */}
      <section id="zones-dintervention" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MapPin className="w-12 h-12 text-[#002395] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#1a2744] mb-8">Zones d'intervention</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Paris', 'Boulogne-Billancourt', 'Versailles', 'Saint-Denis', 'Nanterre', 'Créteil', 'Vincennes', 'Montreuil', 'Issy-les-Moulineaux', 'Neuilly-sur-Seine', 'Levallois-Perret', 'Clichy'].map((city) => (
              <span key={city} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm hover:border-[#002395] hover:text-[#002395] cursor-default transition-colors">
                {city}
              </span>
            ))}
            <span className="px-4 py-2 bg-[#002395] text-white rounded-full text-sm font-medium shadow-sm cursor-default">
              + 42 communes
            </span>
          </div>
        </div>
      </section>

      {/* 10. Free Quote CTA Strip */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-[#1a2744] rounded-3xl p-8 md:p-12 text-center bg-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-[#1a2744] mb-4">Demandez un devis gratuit</h2>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                Laissez-nous votre numéro, un conseiller technique vous rappelle dans les 15 minutes pour évaluer votre besoin.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  type="tel" 
                  placeholder="Votre numéro de téléphone" 
                  className="h-14 text-lg bg-slate-50 border-slate-300 focus-visible:ring-[#1a2744]"
                />
                <Button className="h-14 px-8 text-lg font-bold bg-[#1a2744] text-white hover:bg-slate-800 rounded-lg shrink-0">
                  Être rappelé
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#c9a84c] p-2 rounded-lg">
                  <Lock className="w-5 h-5 text-[#1a2744]" />
                </div>
                <span className="text-white font-bold text-xl tracking-tight">
                  Serrurier Express
                </span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                Intervention d'urgence en serrurerie 24h/24 et 7j/7. Artisans certifiés et tarifs transparents.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Prestations</h4>
              <ul className="space-y-3">
                {['Ouverture de porte', 'Changement serrure', 'Blindage de porte', 'Serrure connectée'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Entreprise</h4>
              <ul className="space-y-3">
                {['Tarifs', 'Zone d\'intervention', 'Contact', 'Avis clients'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <div>© 2026 Serrurier Express. Tous droits réservés.</div>
            <div className="flex items-center gap-4">
              <span>SIRET 123 456 789</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-slate-400"><ShieldCheck className="w-4 h-4" /> Certifié A2P</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-slate-400"><Building2 className="w-4 h-4" /> Agréé assurances</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-300">Mentions légales</a>
              <a href="https://votre-site.dev" className="bg-slate-800 px-3 py-1 rounded text-slate-400 hover:text-white transition-colors border border-slate-700">
                Développé par [Votre Nom]
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#c9a84c]/30 transition-all duration-300 group">
      <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-[#1a2744] mb-6 group-hover:scale-110 group-hover:bg-[#1a2744] group-hover:text-[#c9a84c] transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#1a2744] mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
      <a href="#" className="inline-flex items-center text-sm font-bold text-[#1a2744] hover:text-[#c9a84c] transition-colors">
        En savoir plus <ChevronRight className="w-4 h-4 ml-1" />
      </a>
    </div>
  );
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="text-center p-6">
      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-[#1a2744] mx-auto mb-4">
        {icon}
      </div>
      <div className="text-3xl font-black text-[#1a2744] mb-1">{value}</div>
      <div className="text-slate-500 font-medium">{label}</div>
    </div>
  );
}

function ReviewCard({ initials, name, city, quote }: { initials: string; name: string; city: string; quote: string }) {
  return (
    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative mt-6">
      <div className="absolute -top-6 left-8 w-12 h-12 bg-[#c9a84c] rounded-full flex items-center justify-center text-[#1a2744] font-bold text-lg border-4 border-[#1a2744]">
        {initials}
      </div>
      <div className="flex justify-end gap-1 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-4 h-4 text-[#c9a84c] fill-[#c9a84c]" />
        ))}
      </div>
      <p className="text-slate-300 italic mb-6 leading-relaxed">"{quote}"</p>
      <div className="flex justify-between items-center text-sm">
        <span className="font-bold text-white">{name}</span>
        <span className="text-slate-400">{city}</span>
      </div>
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
