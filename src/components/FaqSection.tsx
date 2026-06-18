import React, { useState } from "react";
import { FAQItem, FAQS_LIST } from "../data";
import { Search, ChevronDown, ChevronUp, AlertCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQSectionProps {
  showToast: (msg: string, type: "success" | "info" | "party") => void;
}

const CATEGORIES = ["All", "General", "Participation", "Circles"];

export const FAQSection: React.FC<FAQSectionProps> = ({ showToast }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIds, setOpenIds] = useState<string[]>(["faq-what-is"]); // open first by default

  const toggleFaq = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFaqs = FAQS_LIST.filter((faq) => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and Category filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Categories pills */}
        <div className="flex flex-wrap gap-1.5 order-2 md:order-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                selectedCategory === cat
                  ? "bg-teal-500 text-black border-teal-400 font-bold"
                  : "bg-[#0b0c12]/80 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input bar */}
        <div className="relative max-w-sm w-full order-1 md:order-2">
          <label htmlFor="faq-search" className="sr-only">Search FAQ</label>
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="faq-search"
            type="text"
            placeholder="Search newcomer FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0b0c12]/70 border border-gray-800 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 transition-all"
          />
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all ${
                  isOpen
                    ? "bg-[#12131a] border-purple-500/25 shadow-lg"
                    : "bg-[#0b0c12]/80 border-gray-800/60 hover:border-gray-700"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-start gap-3 justify-between p-4 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-teal-400 rounded-t-xl"
                >
                  <div className="flex gap-2.5 items-start">
                    <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span className="font-display font-semibold text-sm text-gray-100 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-gray-500 shrink-0 mt-0.5 ml-2">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 text-xs md:text-sm text-gray-400 leading-relaxed border-t border-gray-900/65 ml-6">
                        {faq.answer}
                        <div className="mt-2.5 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                          <span>SECTION: {faq.category.toUpperCase()}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(faq.answer);
                              showToast("FAQ answer copied! 📋", "success");
                            }}
                            className="hover:text-teal-400 shrink-0 transition-colors"
                          >
                            Copy Answer
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="bg-[#12131a] border border-gray-800 rounded-2xl p-8 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <div className="text-sm font-semibold text-white">No Matching Answers Found</div>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              We couldn't coordinate a record match for "{searchQuery}". Feel free to try search terms like "free", "code", or "circle".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
