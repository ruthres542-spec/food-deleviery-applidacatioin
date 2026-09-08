import React from 'react';
import { useApp } from '../context/AppContext';
import { CuisineType } from '../types';
import { Leaf, Flame } from 'lucide-react';

const CUISINES: { label: CuisineType; icon: string }[] = [
  { label: 'All', icon: '🍽️' },
  { label: 'Indian', icon: '🥘' },
  { label: 'Italian', icon: '🍝' },
  { label: 'Asian', icon: '🍜' },
  { label: 'Burgers', icon: '🍔' },
  { label: 'Pizza', icon: '🍕' },
  { label: 'Healthy', icon: '🥗' },
  { label: 'Mexican', icon: '🌮' },
  { label: 'Desserts', icon: '🍰' },
];

export const CuisineFilter: React.FC = () => {
  const { selectedCuisine, setSelectedCuisine, isVegOnlyFilter, setIsVegOnlyFilter } = useApp();

  return (
    <div className="py-4 border-b border-neutral-200/80 bg-white sticky top-16 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Scrollable Cuisine Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-1">
          {CUISINES.map(({ label, icon }) => {
            const isSelected = selectedCuisine === label;
            return (
              <button
                key={label}
                onClick={() => setSelectedCuisine(label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs scale-102'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200/80'
                }`}
              >
                <span className="text-sm">{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Veg Only Toggle Pill */}
        <button
          onClick={() => setIsVegOnlyFilter(!isVegOnlyFilter)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
            isVegOnlyFilter
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
          }`}
        >
          <Leaf className="w-3.5 h-3.5" />
          <span>Veg Only</span>
        </button>

      </div>
    </div>
  );
};
