import React from 'react';
import { Star, Clock, Truck, Heart, Tag } from 'lucide-react';
import { Restaurant } from '../types';
import { useApp } from '../context/AppContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { setActiveRestaurant, favoriteRestaurantIds, toggleFavoriteRestaurant } = useApp();

  const isFavorite = favoriteRestaurantIds.includes(restaurant.id);

  return (
    <div
      onClick={() => setActiveRestaurant(restaurant)}
      className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-100">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Dark Gradient Overlay for Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteRestaurant(restaurant.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-neutral-700 hover:text-rose-600 hover:bg-white shadow-xs transition-all cursor-pointer"
          aria-label="Favorite Restaurant"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Featured / Open Tag */}
        <div className="absolute top-3 left-3 flex gap-2">
          {restaurant.isFeatured && (
            <span className="bg-amber-500 text-neutral-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wide shadow-xs">
              ★ Featured
            </span>
          )}
          {!restaurant.isOpen && (
            <span className="bg-rose-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wide shadow-xs">
              Closed
            </span>
          )}
        </div>

        {/* Bottom Delivery Info overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>₹{restaurant.deliveryFee} Delivery</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-extrabold text-base text-neutral-900 group-hover:text-orange-600 transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-lg text-xs font-black shrink-0 border border-emerald-200">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>{restaurant.rating}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-500 line-clamp-2 mb-3">
            {restaurant.description}
          </p>
        </div>

        <div>
          {/* Tags preview */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {restaurant.tags.map((tag) => (
              <span
                key={tag}
                className="bg-neutral-100 text-neutral-600 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1"
              >
                <Tag className="w-2.5 h-2.5 text-neutral-400" />
                {tag}
              </span>
            ))}
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-medium">
            <span>Min Order: ₹{restaurant.minOrder}</span>
            <span className="text-orange-600 font-extrabold group-hover:underline flex items-center gap-1">
              View Menu & Order →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
