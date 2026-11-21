import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { getCategoryPastel } from './EventCard';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  sortBy,
  setSortBy
}) {
  return (
    <div className="catalog-search-panel">
      {/* Search Bar Input */}
      <div className="search-input-wrapper">
        <Search className="search-icon-inside" size={19} />
        <input
          id="event-search-input"
          type="text"
          className="catalog-search-input"
          placeholder="Search by celebration name, theme, or keyword (e.g., Marigold, Haldi, Fairy Lights, Baby Shower)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Filter events by name or category"
        />
        {searchQuery && (
          <button
            id="clear-search-btn"
            className="clear-search-btn"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search input"
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category Pills & Sorting Bar */}
      <div className="filter-row">
        <div className="category-pill-group" role="tablist" aria-label="Event category filters">
          <button
            id="filter-all"
            className={`filter-pill ${selectedCategory === 'All' ? 'active active-all' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            All Celebrations
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            const pastel = getCategoryPastel(cat);
            return (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className={`filter-pill ${isSelected ? 'active' : ''}`}
                style={
                  isSelected
                    ? {
                        backgroundColor: pastel.bg,
                        color: pastel.text,
                        borderColor: pastel.border,
                        fontWeight: 600
                      }
                    : {}
                }
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sorting Dropdown */}
        <div className="sort-select-wrapper">
          <SlidersHorizontal size={14} />
          <label htmlFor="sort-select">Sort:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured / Best</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
