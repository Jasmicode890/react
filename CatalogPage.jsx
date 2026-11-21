import React from 'react';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import { PackageSearch, PlusCircle } from 'lucide-react';

export default function CatalogPage({
  events,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  onBookNow,
  navigateTo
}) {
  // Extract all distinct categories currently present in state
  const availableCategories = Array.from(
    new Set(events.map((e) => e.category))
  );

  // Filter events based on search query and category
  const filteredEvents = events.filter((event) => {
    // Category match
    const matchesCategory =
      selectedCategory === 'All' ||
      event.category.toLowerCase() === selectedCategory.toLowerCase();

    // Search query match (name, category, description, tagline)
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      event.title.toLowerCase().includes(q) ||
      event.category.toLowerCase().includes(q) ||
      (event.description && event.description.toLowerCase().includes(q)) ||
      (event.tagline && event.tagline.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return Number(a.price) - Number(b.price);
    }
    if (sortBy === 'price-desc') {
      return Number(b.price) - Number(a.price);
    }
    if (sortBy === 'rating') {
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    }
    return 0; // Default order
  });

  return (
    <div className="catalog-page-view" id="catalog-page-view">
      {/* Header */}
      <div className="catalog-header">
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
          <span className="section-tag">Complete Milestone Catalog</span>
          <h2 className="section-title">Milestone Event Packages</h2>
          <p className="section-subtitle" style={{ margin: 0 }}>
            Browse through curated celebration packages for Birthdays, Haldi Ceremonies, Weddings, and Baby Showers.
          </p>
        </div>

        {/* Search Bar & Category Filters Component */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={availableCategories}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Results Header Counter */}
      <div className="results-counter-bar">
        <div>
          Showing <strong>{sortedEvents.length}</strong> celebration {sortedEvents.length === 1 ? 'package' : 'packages'}
          {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
          {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
        </div>

        <button
          className="btn-secondary"
          onClick={() => navigateTo('/create')}
          style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem' }}
        >
          <PlusCircle size={15} />
          <span>Add Custom Theme</span>
        </button>
      </div>

      {/* Event Cards Grid */}
      <div className="events-grid" id="events-grid">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onBookNow={onBookNow}
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <PackageSearch size={32} />
            </div>
            <h3 className="empty-state-title">No celebration packages found</h3>
            <p className="empty-state-desc">
              We couldn't find any packages matching "{searchQuery}". Try clearing your filters or create a custom package.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                className="btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset Filters
              </button>
              <button
                className="btn-primary"
                onClick={() => navigateTo('/create')}
              >
                Create Custom Theme
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
