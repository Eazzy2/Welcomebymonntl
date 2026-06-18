import React, { useState } from "react";
import { 
  CheckCircle,
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  ExternalLink,
  ClipboardCheck,
  Twitter
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PassportGenerator } from "./PassportGenerator";

interface StepsTrackerProps {
  passportName: string;
  onSetPassportName: (name: string) => void;
  showToast: (message: string, type: "success" | "info" | "party") => void;
}

const HELLO_TEMPLATES = [
  {
    label: "Creative Creator",
    text: "Hey everyone! 👋 I'm [Name]. I am super passionate about creative design, writing lore, and visual world-building. I joined the Verse to connect with other writers/artists and collaborate on cool open-source widgets. Excited to fill along and learn!"
  },
  {
    label: "Curious Developer",
    text: "Hello Verse team! 💻 I'm [Name], a web developer looking to contribute to open source toolkits. I'm keen on studying the SDK codebase and helping build widgets or cleaning up documentation. Feel free to ping me if there are tiny issues to grab!"
  },
  {
    label: "Enthusiastic Learner",
    text: "Hi everyone! ✨ I'm [Name]. I don't write code or design yet — I'm a complete beginner, but I love reading sci-fi and exploring community hubs. I wanted an inclusive space to ask questions and learn step-by-step. Happy to meet you all!"
  }
];

export const StepsTracker: React.FC<StepsTrackerProps> = ({ 
  passportName, 
  onSetPassportName, 
  showToast 
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("verse-completed-steps");
      return saved ? JSON.parse(saved) : passportName ? [1] : [];
    } catch {
      return passportName ? [1] : [];
    }
  });

  const [activeStep, setActiveStep] = useState<number>(passportName ? 2 : 1);
  const [helloTemplateIdx, setHelloTemplateIdx] = useState(0);
  const [customHelloText, setCustomHelloText] = useState("");
  const [copiedHello, setCopiedHello] = useState(false);

  const toggleStep = (stepId: number) => {
    let updated: number[];
    if (completedSteps.includes(stepId)) {
      updated = completedSteps.filter((id) => id !== stepId);
      showToast(`Marked Step ${stepId} as incomplete.`, "info");
    } else {
      updated = [...completedSteps, stepId];
      showToast(`Fantastic! Step ${stepId} completed! 🎉`, "success");
    }
    setCompletedSteps(updated);
    localStorage.setItem("verse-completed-steps", JSON.stringify(updated));
  };

  const handlePassportSuccess = (name: string) => {
    onSetPassportName(name);
    if (!completedSteps.includes(1)) {
      const updated = [...completedSteps, 1];
      setCompletedSteps(updated);
      localStorage.setItem("verse-completed-steps", JSON.stringify(updated));
    }
    showToast(`Passport issued to ${name}! Welcome onboard. 🎫`, "party");
    setActiveStep(2); // Auto-advance to next step
  };

  const copyHelloToClipboard = () => {
    const template = HELLO_TEMPLATES[helloTemplateIdx].text;
    const resolvedName = passportName || "Atlas";
    const textToCopy = customHelloText || template.replace("[Name]", resolvedName);
    
    navigator.clipboard.writeText(textToCopy);
    setCopiedHello(true);
    showToast("Greeting draft copied to clipboard! Paste it in #say-hello on Discord. 📋", "success");
    
    // Automatically flag step as complete if not done
    if (!completedSteps.includes(3)) {
      toggleStep(3);
    }
    setTimeout(() => setCopiedHello(false), 3000);
  };



  const steps = [
    {
      id: 1,
      name: "Unlock Your Digital Passport",
      brief: "The first step is to join the Verse ecosystem where people from different regions meet.",
      component: (
        <div className="mt-4">
          <PassportGenerator 
            onSuccess={handlePassportSuccess} 
            savedName={passportName} 
          />
        </div>
      )
    },
    {
      id: 2,
      name: "Step Behind the Verse Gate (Twitter’s Hub)",
      brief: "Head inside our thriving Twitter coordinate space to connect with other builders.",
      component: (
        <div className="mt-4 bg-[#12131a] rounded-2xl border border-gray-800 p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-2">
              <h5 className="font-display font-bold text-white text-lg">Landing Coordinates</h5>
              <p className="text-sm text-gray-400">
                Our main Twitter hub hosts community updates, shared spaces, and custom threads. Connect with other creators and stay updated on the frontier.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-mono text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded-md border border-purple-900/40">#VerseEcosystem</span>
                <span className="text-[11px] font-mono text-teal-400 bg-teal-950/40 px-2 py-0.5 rounded-md border border-teal-900/40">#Updates</span>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-900/40">#GlobalCommunity</span>
              </div>
            </div>
            
            <div className="w-full md:w-auto shrink-0 flex flex-col gap-2">
              <a 
                href="https://verse.bitcoin.com/" 
                target="_blank" 
                rel="noreferrer noopener"
                onClick={() => {
                  if (!completedSteps.includes(2)) {
                    toggleStep(2);
                  }
                }}
                className="bg-[#1DA1F2] hover:bg-[#0c85d0] text-white text-xs font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                Launch Twitter’s Hub
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => toggleStep(2)}
                className="border border-gray-800 text-gray-400 hover:text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all"
              >
                {completedSteps.includes(2) ? "Reset step status" : "Skip/Mark completed manually"}
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      name: "Cast Your First Greeting",
      brief: "Prepare a warm, custom introduction draft to copy-paste into our Discord #say-hello room.",
      component: (
        <div className="mt-4 bg-[#12131a] rounded-2xl border border-gray-800 p-6 space-y-6">
          <div className="space-y-2">
            <h5 className="font-display font-semibold text-white text-base">Hello Draft Builder</h5>
            <p className="text-sm text-gray-400">
              Not sure how to introduce yourself? Pick a starter blueprint personality that best matches your vibe, then adjust it to fit.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {HELLO_TEMPLATES.map((tpl, i) => (
              <button
                key={tpl.label}
                onClick={() => {
                  setHelloTemplateIdx(i);
                  setCustomHelloText(""); // reset override
                }}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                  helloTemplateIdx === i && !customHelloText
                    ? "bg-purple-950/45 border-purple-500/80 text-white font-medium"
                    : "bg-[#181922] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300"
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <textarea
              value={customHelloText || HELLO_TEMPLATES[helloTemplateIdx].text.replace("[Name]", passportName || "Atlas")}
              onChange={(e) => setCustomHelloText(e.target.value)}
              rows={4}
              maxLength={400}
              className="w-full bg-[#181922] border border-gray-800 rounded-xl p-4 text-sm text-gray-200 font-sans focus:outline-none focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/80 transition-all resize-none"
            />
            <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
              <span>{Math.min(400, (customHelloText || HELLO_TEMPLATES[helloTemplateIdx].text.replace("[Name]", passportName || "Atlas")).length)} / 400 characters</span>
              <span>Name populated: {passportName || "Atlas (default)"}</span>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={copyHelloToClipboard}
              className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-black font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              {copiedHello ? (
                <>
                  <ClipboardCheck className="w-4 h-4 text-black" />
                  Draft Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-black" />
                  Copy Draft Greeting
                </>
              )}
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Accordion Steps List */}
      <div className="space-y-3">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isOpen = activeStep === step.id;

          return (
            <div 
              key={step.id} 
              className={`rounded-2xl border transition-all ${
                isOpen 
                  ? "bg-[#161722]/60 border-purple-500/25 shadow-lg" 
                  : "bg-[#0b0c12]/80 border-gray-800/60 hover:border-gray-700 hover:bg-[#11121c]/40"
              }`}
            >
              {/* Box Header */}
              <button
                onClick={() => setActiveStep(isOpen ? 0 : step.id)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-teal-400 rounded-t-2xl"
              >
                <div className="flex items-center gap-4 flex-1 pr-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent expanding collapse
                      toggleStep(step.id);
                    }}
                    className="shrink-0 group focus:outline-none"
                    title={isCompleted ? "Mark incomplete" : "Mark complete"}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-teal-400 hover:text-teal-300 transition-colors" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-650 text-gray-500 group-hover:text-teal-400 transition-colors" />
                    )}
                  </button>
                  
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 tracking-wider block uppercase">
                      Step-0{step.id} {isCompleted && "• Completed"}
                    </span>
                    <h5 className={`font-display font-bold text-sm md:text-base leading-snug mt-0.5 ${
                      isCompleted ? "text-gray-400 line-through decoration-teal-500/30" : "text-white"
                    }`}>
                      {step.name}
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                      {step.brief}
                    </p>
                  </div>
                </div>

                <div className="text-gray-500 shrink-0 pl-1">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Box Expansion Panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-gray-900/60 pt-2">
                      {step.component}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
