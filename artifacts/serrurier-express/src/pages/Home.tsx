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
  Award,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type TarifsCategory = 'Ouverture' | 'Réparation' | 'Installation' | 'Urgence';

const TARIFS_BADGE: Record<TarifsCategory, string> = {
  Ouverture: 'bg-blue-100 text-blue-800 border border-blue-200',
  Réparation: 'bg-green-100 text-green-800 border border-green-200',
  Installation: 'bg-purple-100 text-purple-800 border border-purple-200',
  Urgence: 'bg-slate-100 text-slate-700 border border-slate-200',
};

const TARIFS_FILTERS: Array<{ label: string; value: TarifsCategory | 'Toutes' }> = [
  { label: 'Toutes', value: 'Toutes' },
  { label: 'Ouverture', value: 'Ouverture' },
  { label: 'Réparation', value: 'Réparation' },
  { label: 'Installation', value: 'Installation' },
  { label: 'Urgence', value: 'Urgence' },
];

const TARIFS_DEFAULT_VISIBLE = 10;

const TARIFS_ROWS: { prestation: string; categorie: TarifsCategory; prix: string }[] = [
  { prestation: 'Ouverture porte simple claquée', categorie: 'Ouverture', prix: '110 € – 135 €' },
  { prestation: 'Ouverture porte simple fermée à clé', categorie: 'Ouverture', prix: '135 € – 180 €' },
  { prestation: 'Ouverture porte blindée claquée', categorie: 'Ouverture', prix: '110 € – 150 €' },
  { prestation: 'Ouverture porte blindée fermée à clé', categorie: 'Ouverture', prix: '135 € – 190 €' },
  { prestation: 'Clé cassée dans la serrure', categorie: 'Urgence', prix: '120 € – sur devis' },
  { prestation: 'Intervention après cambriolage', categorie: 'Urgence', prix: '120 € – sur devis' },
  { prestation: 'Fermeture provisoire (effraction)', categorie: 'Urgence', prix: '150 € – 250 €' },
  { prestation: 'Installation cylindre simple européen', categorie: 'Installation', prix: '110 € – 150 €' },
  { prestation: 'Installation cylindre blindé', categorie: 'Installation', prix: '150 € – sur devis' },
  { prestation: 'Installation serrure simple', categorie: 'Installation', prix: '150 € – 250 €' },
  { prestation: 'Installation serrure blindée 3 points', categorie: 'Installation', prix: '390 € – sur devis' },
  { prestation: 'Installation serrure blindée 5-7 points', categorie: 'Installation', prix: '700 € – sur devis' },
  { prestation: 'Installation serrure connectée', categorie: 'Installation', prix: '300 € – 600 €' },
  { prestation: 'Installation porte blindée', categorie: 'Installation', prix: '1 990 € – sur devis' },
  { prestation: 'Installation verrou simple', categorie: 'Installation', prix: '110 € – 190 €' },
  { prestation: 'Installation verrou haute sécurité', categorie: 'Installation', prix: '220 € – sur devis' },
  { prestation: 'Installation judas de porte', categorie: 'Installation', prix: '110 € – 190 €' },
  { prestation: 'Installation cornière anti-pince', categorie: 'Installation', prix: '180 € – 300 €' },
  { prestation: 'Installation gâche électrique', categorie: 'Installation', prix: '300 € – 600 €' },
  { prestation: 'Installation boîte à clé', categorie: 'Installation', prix: '160 € – 260 €' },
  { prestation: 'Réparation serrure simple', categorie: 'Réparation', prix: '120 € – sur devis' },
  { prestation: 'Réparation serrure blindée 3 points', categorie: 'Réparation', prix: '120 € – 200 €' },
  { prestation: 'Réparation cylindre simple européen', categorie: 'Réparation', prix: '80 € – 150 €' },
  { prestation: 'Réparation poignée de porte', categorie: 'Réparation', prix: '120 € – 210 €' },
  { prestation: 'Réparation verrou simple', categorie: 'Réparation', prix: '80 € – 150 €' },
  { prestation: 'Dégrippage de serrure', categorie: 'Réparation', prix: '130 € – 180 €' },
  { prestation: 'Ouverture boîte aux lettres', categorie: 'Ouverture', prix: '70 € – 110 €' },
  { prestation: 'Installation serrure boîte aux lettres', categorie: 'Installation', prix: '70 € – 110 €' },
  { prestation: 'Ouverture coffre-fort', categorie: 'Ouverture', prix: '159 € – sur devis' },
  { prestation: 'Ouverture porte de garage', categorie: 'Ouverture', prix: '135 € – sur devis' },
  { prestation: 'Ouverture portail extérieur', categorie: 'Ouverture', prix: '135 € – 190 €' },
];

const PHONE = '07 52 97 48 83';
const PHONE_TEL = 'tel:+33752974883';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');
  const [tarifsFilter, setTarifsFilter] = useState<TarifsCategory | 'Toutes'>('Toutes');
  const [tarifsExpanded, setTarifsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    if (service) {
      setPrefilledService(decodeURIComponent(service));
      const el = document.getElementById('contact');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, []);

  function handleReserver(service: string) {
    setPrefilledService(service);
    const el = document.getElementById('contact');
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  function handleCallbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (callbackPhone.trim()) {
      setCallbackSent(true);
    }
  }

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 selection:bg-[#c9a84c] selection:text-[#1a2744]">

      {/* 1. Sticky Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#1a2744] shadow-lg' : 'bg-[#1a2744]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="bg-[#c9a84c] p-2 rounded-lg">
                <Lock className="w-6 h-6 text-[#1a2744]" />
              </div>
              <div>
                <span className="text-white font-bold text-xl tracking-tight block leading-tight">CARASECU 86</span>
                <span className="text-[#c9a84c] text-xs font-medium tracking-wide">Serrurier — Vitrier</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: 'Nos services', href: '#nos-services' },
                { label: 'Tarifs', href: '#tarifs' },
                { label: "Zones d'intervention", href: '#zones-dintervention' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-slate-200 hover:text-[#c9a84c] font-medium transition-colors text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a href={PHONE_TEL}>
                <Button className="hidden md:flex bg-[#c9a84c] hover:bg-[#b09240] text-[#1a2744] font-bold gap-2 rounded-full px-6">
                  <Phone className="w-4 h-4" />
                  Appeler
                </Button>
              </a>
              <button
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
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
              {[
                { label: 'Nos services', href: '#nos-services' },
                { label: 'Tarifs', href: '#tarifs' },
                { label: "Zones d'intervention", href: '#zones-dintervention' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-[#c9a84c] hover:bg-slate-800 rounded-md"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-3 py-2">
                <a href={PHONE_TEL}>
                  <Button className="w-full bg-[#c9a84c] hover:bg-[#b09240] text-[#1a2744] font-bold gap-2 rounded-full">
                    <Phone className="w-4 h-4" />
                    Appeler
                  </Button>
                </a>
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
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Disponible 24h/24 – 7j/7
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Serrurier — Vitrier agréé, <br />
                <span className="text-[#c9a84c]">intervention rapide dans tout le département 86</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg leading-relaxed">
                Votre artisan serrurier de confiance. Intervention en urgence sans frais de
                déplacement cachés. Devis 100% gratuit avant toute intervention.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={PHONE_TEL}>
                  <Button className="bg-[#c9a84c] hover:bg-[#b09240] text-[#1a2744] font-bold text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] transition-all w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    Urgence – appeler
                  </Button>
                </a>
                <a href="#contact">
                  <Button
                    variant="outline"
                    className="border-2 border-white/40 text-white bg-transparent hover:bg-white/10 hover:border-white font-bold text-lg h-14 px-8 rounded-full transition-all w-full sm:w-auto"
                  >
                    Devis gratuit
                  </Button>
                </a>
              </div>
            </div>

            {/* Floating Status Card */}
            <div className="relative mx-auto w-full max-w-md lg:ml-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#002395] to-[#c9a84c] opacity-20 rounded-3xl blur-2xl transform -rotate-6" />
              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl relative shadow-2xl">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700">
                  <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-8 h-8 text-[#c9a84c]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Technicien local</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-slate-400 text-sm">Prêt à intervenir</p>
                    </div>
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
            {[
              { icon: <Clock className="w-5 h-5" />, label: 'Dépannage 24h/24 — 7j/7' },
              { icon: <FileText className="w-5 h-5" />, label: 'Devis gratuit' },
              { icon: <Award className="w-5 h-5" />, label: 'Garantie 10 ans' },
              { icon: <ShieldCheck className="w-5 h-5" />, label: 'Intervention sans dégâts' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-[#1a2744] font-semibold">
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Services Grid */}
      <section id="nos-services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#1a2744] mb-4">Nos domaines d'expertise</h2>
            <p className="text-slate-600 text-lg">
              Une équipe de serruriers qualifiés pour répondre à tous vos besoins de sécurité et
              d'urgence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<DoorOpen className="w-8 h-8" />}
              title="Ouvertures de portes"
              description="Ouverture de tout type de portes, intervention rapide sans dégâts"
            />
            <ServiceCard
              icon={<Shield className="w-8 h-8" />}
              title="Blindage de porte"
              description="Installation et renforcement de portes blindées toutes marques"
            />
            <ServiceCard
              icon={<Wrench className="w-8 h-8" />}
              title="Remplacement de vitrage"
              description="Remplacement rapide de vitrage cassé ou fissuré"
            />
            <ServiceCard
              icon={<ThumbsUp className="w-8 h-8" />}
              title="Réparation après effraction"
              description="Sécurisation et remise en état après cambriolage"
            />
            <ServiceCard
              icon={<Key className="w-8 h-8" />}
              title="Serrures toutes marques"
              description="Pose et remplacement de serrures, matériel de qualité garanti"
            />
            <ServiceCard
              icon={<Clock className="w-8 h-8" />}
              title="Dépannage d'urgence"
              description="Intervention 24h/24 et 7j/7, déplacement rapide"
            />
          </div>
        </div>
      </section>

      {/* 5. Certifications Band */}
      <section className="py-12 bg-slate-200 border-y border-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-opacity duration-500">
            {[
              { icon: <ShieldCheck className="w-10 h-10" />, label: 'Label A2P' },
              { icon: <Award className="w-10 h-10" />, label: 'Artisan certifié' },
              { icon: <Building2 className="w-10 h-10" />, label: 'Agréé assurances' },
              { icon: <FileText className="w-10 h-10" />, label: 'Devis normalisé' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 text-slate-700">
                {item.icon}
                <span className="font-bold text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5b. Tarifs */}
      <section id="tarifs" className="scroll-mt-20">
        {/* Sub-header */}
        <div className="bg-[#1a2744] py-14 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">Nos tarifs</h2>
            <p className="text-slate-300 text-lg">
              Prix TTC — déplacement, fournitures et nettoyage inclus.{' '}
              <a
                href={PHONE_TEL}
                className="text-[#c9a84c] hover:underline font-semibold"
              >
                Devis gratuit au {PHONE}.
              </a>
            </p>
          </div>
        </div>

        {/* Amber warning band */}
        <div className="bg-amber-50 border-b border-amber-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 text-amber-800 text-sm font-medium text-center">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
            <span>
              Une majoration tarifaire s'applique en soirée (20h–7h), le week-end et les jours fériés.
            </span>
          </div>
        </div>

        <div className="bg-slate-50 py-12">
          {/* Summary cards */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <DoorOpen className="w-6 h-6" />, label: 'Ouverture de porte', prix: '110 € – 190 €' },
                { icon: <Key className="w-6 h-6" />, label: 'Remplacement de cylindre', prix: '110 € – 150 €' },
                { icon: <Wrench className="w-6 h-6" />, label: 'Réparation de serrure', prix: '120 € – 300 €' },
                { icon: <Shield className="w-6 h-6" />, label: 'Porte blindée', prix: 'à partir de 1 990 €' },
              ].map((card) => (
                <div key={card.label} className="text-center p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-[#1a2744] mx-auto mb-4">
                    {card.icon}
                  </div>
                  <div className="text-lg font-black text-[#1a2744] mb-1">{card.prix}</div>
                  <div className="text-slate-500 text-sm font-medium">{card.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing table */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {TARIFS_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => { setTarifsFilter(f.value); setTarifsExpanded(false); }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    tarifsFilter === f.value
                      ? 'bg-[#1a2744] text-white border-[#1a2744]'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#1a2744] hover:text-[#1a2744]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Table */}
            {(() => {
              const filtered = tarifsFilter === 'Toutes' ? TARIFS_ROWS : TARIFS_ROWS.filter((r) => r.categorie === tarifsFilter);
              const visible = tarifsExpanded ? filtered : filtered.slice(0, TARIFS_DEFAULT_VISIBLE);
              const hasMore = filtered.length > TARIFS_DEFAULT_VISIBLE;
              return (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span>Prestation</span>
                    <span className="text-center w-32">Catégorie</span>
                    <span className="text-right w-36">Fourchette de prix</span>
                    <span className="text-right w-28">Action</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {visible.map((row, idx) => (
                      <div
                        key={idx}
                        className="grid md:grid-cols-[1fr_auto_auto_auto] gap-x-4 gap-y-2 px-6 py-4 items-center hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-medium text-slate-800 text-sm">{row.prestation}</span>
                        <span className="md:w-32 md:text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${TARIFS_BADGE[row.categorie]}`}>
                            {row.categorie}
                          </span>
                        </span>
                        <span className="md:w-36 md:text-right font-semibold text-[#1a2744] text-sm">{row.prix}</span>
                        <div className="md:w-28 md:text-right">
                          <Button
                            onClick={() => handleReserver(row.prestation)}
                            className="bg-[#c9a84c] hover:bg-[#b09240] text-[#1a2744] font-bold text-xs h-8 px-4 rounded-full"
                          >
                            Réserver
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {hasMore && (
                    <div className="px-6 py-4 border-t border-slate-100 flex justify-center">
                      <button
                        onClick={() => setTarifsExpanded(!tarifsExpanded)}
                        className="flex items-center gap-2 text-sm font-semibold text-[#1a2744] hover:text-[#c9a84c] transition-colors"
                      >
                        {tarifsExpanded ? (
                          <><ChevronUp className="w-4 h-4" />Réduire la liste</>
                        ) : (
                          <><ChevronDown className="w-4 h-4" />Voir tous les tarifs ({filtered.length - TARIFS_DEFAULT_VISIBLE} de plus)</>
                        )}
                      </button>
                    </div>
                  )}
                  <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Prix TTC — déplacement, main d'œuvre et nettoyage inclus. Tarifs observés sur le
                      marché français en 2025, fournis à titre indicatif. Un devis personnalisé vous
                      sera remis avant toute intervention.
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 6. Emergency Banner */}
      <section className="bg-[#ED2939] py-12 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Vous êtes bloqué dehors ?</h2>
              <p className="text-white/90 text-lg">
                Ne paniquez pas. Un serrurier est chez vous dans moins de 30 minutes.
              </p>
            </div>
            <a href={PHONE_TEL} className="shrink-0">
              <Button className="bg-white text-[#ED2939] hover:bg-slate-100 font-bold text-xl h-16 px-10 rounded-full shadow-xl hover:scale-105 transition-transform">
                <Phone className="w-6 h-6 mr-3" />
                {PHONE}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 7. Stats Row */}
      <section className="py-20 bg-white" id="tarifs">
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
            {[
              'Paris',
              'Boulogne-Billancourt',
              'Versailles',
              'Saint-Denis',
              'Nanterre',
              'Créteil',
              'Vincennes',
              'Montreuil',
              'Issy-les-Moulineaux',
              'Neuilly-sur-Seine',
              'Levallois-Perret',
              'Clichy',
            ].map((city) => (
              <span
                key={city}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm hover:border-[#002395] hover:text-[#002395] cursor-default transition-colors"
              >
                {city}
              </span>
            ))}
            <span className="px-4 py-2 bg-[#002395] text-white rounded-full text-sm font-medium shadow-sm cursor-default">
              + 42 communes
            </span>
          </div>
        </div>
      </section>

      {/* 10. Free Quote CTA */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-[#1a2744] rounded-3xl p-8 md:p-12 text-center bg-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-[#1a2744] mb-4">Demandez un devis gratuit</h2>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                Laissez-nous votre numéro, un conseiller technique vous rappelle dans les 15 minutes
                pour évaluer votre besoin.
              </p>
              {prefilledService && !callbackSent && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a2744]/5 border border-[#1a2744]/20 rounded-full text-sm font-medium text-[#1a2744] mb-6">
                  <Key className="w-4 h-4 text-[#c9a84c]" />
                  Service sélectionné : <span className="font-bold">{prefilledService}</span>
                </div>
              )}
              {callbackSent ? (
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <BadgeCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-lg font-semibold text-[#1a2744]">Demande envoyée !</p>
                  <p className="text-slate-500">Un conseiller vous rappellera dans les 15 minutes.</p>
                </div>
              ) : (
                <form
                  className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                  onSubmit={handleCallbackSubmit}
                >
                  <Input
                    type="tel"
                    placeholder="Votre numéro de téléphone"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    className="h-14 text-lg bg-slate-50 border-slate-300 focus-visible:ring-[#1a2744]"
                    required
                  />
                  <Button
                    type="submit"
                    className="h-14 px-8 text-lg font-bold bg-[#1a2744] text-white hover:bg-slate-800 rounded-lg shrink-0"
                  >
                    Être rappelé
                  </Button>
                </form>
              )}
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
                <span className="text-white font-bold text-xl tracking-tight">CARASECU 86</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                Artisan serrurier-vitrier, disponible 24h/24 et 7j/7. Ouvertures, blindage, remplacement de vitrage et réparation après effraction. Garantie 10 ans sur nos interventions.
              </p>
              <a href={PHONE_TEL}>
                <Button className="bg-[#c9a84c] hover:bg-[#b09240] text-[#1a2744] font-bold gap-2 rounded-full">
                  <Phone className="w-4 h-4" />
                  {PHONE}
                </Button>
              </a>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Prestations</h4>
              <ul className="space-y-3">
                {[
                  'Ouverture de porte',
                  'Changement serrure',
                  'Blindage de porte',
                  'Serrurier automobile',
                ].map((link) => (
                  <li key={link}>
                    <a href="#nos-services" className="hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Entreprise</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Tarifs', href: '#tarifs' },
                  { label: "Zone d'intervention", href: '#zones-dintervention' },
                  { label: 'Contact', href: '#contact' },
                  { label: 'Avis clients', href: '#' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:text-white transition-colors text-sm">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <div>© 2026 CARASECU 86. Tous droits réservés.</div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span>SIRET 789 811 924 00032</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-4 h-4" /> Certifié A2P
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Building2 className="w-4 h-4" /> Agréé assurances
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-300 transition-colors">
                Mentions légales
              </a>
              <a
                href="https://votre-site.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 px-3 py-1 rounded text-slate-400 hover:text-white transition-colors border border-slate-700 text-xs"
              >
                Développé par [Votre Nom]
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#c9a84c]/30 transition-all duration-300 group">
      <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-[#1a2744] mb-6 group-hover:scale-110 group-hover:bg-[#1a2744] group-hover:text-[#c9a84c] transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#1a2744] mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
      <a
        href="#contact"
        className="inline-flex items-center text-sm font-bold text-[#1a2744] hover:text-[#c9a84c] transition-colors"
      >
        En savoir plus <ChevronRight className="w-4 h-4 ml-1" />
      </a>
    </div>
  );
}

function StatCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
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

function ReviewCard({
  initials,
  name,
  city,
  quote,
}: {
  initials: string;
  name: string;
  city: string;
  quote: string;
}) {
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

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
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
