import { useState, useEffect } from "react";
import { 
  Shield, 
  Menu, 
  X, 
  ArrowUp, 
  Heart, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  Globe,
  ArrowRight,
  BookmarkCheck,
  Calendar,
  Users,
  Eye,
  HeartHandshake,
  Sliders,
  BellOff,
  Terminal,
  Activity,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import verseLogo from "./assets/images/verse_logo_1781765082048.jpg";

import { 
  COMMUNITY_VALUES, 
  STATS, 
  COMMUNITY_RULES, 
  NEWCOMER_TIPS 
} from "./data";

import { ToastContainer, ToastMessage } from "./components/Toast";
import { StepsTracker } from "./components/StepsTracker";
import { ResourcesGrid } from "./components/ResourcesGrid";
import { FAQSection } from "./components/FaqSection";
import { SherpaHelpdesk } from "./components/SherpaHelpdesk";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Community Passport Name state
  const [passportName, setPassportName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("verse-passport-name");
      return saved || "";
    } catch {
      return "";
    }
  });

  const handleSetPassportName = (name: string) => {
    setPassportName(name);
    localStorage.setItem("verse-passport-name", name);
  };

  const showToast = (message: string, type: "success" | "info" | "party" = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Scroll details tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);

      // Track active section for navbar indicator
      const sections = ["hero", "overview", "onboarding", "rules", "resources", "faq", "helpdesk"];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const getValueIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-teal-400" };
    switch (iconName) {
      case "Heart": return <Heart {...props} />;
      case "HelpCircle": return <HelpCircle {...props} />;
      case "Sparkles": return <Sparkles {...props} />;
      case "BookOpen": return <BookOpen {...props} />;
      case "Globe": return <Globe {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const getTipIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-purple-400 scale-95" };
    switch (iconName) {
      case "Eye": return <Eye {...props} />;
      case "HeartHandshake": return <HeartHandshake {...props} />;
      case "Sliders": return <Sliders {...props} />;
      case "BellOff": return <BellOff {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07080d] text-gray-300 font-sans relative selection:bg-purple-600/35 selection:text-white">
      {/* Abstract celestial background glowing rings */}
      <div className="absolute top-0 inset-x-0 h-[650px] overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[120px] custom-glow-1" />
        <div className="absolute top-[10%] right-[15%] w-[400px] h-[400px] rounded-full bg-purple-900/10 blur-[100px] custom-glow-2" />
      </div>

      {/* STICKY TOP NAVBAR */}
      <nav id="sticky-header-navbar" className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrollPosition > 20 
          ? "bg-[#07080d]/90 backdrop-blur-md border-b border-gray-900/85 py-3 shadow-lg" 
          : "bg-transparent py-5 border-b border-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection("hero")} 
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-teal-400/50 rounded-lg p-1 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-teal-400 p-[1.5px] shadow-md group-hover:scale-105 transition-transform duration-300">
              <img 
                src={verseLogo} 
                alt="Verse Logo" 
                className="w-full h-full object-cover rounded-[10.5px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left">
              <span className="font-display font-black text-sm tracking-widest text-white uppercase block">
                VERSE
              </span>
              <span className="text-[9px] font-mono font-medium tracking-wide text-teal-400 uppercase leading-none block mt-0.5">
                Newcomer Hub
              </span>
            </div>
          </button>

          {/* Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { id: "overview", label: "Overview" },
              { id: "onboarding", label: "Start Here" },
              { id: "rules", label: "Guidelines" },
              { id: "resources", label: "Resources" },
              { id: "faq", label: "FAQ" },
              { id: "helpdesk", label: "Sherpa Buddy" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all tracking-wide ${
                  activeSection === link.id
                    ? "bg-purple-950/40 text-purple-300 shadow-sm border border-purple-900/35"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Utilities (Dynamic passport status & mobile drawer toggle) */}
          <div className="flex items-center gap-3">
            {passportName ? (
              <div className="hidden sm:flex items-center gap-2 bg-teal-950/20 border border-teal-500/20 rounded-full px-3 py-1 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse shrink-0" />
                <span className="font-mono text-[10px] text-teal-300 font-semibold uppercase tracking-wider">
                  Node: {passportName}
                </span>
              </div>
            ) : (
              <button
                onClick={() => scrollToSection("onboarding")}
                className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-900/50 text-purple-300 rounded-full px-3 py-1 text-xs hover:border-purple-500/50 transition-colors"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span className="font-mono text-[9px] text-purple-400 font-semibold tracking-wider">
                  Passport Offline
                </span>
              </button>
            )}

            {/* Mobile Nav Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-gray-800 text-gray-400 hover:text-white focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#07080d]/95 backdrop-blur-lg border-b border-gray-900/90 py-6 px-6 shadow-2xl flex flex-col gap-4 lg:hidden"
          >
            {[
              { id: "overview", label: "Community Overview" },
              { id: "onboarding", label: "How to Get Started" },
              { id: "rules", label: "Rules & Safety Guidelines" },
              { id: "resources", label: "Links & Resource Kits" },
              { id: "faq", label: "Frequently Asked Questions" },
              { id: "helpdesk", label: "Ask a Sherpa Companion" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-sm font-semibold text-gray-300 hover:text-white py-2 focus:outline-none border-b border-gray-900/40 last:border-0 flex items-center justify-between group"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}

            {passportName && (
              <div className="mt-2 bg-teal-950/20 border border-teal-500/20 rounded-xl p-3 text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span className="font-mono text-teal-300 font-semibold tracking-wider">
                  ACTIVE PASSPORT: {passportName}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST SYSTEM CONTAINER */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* HERO / WELCOME SECTION */}
      <header id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 max-w-5xl mx-auto px-4 md:px-8 text-center overflow-hidden select-none">
        <div className="space-y-6 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/40 rounded-full border border-purple-900/50">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span className="text-[10px] font-mono tracking-widest text-purple-300 font-bold uppercase">
              Welcome to the Frontier
            </span>
          </div>

          {/* Large brand logo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.15 }}
            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-tr from-purple-600 via-pink-500 to-teal-400 hover:rotate-6 transition-transform duration-300 shadow-2xl shadow-purple-950/20"
          >
            <div className="w-full h-full rounded-[14px] overflow-hidden">
              <img 
                src={verseLogo} 
                alt="Verse Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
            Welcome to the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-teal-300">
              Verse Community!
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-400 leading-relaxed">
            We are a cozy, decentralized network of creators, programmers, writers, and open-source advocates co-creating widgets, lore, and software tools. 
            No question is too simple. We speak plainly, support learning, and help every newcomer find their perfect interest circle instantly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3.5 pt-2 w-full sm:w-auto">
            <a
              href="https://t.me/GetVerse/387150"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-black font-extrabold text-xs tracking-wider uppercase py-4 px-8 rounded-xl shadow-lg shadow-teal-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              Start Here
              <ArrowRight className="w-4 h-4 text-black" />
            </a>
          </div>

          {/* Micro proof copy */}
          <div className="pt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500 font-mono">
            <span>● Offline-first Profile</span>
            <span>● Complete Beginner Safe</span>
            <span>● 100% Volunteer Nonprofit</span>
          </div>
        </div>
      </header>

      {/* CORE STATS HIGHLIGHT */}
      <section className="bg-[#0a0b10] border-y border-gray-900/80 py-10 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.id} className="text-center p-4 rounded-2xl bg-[#07080d]/40 border border-gray-900/30">
              <span className="font-display font-black text-2xl md:text-3.5xl text-white block">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-teal-400 mt-1 block">
                {stat.label}
              </span>
              <span className="text-[10px] text-gray-500 block mt-0.5">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <main id="overview" className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-12 select-none">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-teal-400 uppercase bg-teal-950/20 px-3 py-1 rounded-full border border-teal-900/30">
            Node Information Log
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white">
            What is the Verse?
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            We are an open collective built on kindness, joint construction, and zero gatekeeping. Here are the core pillars that stabilize our community coordinates:
          </p>
        </div>

        {/* Core Values grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {COMMUNITY_VALUES.map((val) => (
            <div 
              key={val.id} 
              className="bg-[#0b0c12]/80 border border-gray-800/60 rounded-2xl p-6 space-y-4 hover:border-gray-750 hover:bg-[#11121d]/40 transition-all group"
            >
              <div className="bg-[#12131a] w-12 h-12 rounded-xl flex items-center justify-center border border-gray-800/80 group-hover:scale-105 transition-transform">
                {getValueIcon(val.icon)}
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-gray-100 text-base md:text-lg leading-tight">
                  {val.title}
                </h4>
                <p className="text-xs text-gray-450 text-gray-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* HOW TO GET STARTED SECTION */}
      <section id="onboarding" className="bg-[#090a0f] border-t border-gray-900/70 py-20 relative overflow-hidden select-none">
        {/* Glow backdrop */}
        <div className="absolute right-[-20%] top-[10%] w-[500px] h-[550px] rounded-full bg-purple-900/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase bg-purple-950/20 px-3 py-1 rounded-full border border-purple-900/30">
              Interactive Guide
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white">
              How to Get Started
            </h2>
            <p className="text-sm text-gray-400">
              No pressure, no long manuals. Follow this step-by-step interactive tracker to craft your companion key, prepare a greeting draft, and download your newcomer starter kits.
            </p>
          </div>

          {/* Interactive Steps component */}
          <div className="max-w-3xl mx-auto">
            <StepsTracker 
              passportName={passportName}
              onSetPassportName={handleSetPassportName}
              showToast={showToast}
            />
          </div>
        </div>
      </section>

      {/* RULES AND SAFETY SECTION */}
      <section id="rules" className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-12 select-none">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-teal-400 uppercase bg-teal-950/20 px-3 py-1 rounded-full border border-teal-900/30">
            Ecosystem Standard
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white">
            Rules and Guidelines
          </h2>
          <p className="text-sm text-gray-400">
            We preserve space where everyone is welcome. Our lines are positive directives designed to lift and rehabilitate rather than gatekeep.
          </p>
        </div>

        {/* Guidelines Grid */}
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {COMMUNITY_RULES.map((rule) => (
            <div 
              key={rule.id} 
              className="bg-[#0b0c12]/80 border border-gray-800/60 rounded-2xl p-6 space-y-3 hover:bg-[#12131e]/50 transition-all"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-widest">
                  {rule.positiveTone}
                </span>
                <h4 className="font-display font-bold text-white text-base md:text-lg mt-1">
                  {rule.title}
                </h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {rule.fullDescription}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-gray-500 font-mono">
          Looking for our formal legal codes? Explore the complete{" "}
          <a 
            href="#full-conduct" 
            onClick={(e) => { e.preventDefault(); showToast("Conduct rules copied for offline reading. 📝", "info"); }} 
            className="text-purple-400 hover:text-purple-350 underline underline-offset-4"
          >
            Code of Conduct
          </a>
        </div>
      </section>

      {/* RESOURCES & STARTER KITS SECTION */}
      <section id="resources" className="bg-[#090a0f] border-t border-gray-900/80 py-20 relative select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase bg-purple-950/20 px-3 py-1 rounded-full border border-purple-900/30">
              Tool Chest Hub
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white">
              Useful Links & Resources
            </h2>
            <p className="text-sm text-gray-400">
              Bookmark resources directly to your screen dashboard in one click. Type keywords instantly to filter through our official wikis, repos, and lounges.
            </p>
          </div>

          {/* Interactive search and favorite resources grid */}
          <ResourcesGrid showToast={showToast} />
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section id="faq" className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-12 select-none">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-teal-400 uppercase bg-teal-950/20 px-3 py-1 rounded-full border border-teal-900/30">
            FAQ Desk
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-400">
            Have a question about what a circle is or how stuff works? Explore instant filtered answers or look up keywords directly.
          </p>
        </div>

        {/* Dynamic FAQ Accordion with Search */}
        <div className="max-w-3xl mx-auto">
          <FAQSection showToast={showToast} />
        </div>
      </section>

      {/* TIPS FOR NEW MEMBERS SECTION */}
      <section className="bg-[#090a0f] border-y border-gray-900/70 py-20 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase bg-purple-950/20 px-3 py-1 rounded-full border border-purple-900/30">
              Scribbled Advice
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white">
              Tips for New Members
            </h2>
            <p className="text-sm text-gray-400">
              Some quiet wisdom collected directly from travelers who came before you to protect your energy and time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {NEWCOMER_TIPS.map((tip) => (
              <div 
                key={tip.id} 
                className="bg-[#0b0c12]/80 border border-gray-850 border-gray-800/60 rounded-2xl p-5 flex gap-4 items-start hover:border-purple-900/60 transition-all"
              >
                <div className="p-2.5 bg-[#12131a] rounded-xl border border-gray-800 shrink-0 mt-0.5">
                  {getTipIcon(tip.icon)}
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-gray-200 text-sm md:text-base leading-tight">
                    {tip.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHERPA TELEGRAM HELPDESK SECTION */}
      <section id="helpdesk" className="max-w-5xl mx-auto px-4 md:px-8 pb-20 select-none">
        {/* Helpdesk simulator */}
        <SherpaHelpdesk passportName={passportName} showToast={showToast} />
      </section>

      {/* FLOATING BACK TO TOP */}
      {scrollPosition > 350 && (
        <button
          onClick={() => scrollToSection("hero")}
          className="fixed bottom-6 left-6 z-40 bg-teal-500 text-black p-3.5 rounded-full shadow-2xl hover:bg-teal-400 active:scale-95 transition-all text-xs font-mono font-bold flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-teal-400"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-4 h-4 text-black" />
          <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider">Top</span>
        </button>
      )}

      {/* FOOTER */}
      <footer className="border-t border-gray-901 border-gray-900 bg-[#040407] py-12 relative select-none">
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-purple-950/10 to-transparent opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Branding */}
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-400" />
              <span className="font-display font-black text-xs tracking-wider text-white uppercase">
                Welcome to Verse
              </span>
            </div>

            {/* Quick footer indices */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 font-mono">
              <button onClick={() => scrollToSection("overview")} className="hover:text-gray-300">Overview</button>
              <button onClick={() => scrollToSection("onboarding")} className="hover:text-gray-300">Getting Started</button>
              <button onClick={() => scrollToSection("rules")} className="hover:text-gray-300">Rules</button>
              <button onClick={() => scrollToSection("resources")} className="hover:text-gray-300">Resources</button>
              <button onClick={() => scrollToSection("faq")} className="hover:text-gray-300">FAQ</button>
            </div>
          </div>

          <div className="border-t border-gray-950/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600">
            <div>
              © 2026 Verse Network Association. All rights reserved. Registered nonprofit organization.
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse fill-rose-500 shrink-0" /> for Verse newcomers
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
