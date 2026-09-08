import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  Plus, 
  Utensils, 
  Leaf, 
  Flame, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AiCravingAssistantModal: React.FC = () => {
  const { 
    isAiAssistantOpen, 
    setIsAiAssistantOpen, 
    menuItems, 
    addToCart, 
    setActiveRestaurant, 
    restaurants, 
    setIsCartOpen 
  } = useApp();

  const [prompt, setPrompt] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [budgetMax, setBudgetMax] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  
  const [recommendationResult, setRecommendationResult] = useState<{
    recommendationTitle: string;
    summary: string;
    suggestedDishNames: string[];
    aiTip: string;
  } | null>({
    recommendationTitle: "Personalized Craving Matcher",
    summary: "Describe what you're in the mood for or click one of the quick prompts below!",
    suggestedDishNames: ["Chicken Tikka Masala", "Truffle Mushroom Fettuccine", "Ahi Tuna Crunch Poke Bowl"],
    aiTip: "You can specify dietary preferences like Vegetarian, spicy levels, or budget limits!"
  });

  if (!isAiAssistantOpen) return null;

  const PRESETS = [
    "Spicy Indian late night comfort food",
    "Creamy Italian pasta with garlic bread",
    "High protein healthy bowl under ₹250",
    "Smash burger with truffle fries & shake",
    "Sweet decadent dessert for movie night"
  ];

  const handleFetchAiRecommendation = async (userPrompt: string) => {
    if (!userPrompt.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai/craving-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cravingPrompt: userPrompt,
          isVegetarian: isVegOnly,
          budgetMax: budgetMax
        })
      });

      if (!res.ok) throw new Error("AI request failed");
      const data = await res.json();
      setRecommendationResult(data);
    } catch (err) {
      console.error(err);
      setRecommendationResult({
        recommendationTitle: "Chef's Special Pick",
        summary: `For "${userPrompt}", our kitchen recommends these top-rated items!`,
        suggestedDishNames: ["Chicken Tikka Masala", "Pizza Margherita DOC"],
        aiTip: "Add a refreshing beverage for a complete meal!"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePresetClick = (p: string) => {
    setPrompt(p);
    handleFetchAiRecommendation(p);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFetchAiRecommendation(prompt);
  };

  // Find actual menu items matching suggested names
  const matchedMenuItems = (recommendationResult?.suggestedDishNames || [])
    .map((name) =>
      menuItems.find((mi) => mi.name.toLowerCase().includes(name.toLowerCase()))
    )
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 bg-gradient-to-r from-purple-700 via-indigo-700 to-rose-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md text-amber-300 flex items-center justify-center text-xl shadow-xs">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                Gemini AI Craving Assistant
              </h3>
              <p className="text-xs text-purple-200">Smart meal recommendation engine</p>
            </div>
          </div>

          <button
            onClick={() => setIsAiAssistantOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* Form Input */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. I want something warm, spicy, and satisfying for a cold evening under ₹300..."
                rows={2}
                className="w-full bg-neutral-50 p-3.5 rounded-2xl border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
              />
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="absolute right-3 bottom-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-40 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                {loading ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Ask AI</span>
              </button>
            </div>

            {/* Quick Presets */}
            <div>
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                Quick Craving Ideas:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handlePresetClick(p)}
                    className="bg-purple-50 hover:bg-purple-100 text-purple-800 text-[11px] font-semibold px-2.5 py-1 rounded-xl border border-purple-200 transition-colors cursor-pointer"
                  >
                    ✨ {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter checkboxes */}
            <div className="flex items-center gap-4 text-xs font-bold pt-1">
              <label className="flex items-center gap-1.5 text-neutral-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVegOnly}
                  onChange={(e) => setIsVegOnly(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Veg Only
              </label>

              <div className="flex items-center gap-1.5 text-neutral-700">
                <span>Max Budget:</span>
                <select
                  value={budgetMax || ''}
                  onChange={(e) => setBudgetMax(e.target.value ? Number(e.target.value) : undefined)}
                  className="bg-neutral-100 p-1 rounded-lg border border-neutral-300 text-xs"
                >
                  <option value="">Any</option>
                  <option value="150">Under ₹150</option>
                  <option value="250">Under ₹250</option>
                  <option value="350">Under ₹350</option>
                </select>
              </div>
            </div>
          </form>

          {/* AI Result Card */}
          {loading ? (
            <div className="p-8 bg-purple-50/50 rounded-3xl border border-purple-200 text-center space-y-3">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl mx-auto flex items-center justify-center animate-bounce">
                <Bot className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-purple-950">Analyzing flavor profiles & partner menus...</h4>
              <p className="text-xs text-purple-700">Gemini is curating your personalized meal recommendation.</p>
            </div>
          ) : (
            recommendationResult && (
              <div className="p-5 bg-gradient-to-br from-neutral-900 to-purple-950 text-white rounded-3xl space-y-4 shadow-xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-amber-400 text-neutral-950 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide mb-2">
                    <Sparkles className="w-3 h-3" /> AI Craving Match
                  </div>
                  <h4 className="text-xl font-black">{recommendationResult.recommendationTitle}</h4>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{recommendationResult.summary}</p>
                </div>

                {/* Suggested Dishes List */}
                <div className="space-y-2 pt-2 border-t border-purple-800/60">
                  <div className="text-[11px] font-extrabold text-amber-300 uppercase tracking-wider">
                    Recommended Dishes from Menus:
                  </div>

                  {matchedMenuItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {matchedMenuItems.map((mi) => {
                        if (!mi) return null;
                        const rest = restaurants.find((r) => r.id === mi.restaurantId);
                        return (
                          <div
                            key={mi.id}
                            className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-between gap-2 hover:bg-white/15 transition-all"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={mi.image}
                                alt={mi.name}
                                className="w-12 h-12 rounded-xl object-cover shrink-0"
                              />
                              <div className="min-w-0">
                                <h5 className="font-bold text-xs truncate">{mi.name}</h5>
                                <div className="text-[10px] text-neutral-300">{rest?.name}</div>
                                <div className="text-xs font-black text-amber-300">₹{mi.price}</div>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                addToCart(mi);
                                setIsCartOpen(true);
                                setIsAiAssistantOpen(false);
                              }}
                              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[11px] px-2.5 py-1.5 rounded-xl shrink-0 flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-xs text-neutral-300 italic">
                      Matching dishes: {recommendationResult.suggestedDishNames.join(', ')}
                    </div>
                  )}
                </div>

                {/* AI Tip Box */}
                <div className="p-3 bg-purple-900/60 rounded-2xl border border-purple-700/50 text-xs text-purple-200 flex items-center gap-2">
                  <span className="text-lg">💡</span>
                  <span>{recommendationResult.aiTip}</span>
                </div>
              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
};
