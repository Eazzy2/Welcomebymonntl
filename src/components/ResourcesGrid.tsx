import React, { useState } from "react";
import { ResourceItem, RESOURCES_LIST } from "../data";
import { 
  BookOpen, 
  Compass, 
  MessageSquare, 
  Github, 
  FileText, 
  Users, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck,
  Search,
  Filter
} from "lucide-react";

interface ResourcesGridProps {
  showToast: (msg: string, type: "success" | "info" | "party") => void;
}

const CATEGORIES = ["All", "Platforms", "Guides", "Developer Support"];

export const ResourcesGrid: React.FC<ResourcesGridProps> = ({ showToast }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("verse-favorited-resources");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string, title: string) => {
    let updated: string[];
    if (favoriteIds.includes(id)) {
      updated = favoriteIds.filter((item) => item !== id);
      showToast(`Removed "${title}" from your quick bookmarks.`, "info");
    } else {
      updated = [...favoriteIds, id];
      showToast(`Bookmarked "${title}" to your dashboard! 📌`, "success");
    }
    setFavoriteIds(updated);
    localStorage.setItem("verse-favorited-resources", JSON.stringify(updated));
  };

  const getIconElement = (iconName: string) => {
    const props = { className: "w-5 h-5" };
    switch (iconName) {
      case "MessageSquare": return <MessageSquare {...props} className="text-[#5865F2]" />;
      case "BookOpen": return <BookOpen {...props} className="text-purple-400" />;
      case "Compass": return <Compass {...props} className="text-teal-400" />;
      case "Github": return <Github {...props} className="text-gray-300" />;
      case "FileText": return <FileText {...props} className="text-amber-400" />;
      case "Users": return <Users {...props} className="text-pink-400" />;
      default: return <Compass {...props} className="text-teal-400" />;
    }
  };

  const filteredResources = RESOURCES_LIST.filter((resource) => {
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Extract favorited resources list
  const favoritedResources = RESOURCES_LIST.filter((r) => favoriteIds.includes(r.id));

  return (
    <div className="space-y-8">
      {/* Search and Category filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="flex flex-wrap gap-1.5 order-2 md:order-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white border-purple-400 font-bold"
                  : "bg-[#0b0c12]/80 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative max-w-sm w-full order-1 md:order-2">
          <label htmlFor="resource-search" className="sr-only">Search Resources</label>
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="resource-search"
            type="text"
            placeholder="Search useful links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0b0c12]/70 border border-gray-800 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 transition-all"
          />
        </div>
      </div>

      {/* Bookmarks Section (rendered only if they have favorited items) */}
      {favoritedResources.length > 0 && (
        <div className="bg-purple-950/10 border border-purple-900/30 rounded-2xl p-5 space-y-3">
          <h5 className="font-display font-semibold text-purple-300 text-xs tracking-wider uppercase flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-purple-400" />
            Your Private Dashboard Bookmarks ({favoritedResources.length})
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {favoritedResources.map((res) => (
              <div 
                key={res.id} 
                className="bg-[#0b0c12]/90 border border-purple-500/30 p-3.5 rounded-xl flex justify-between items-center gap-4 hover:border-purple-500/60 transition-all shadow-sm"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="shrink-0">{getIconElement(res.iconName)}</div>
                  <div className="overflow-hidden">
                    <h6 className="font-semibold text-xs text-white truncate">{res.title}</h6>
                    <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest">{res.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleFavorite(res.id, res.title)}
                    className="p-1 hover:bg-gray-800/40 rounded text-gray-400 hover:text-purple-400"
                    title="Remove Bookmark"
                  >
                    <BookmarkCheck className="w-3.5 h-3.5 text-purple-400" />
                  </button>
                  <a
                    href={res.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-1 hover:bg-gray-800/40 rounded text-teal-400 hover:text-teal-300"
                    title="Open Resource"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Resources list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => {
            const isFav = favoriteIds.includes(res.id);
            return (
              <div
                key={res.id}
                className="bg-[#0b0c12]/80 border border-gray-850 border-gray-800/60 hover:border-gray-700 rounded-2xl p-5 flex flex-col justify-between hover:bg-[#12131b]/60 transition-all hover:translate-y-[-1px] group relative overflow-hidden"
              >
                {/* Visual Glow on Hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all pointer-events-none" />

                <div className="space-y-3.5 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="bg-[#181922] p-2.5 rounded-xl border border-gray-850 border-gray-800">
                      {getIconElement(res.iconName)}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleFavorite(res.id, res.title)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isFav
                            ? "bg-purple-950/30 border-purple-500/40 text-purple-400"
                            : "bg-[#181922]/40 border-gray-800/60 text-gray-500 hover:text-purple-400"
                        }`}
                        title={isFav ? "Remove bookmark" : "Add bookmark to dashboard"}
                      >
                        {isFav ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-teal-400 bg-teal-950/20 px-2 py-0.5 rounded border border-teal-900/30">
                      {res.badge}
                    </span>
                    <h5 className="font-display font-bold text-gray-100 text-sm md:text-base leading-snug pt-1.5">
                      {res.title}
                    </h5>
                    <p className="text-xs text-gray-400 leading-relaxed min-h-[38px]">
                      {res.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-901 border-gray-900/65 mt-4 flex items-center justify-between text-xs font-mono relative z-10">
                  <span className="text-gray-500 uppercase">{res.category}</span>
                  <a
                    href={res.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-teal-400 font-bold hover:text-teal-350 hover:underline flex items-center gap-1"
                  >
                    Open Link
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-[#0b0c12] border border-gray-800/80 rounded-2xl p-10 text-center space-y-2">
            <div className="text-sm font-semibold text-white">No Resources Matched</div>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              We couldn't coordinate any resource matching "{searchQuery}". Try looking up "wiki" or "discord" instead.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
