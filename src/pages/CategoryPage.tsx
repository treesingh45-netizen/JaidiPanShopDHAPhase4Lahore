import React, { useState } from 'react';
import { ArrowUpDown, Filter, ChevronRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/menuData';
import { ProductCard } from '../components/ProductCard';
import { CategoryId } from '../types';

export const CategoryPage: React.FC = () => {
  const { selectedCategory, setSelectedCategory, menuItems } = useStore();

  const currentCategoryInfo =
    CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const [activeFilter, setActiveFilter] = useState<
    'all' | 'popular' | 'featured' | 'vegetarian' | 'new'
  >('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'lowToHigh' | 'highToLow'>('recommended');

  const handleCategoryChange = (id: CategoryId) => {
    setSelectedCategory(id);
    setActiveFilter('all');
  };

  // Filter items in the current category
  let categoryProducts = menuItems.filter((item) => item.category === currentCategoryInfo.id);

  if (activeFilter === 'popular') {
    categoryProducts = categoryProducts.filter((item) => item.isPopular);
  } else if (activeFilter === 'featured') {
    categoryProducts = categoryProducts.filter((item) => item.isFeatured);
  } else if (activeFilter === 'vegetarian') {
    categoryProducts = categoryProducts.filter((item) => item.isVegetarian);
  } else if (activeFilter === 'new') {
    categoryProducts = categoryProducts.filter((item) => item.isNew);
  }

  // Sorting
  if (sortBy === 'lowToHigh') {
    categoryProducts = [...categoryProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'highToLow') {
    categoryProducts = [...categoryProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 pt-4 sm:pt-6">
      {/* 1. Category Switcher Carousel */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-3 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = cat.id === currentCategoryInfo.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#D90000] text-white shadow-xs'
                    : 'bg-[#F7F7F7] text-neutral-700 hover:bg-neutral-200/80 hover:text-neutral-900'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`ml-1 text-[11px] ${isSelected ? 'text-white/80' : 'text-neutral-400'}`}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Category Header Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white min-h-[160px] flex items-center p-6 sm:p-10 border border-neutral-200">
        <img
          src={currentCategoryInfo.image}
          alt={currentCategoryInfo.name}
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-transparent" />

        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#D90000] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">
            <span>{currentCategoryInfo.count} Selections</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight">
            {currentCategoryInfo.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {currentCategoryInfo.description}
          </p>
        </div>
      </div>

      {/* 3. Filters & Sorting Control Bar */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mr-1">
            Filter:
          </span>
          {(
            [
              { id: 'all', label: 'All' },
              { id: 'popular', label: 'Popular' },
              { id: 'featured', label: 'Featured' },
              { id: 'vegetarian', label: 'Vegetarian' },
              { id: 'new', label: 'New' },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === f.id
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-[#F7F7F7] text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Sort By:
          </span>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'recommended' | 'lowToHigh' | 'highToLow')
            }
            className="bg-[#F7F7F7] border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-neutral-800 focus:outline-none focus:border-[#D90000] cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* 4. Product Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
          <span>
            Showing {categoryProducts.length} items in {currentCategoryInfo.name}
          </span>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center space-y-3">
            <p className="text-base font-semibold text-neutral-800">
              No products found with this filter.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="bg-[#D90000] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
            >
              Show All {currentCategoryInfo.name}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
