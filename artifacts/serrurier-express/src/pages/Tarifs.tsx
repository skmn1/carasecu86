import React, { useState, useEffect } from 'react';
import {
  Lock,
  Phone,
  Menu,
  X,
  AlertTriangle,
  DoorOpen,
  Key,
  Wrench,
  Shield,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PHONE = '01 23 45 67 89';

type Category = 'Ouverture' | 'Réparation' | 'Installation' | 'Urgence';

interface PricingRow {
  prestation: string;
  categorie: Category;
  prix: string;
}

const ALL_ROWS: PricingRow[] = [
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

const DEFAULT_VISIBLE = 10;

const CATEGORY_BADGE: Record<Category, string> = {
  Ouverture: 'bg-blue-100 text-blue-800 border border-blue-200',
  Réparation: 'bg-green-100 text-green-800 border border-green-200',
  Installation: 'bg-purple-100 text-purple-800 border border-purple-200',
  Urgence: 'bg-slate-100 text-slate-700 border border-slate-200',
};

const FILTERS: Array<{ label: string; value: Category | 'Toutes' }> = [
  { label: 'Toutes', value: 'Toutes' },
  { label: 'Ouverture', value: 'Ouverture' },
  { label: 'Réparation', value: 'Réparation' },
  { label: 'Installation', value: 'Installation' },
  { label: 'Urgence', value: 'Urgence' },
];

const SUMMARY_CARDS = [
  { icon: <DoorOpen className="w-6 h-6" />, label: 'Ouverture de porte', prix: '110 € – 190 €' },
  { icon: <Key className="w-6 h-6" />, label: 'Remplacement de cylindre', prix: '110 € – 150 €' },
  { icon: <Wrench className="w-6 h-6" />, label: 'Réparation de serrure', prix: '120 € – 300 €' },
  { icon: <Shield className="w-6 h-6" />, label: 'Porte blindée', prix: 'à partir de 1 990 €' },
];

const NAV_LINKS = [
  { label: 'Nos services', href: '/#nos-services' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: "Zones d'intervention", href: '/#zones-dintervention' },
  { label: 'Contact', href: '/#contact' },
];

export default function Tarifs() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Category | 'Toutes'>('Toutes');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filtered =
    activeFilter === 'Toutes'
      ? ALL_ROWS
      : ALL_ROWS.filter((r) => r.categorie === activeFilter);

  const visibleRows = expanded ? filtered : filtered.slice(0, DEFAULT_VISIBLE);
  const hasMore = filtered.length > DEFAULT_VISIBLE;

  function reserverHref(prestation: string) {
    return `/?service=${encodeURIComponent(prestation)}#contact`;
  }

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 selection:bg-[#c9a84c] selection:text-[#1a2744]">

      {/* Sticky Navigation — identical to Home */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#1a2744] shadow-lg' : 'bg-[#1a2744]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center gap-2">
              <div className="bg-[#c9a84c] p-2 rounded-lg">
                <Lock className="w-6 h-6 text-[#1a2744]" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">Serrurier Express</span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-medium transition-colors text-sm ${
                    item.href === '/tarifs'
                      ? 'text-[#c9a84c]'
                      : 'text-slate-200 hover:text-[#c9a84c]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a href={`tel:${PHONE.replace(/ /g, '')}`}>
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

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1a2744] border-t border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium hover:bg-slate-800 rounded-md ${
                    item.href === '/tarifs'
                      ? 'text-[#c9a84c]'
                      : 'text-slate-200 hover:text-[#c9a84c]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-3 py-2">
                <a href={`tel:${PHONE.replace(/ /g, '')}`}>
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

      {/* Page Header — dark navy, same as hero */}
      <section className="pt-32 pb-16 bg-[#1a2744] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos tarifs</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Prix TTC — déplacement, fournitures et nettoyage inclus.{' '}
            <a
              href={`tel:${PHONE.replace(/ /g, '')}`}
              className="text-[#c9a84c] hover:underline font-semibold"
            >
              Devis gratuit au {PHONE}.
            </a>
          </p>
        </div>
      </section>

      {/* Amber Warning Band */}
      <div className="bg-amber-50 border-y border-amber-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 text-amber-800 text-sm font-medium text-center">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
          <span>
            Une majoration tarifaire s'applique en soirée (20h–7h), le week-end et les jours fériés.
          </span>
        </div>
      </div>

      {/* Summary Cards — same card style as stats section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SUMMARY_CARDS.map((card) => (
              <div key={card.label} className="text-center p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-[#1a2744] mx-auto mb-4">
                  {card.icon}
                </div>
                <div className="text-lg font-black text-[#1a2744] mb-1">{card.prix}</div>
                <div className="text-slate-500 text-sm font-medium">{card.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => { setActiveFilter(f.value); setExpanded(false); }}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeFilter === f.value
                    ? 'bg-[#1a2744] text-white border-[#1a2744]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#1a2744] hover:text-[#1a2744]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Prestation</span>
              <span className="text-center w-32">Catégorie</span>
              <span className="text-right w-36">Fourchette de prix</span>
              <span className="text-right w-28">Action</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100">
              {visibleRows.map((row, idx) => (
                <div
                  key={idx}
                  className="grid md:grid-cols-[1fr_auto_auto_auto] gap-x-4 gap-y-2 px-6 py-4 items-center hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-800 text-sm">{row.prestation}</span>
                  <span className="md:w-32 md:text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_BADGE[row.categorie]}`}
                    >
                      {row.categorie}
                    </span>
                  </span>
                  <span className="md:w-36 md:text-right font-semibold text-[#1a2744] text-sm">
                    {row.prix}
                  </span>
                  <div className="md:w-28 md:text-right">
                    <a href={reserverHref(row.prestation)}>
                      <Button className="bg-[#c9a84c] hover:bg-[#b09240] text-[#1a2744] font-bold text-xs h-8 px-4 rounded-full">
                        Réserver
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Expand / Collapse */}
            {hasMore && (
              <div className="px-6 py-4 border-t border-slate-100 flex justify-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#1a2744] hover:text-[#c9a84c] transition-colors"
                >
                  {expanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Réduire la liste
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Voir tous les tarifs ({filtered.length - DEFAULT_VISIBLE} de plus)
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Table Footer Disclaimer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
              <p className="text-xs text-slate-400 leading-relaxed">
                Prix TTC — déplacement, main d'œuvre et nettoyage inclus. Tarifs observés sur le
                marché français en 2025, fournis à titre indicatif. Un devis personnalisé vous sera
                remis avant toute intervention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer — identical to Home */}
      <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#c9a84c] p-2 rounded-lg">
                  <Lock className="w-5 h-5 text-[#1a2744]" />
                </div>
                <span className="text-white font-bold text-xl tracking-tight">Serrurier Express</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                Intervention d'urgence en serrurerie 24h/24 et 7j/7. Artisans certifiés et tarifs
                transparents.
              </p>
              <a href={`tel:${PHONE.replace(/ /g, '')}`}>
                <Button className="bg-[#c9a84c] hover:bg-[#b09240] text-[#1a2744] font-bold gap-2 rounded-full">
                  <Phone className="w-4 h-4" />
                  {PHONE}
                </Button>
              </a>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Prestations</h4>
              <ul className="space-y-3">
                {['Ouverture de porte', 'Changement serrure', 'Blindage de porte', 'Serrurier automobile'].map(
                  (link) => (
                    <li key={link}>
                      <a href="/#nos-services" className="hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Entreprise</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Tarifs', href: '/tarifs' },
                  { label: "Zone d'intervention", href: '/#zones-dintervention' },
                  { label: 'Contact', href: '/#contact' },
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
            <div>© 2026 Serrurier Express. Tous droits réservés.</div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span>SIRET 123 456 789</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-slate-400">Certifié A2P</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-slate-400">Agréé assurances</span>
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
