import React, { useState } from "react";
import { Award, Shield, Sparkles, Wand2, RefreshCw, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface PassportGeneratorProps {
  onSuccess: (name: string) => void;
  savedName: string;
}

const INTERESTS = [
  { value: "Builder / Dev", label: "💻 Code & Build", desc: "Open source code, widget architecture, SDKs" },
  { value: "Visual Designer", label: "🎨 UI & Artistry", desc: "User interfaces, illustrations, icons" },
  { value: "Lore Writer", label: "✍️ Lore & Copy", desc: "Documentation, storytelling, translations" },
  { value: "Community Sherpa", label: "🤝 Welcome & Host", desc: "Answering questions, orientation mentoring" },
  { value: "General Explorer", label: "🚀 General Curiosity", desc: "Learning paths, interest circle hopping" }
];

const THEMES = [
  { id: "teal", label: "Teal Nebula", bg: "from-teal-600 to-indigo-900", border: "border-teal-400", accent: "text-teal-300" },
  { id: "purple", label: "Cosmic Amethyst", bg: "from-purple-600 to-pink-900", border: "border-purple-400", accent: "text-purple-300" },
  { id: "coral", label: "Solar Flare", bg: "from-rose-500 to-amber-900", border: "border-rose-400", accent: "text-rose-300" },
  { id: "emerald", label: "Aurora Borealis", bg: "from-emerald-500 to-cyan-900", border: "border-emerald-400", accent: "text-emerald-300" }
];

export const PassportGenerator: React.FC<PassportGeneratorProps> = ({ onSuccess, savedName }) => {
  const [name, setName] = useState(savedName || "");
  const [interest, setInterest] = useState("General Explorer");
  const [themeId, setThemeId] = useState("teal");
  const [passportId, setPassportId] = useState(() =>`V-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [generated, setGenerated] = useState(!!savedName);

  const selectedTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setGenerated(true);
    onSuccess(name.trim());
  };

  const handleRegenerate = () => {
    setPassportId(`V-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setGenerated(false);
  };

  // Generate a mock binary pattern matching the passport ID for a retro look
  const getMatrixPattern = () => {
    const segments = passportId.split("-");
    const num = parseInt(segments[segments.length - 1]) || 4040;
    const binary = num.toString(2).padStart(12, "0");
    return binary.split("").map((b) => b === "1");
  };

  const matrix = getMatrixPattern();

  return (
    <div id="passport-generator-card" className="bg-[#12131a] rounded-2xl border border-gray-800 p-6 md:p-8 relative overflow-hidden shadow-2xl">
      {/* Decorative ambient spots */}
      <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gradient-to-br ${selectedTheme.bg} opacity-20 blur-3xl pointer-events-none`} />
      
      <div className="grid md:grid-cols-12 gap-8 items-start relative z-10">
        {/* Step Customizer */}
        <div className="md:col-span-6 space-y-5">
          <div>
            <span className="text-teal-400 font-mono text-xs font-semibold tracking-wider uppercase bg-teal-950/40 px-2.5 py-1 rounded-full border border-teal-800/20">
              Interactive Blueprint
            </span>
            <h4 className="text-2xl font-display font-bold text-white mt-2">
              Unlock who you’re
            </h4>
            <div className="text-sm text-gray-400 mt-3 space-y-2.5 leading-relaxed">
              <p>
                The first step is to join the Verse ecosystem where people from different regions meet and make our something meaningful. No matter who you’re whether you’re new to Web3, or you’re a Pro , the community welcomes all.
              </p>
              <p>
                Here in the verse ecosystem, we teach, we learn so that we can all grow together.
              </p>
              <p className="text-teal-400 font-medium">
                Dont hesitate to join and enjoy the benefits now.
              </p>
            </div>
          </div>

          {!generated ? (
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label htmlFor="passport-name-input" className="block text-xs font-semibold tracking-wider text-gray-400 uppercase mb-1.5 font-mono">
                  Your Explorer Name / Call Sign
                </label>
                <input
                  id="passport-name-input"
                  type="text"
                  required
                  maxLength={24}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Atlas, Sparky, Jane Doe"
                  className="w-full bg-[#181922] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-400 uppercase mb-1.5 font-mono">
                  Primary Interest Code
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                  {INTERESTS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setInterest(item.value)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all flex justify-between items-center ${
                        interest === item.value
                          ? "bg-purple-950/20 border-purple-500/55 text-white"
                          : "bg-[#181922] border-gray-800/60 text-gray-400 hover:border-gray-700"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-gray-200">{item.label}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{item.desc}</div>
                      </div>
                      {interest === item.value && (
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-400 uppercase mb-1.5 font-mono">
                  Aura Palette Accent
                </label>
                <div className="flex gap-3">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setThemeId(theme.id)}
                      className={`w-7 h-7 rounded-full border-2 focus:outline-none transition-all ${
                        themeId === theme.id ? "scale-110 border-white ring-2 ring-purple-600" : "border-transparent"
                      } bg-gradient-to-r ${theme.bg}`}
                      title={theme.label}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-purple-950/45 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Wand2 className="w-4 h-4" />
                Initialize Community Passport
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-purple-950/10 border border-purple-900/40 rounded-xl p-4 text-xs text-gray-300">
                <p className="font-semibold text-purple-400 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Passport Active!
                </p>
                Successfully logged in local browser memory. You have unlocked access indicators and starter chest contents!
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleRegenerate}
                  className="flex-1 bg-[#181922] border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800 text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Customize Profile
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Passport Preview (The Token) */}
        <div className="md:col-span-6 flex justify-center">
          <motion.div
            layoutId="passport-visual"
            className={`w-full max-w-[340px] aspect-[1.58/1] rounded-2xl bg-gradient-to-br ${selectedTheme.bg} p-[1.5px] shadow-2xl relative overflow-hidden select-none`}
            initial={{ rotateY: -15, rotateX: 5 }}
            animate={{ rotateY: 0, rotateX: 0 }}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {/* Gloss shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-40 mix-blend-overlay rotate-12 transform scale-150" />
            
            <div className="w-full h-full bg-[#0d0d12]/95 rounded-[14.5px] p-4 flex flex-col justify-between relative overflow-hidden text-white">
              {/* Card top branding */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4.5 h-4.5 text-white" />
                    <span className="font-display font-extrabold text-[12px] tracking-widest text-white uppercase">
                      VERSE NETWORK
                    </span>
                  </div>
                  <span className="text-[7.5px] font-mono tracking-widest text-gray-500 uppercase mt-0.5 block">
                    Digital Passport Credential
                  </span>
                </div>
                {/* Visual authenticity stamp */}
                <div className={`w-6 h-6 rounded-full border border-dashed ${selectedTheme.border} opacity-50 flex items-center justify-center`}>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${selectedTheme.bg} blur-[1.5px]`} />
                </div>
              </div>

              {/* Card Mid: User Details */}
              <div className="grid grid-cols-12 gap-2 my-1">
                <div className="col-span-8 space-y-2">
                  <div>
                    <div className="text-[7.5px] font-mono uppercase text-gray-500 tracking-wider">
                      Authorized Citizen Label
                    </div>
                    <div className="text-sm font-display font-semibold tracking-wide text-white overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                      {name || "Awaiting Signer..."}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <div className="text-[7.5px] font-mono uppercase text-gray-500 tracking-wider">
                        Primary Code
                      </div>
                      <div className={`text-[10px] font-mono font-bold ${selectedTheme.accent} whitespace-nowrap overflow-hidden`}>
                        {interest}
                      </div>
                    </div>
                    <div>
                      <div className="text-[7.5px] font-mono uppercase text-gray-500 tracking-wider">
                        Ecosystem Node Code
                      </div>
                      <div className="text-[10px] font-mono font-bold text-gray-300">
                        {passportId}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cyber Matrix Code block */}
                <div className="col-span-4 flex items-center justify-end">
                  <div className="bg-[#12131a] border border-gray-800/80 rounded-lg p-1.5 grid grid-cols-4 gap-[2px] w-[58px] h-[58px]">
                    {matrix.map((fill, i) => (
                      <div
                        key={i}
                        className={`rounded-[1.5px] transition-all duration-500 ${
                          fill
                            ? `bg-gradient-to-br ${selectedTheme.bg}`
                            : "bg-gray-900"
                        }`}
                      />
                    ))}
                    {/* Fixed points for scanner look */}
                    <div className="rounded-[1.5px] bg-white absolute top-0 left-0 w-1.5 h-1.5 opacity-0" />
                  </div>
                </div>
              </div>

              {/* Card Bottom Panel */}
              <div className="flex justify-between items-end border-t border-gray-905/60 pt-2 text-[7.5px] font-mono text-gray-400">
                <div className="flex gap-4">
                  <div>
                    <span className="text-gray-600 uppercase block">Emission Stamp</span>
                    <span className="text-xs font-semibold text-gray-200 mt-0.5 block tracking-wide">June 2026</span>
                  </div>
                  <div>
                    <span className="text-gray-600 uppercase block">Clearance</span>
                    <span className="text-xs font-semibold text-yellow-400/90 mt-0.5 block tracking-wider flex items-center gap-0.5">
                      <Award className="w-2.5 h-2.5" /> LEVEL 01
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-600 block">SYSTEM STATUS</span>
                  <span className="text-[9px] text-teal-400 font-semibold uppercase tracking-wider animated animate-pulse">
                    ● AUTHENTICATED
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
