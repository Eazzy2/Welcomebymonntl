import React, { useState } from "react";
import { Mail, Send, Sparkles, User, HelpCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SherpaHelpdeskProps {
  passportName: string;
  showToast: (msg: string, type: "success" | "info" | "party") => void;
}

export const SherpaHelpdesk: React.FC<SherpaHelpdeskProps> = ({ passportName, showToast }) => {
  const [name, setName] = useState(passportName || "");
  const [topic, setTopic] = useState("Getting Started");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Open the Google Forms link immediately to bypass browser popup block
    try {
      window.open("https://forms.gle/pU1M8dnixfdDsNXZ9", "_blank", "noopener,noreferrer");
    } catch (err) {
      console.warn("Popup blocked, fallback active", err);
    }

    setSubmitting(true);

    // Simulate community host reviewing in real-time
    setTimeout(() => {
      setSubmitting(false);
      showToast("Question log drafted & opening Google Forms! 🚀", "success");
      
      const resolvedName = name.trim() || passportName || "Fellow Explorer";
      
      let advisor = "Sarah (Sherpa Lead Guide)";
      let adviceLines = [
        "First of all, welcome to the Verse! We are absolutely thrilled you are here.",
        "Your question about how to begin is super common. Please don't worry about being perfect. Every single one of us started right where you are.",
        "The fastest coordinates to sort this out are to hop into our main Discord server (linked in Resources) and head directly to #arrival-gate. We keep active crew standing by 24/7 to welcome you and direct you to the right projects!"
      ];

      if (topic === "Which Circle to Choose") {
        advisor = "Marcus (Creator Circle Lead)";
        adviceLines = [
          `Hey ${resolvedName}! Marcus here. Looking into interest circles is a beautiful step.`,
          "Our circles aren't exclusive clubs. You don't need any registration paper. I highly suggest jumping into the Interface (#ui-and-design) or Writing (#lore-and-docs) loops in Discord just to watch them chat.",
          "You can change circles anytime. Try picking whichever topic makes you look twice!"
        ];
      } else if (topic === "No Coding Background") {
        advisor = "Aria (Community Lore Director)";
        adviceLines = [
          `A hearty hello ${resolvedName}! Aria here, and I'm a writer myself!`,
          "I want to reassure you: we hold deep respect for non-coders. Our community wiki, design boards, translation projects, are 100% powered by writers, listeners, artists, and event helpers.",
          "You do not need to write a single line of script to make people's day here. Check out the Lore Circle on your starter checklist, say hello, and let's get you set up with a non-technical pilot project!"
        ];
      } else if (topic === "Technical/SDK Issues") {
        advisor = "Liam (Technical Node Maintainer)";
        adviceLines = [
          `Greetings ${resolvedName}, Liam here. Let's look at getting your local system running.`,
          "The most direct way to get SDK answers is to file a tiny ticket in the GitHub monorepo (linked below) or post your error log directly in #dev-support.",
          "We love debugging errors side-by-side with newcomers! No query is too tiny. Make sure you copy paste your raw terminal output so we can inspect it together."
        ];
      }

      setResponse({
        advisor,
        lines: adviceLines,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setText("");
    }, 1500);
  };

  const resetForm = () => {
    setResponse(null);
  };

  return (
    <div className="bg-[#12131a] rounded-2xl border border-gray-800 p-6 md:p-8 relative overflow-hidden shadow-2xl">
      <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-gradient-to-tr from-teal-500/10 to-indigo-500/10 opacity-30 blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!response ? (
          <motion.div
            key="helpdesk-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div>
              <span className="text-purple-400 font-mono text-xs font-semibold tracking-wider uppercase bg-purple-950/40 px-2.5 py-1 rounded-full border border-purple-800/20">
                No question is too small
              </span>
              <h4 className="text-2xl font-display font-bold text-white mt-2">
                Have a Question? Ask a Community Sherpa!
              </h4>
              <p className="text-sm text-gray-400 mt-1">
                Stuck on a step, or wondering where you fit? Fill in this mock helpdesk desk below, and our simulated guide system will draft you immediate advice while submitting to our official form!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="helpdesk-name" className="block text-xs font-semibold tracking-wider text-gray-400 uppercase mb-1.5 font-mono">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="helpdesk-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Atlas"
                      className="w-full bg-[#181922] border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="helpdesk-topic" className="block text-xs font-semibold tracking-wider text-gray-400 uppercase mb-1.5 font-mono">
                    Topic of Query
                  </label>
                  <select
                    id="helpdesk-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-[#181922] border border-gray-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 transition-all font-mono"
                  >
                    <option value="Getting Started">Getting Started Help</option>
                    <option value="Which Circle to Choose">Choosing the Right Circle</option>
                    <option value="No Coding Background">Non-Technical Contributions</option>
                    <option value="Technical/SDK Issues">Technical Monorepos & SDK</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="helpdesk-text" className="block text-xs font-semibold tracking-wider text-gray-400 uppercase mb-1.5 font-mono">
                  Your Message or Question
                </label>
                <textarea
                  id="helpdesk-text"
                  required
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g. Where do I send feedback about spelling mistakes on the portal? Or, is it okay to just watch others discuss?"
                  className="w-full bg-[#181922] border border-gray-800 rounded-xl p-4 text-xs text-gray-200 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 transition-all resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-purple-800 disabled:to-indigo-900 font-bold text-xs py-3 px-6 rounded-xl text-white flex items-center gap-2 shadow-lg hover:shadow-purple-950/20 transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      Opening Google Form...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send your question
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="helpdesk-response"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center font-display font-extrabold text-xs text-white">
                  S
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">
                    Telegram Response Received
                  </h4>
                  <p className="text-[10px] font-mono text-teal-400">
                    TRANSMITTED BY: {response.advisor} • {response.timestamp}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold text-teal-400 bg-teal-950/30 border border-teal-900 px-2 py-0.5 rounded">
                ● RECEIVED
              </span>
            </div>

            <div className="bg-[#181922] rounded-xl border border-gray-800 p-5 space-y-3.5 relative">
              <div className="absolute top-3 right-4 text-[42px] text-gray-800/20 font-extrabold select-none">“</div>
              
              {response.lines.map((paragraph: string, idx: number) => (
                <p key={idx} className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="bg-purple-950/20 border border-purple-900/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-purple-300">
                Did your browser block the popup? Click below to head to our official Google Form manually:
              </div>
              <a
                href="https://forms.gle/pU1M8dnixfdDsNXZ9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs py-2 px-4 rounded-lg transition-all"
              >
                Go to Google Form
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 justify-between items-center pt-2">
              <div className="text-[10px] text-gray-500 font-mono">
                Ask other questions under the FAQ search bar anytime.
              </div>
              
              <button
                onClick={resetForm}
                className="w-full sm:w-auto text-xs px-5 py-2.5 rounded-xl border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-850 transition-all font-semibold flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Ask Another Question
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
