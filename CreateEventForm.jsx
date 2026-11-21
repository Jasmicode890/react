import React, { useState } from 'react';
import { PlusCircle, Sparkles, AlertCircle, Eye, Image as ImageIcon } from 'lucide-react';
import EventCard from './EventCard';

const PRESET_IMAGES = [
  { label: 'Pastel Dreamscape', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Floral Whispers', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80' },
  { label: 'Warm Fairy Lights', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80' },
  { label: 'Botanical Garden', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sweet Celebrations', url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80' }
];

const PRESET_COLORS = [
  { name: 'Lavender Mist', hex: '#a855f7', bg: '#f3e8ff' },
  { name: 'Warm Marigold', hex: '#d97706', bg: '#fef3c7' },
  { name: 'Blush Rose', hex: '#f43f5e', bg: '#ffe4e6' },
  { name: 'Powder Sky', hex: '#0284c7', bg: '#e0f2fe' },
  { name: 'Mint Meadow', hex: '#059669', bg: '#ecfdf5' },
  { name: 'Peach Sorbet', hex: '#ea580c', bg: '#fff7ed' }
];

export default function CreateEventForm({ onAddEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Birthday',
    customCategory: '',
    price: '',
    tagline: '',
    description: '',
    guestCapacity: '50 - 150 Guests',
    duration: '5 Hours',
    featuresText: 'Bespoke Floral Decor, 4K Photography Coverage, Welcome Mocktails, DJ Sound & Lighting',
    image: PRESET_IMAGES[0].url,
    themeColor: PRESET_COLORS[0].hex,
    badge: 'Custom Exclusive'
  });

  const [errors, setErrors] = useState({});
  const [isCustomCat, setIsCustomCat] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategorySelect = (e) => {
    const val = e.target.value;
    if (val === '__custom__') {
      setIsCustomCat(true);
      setFormData((prev) => ({ ...prev, category: '' }));
    } else {
      setIsCustomCat(false);
      setFormData((prev) => ({ ...prev, category: val }));
    }
  };

  // Live preview event object
  const previewEvent = {
    id: 'preview-id',
    title: formData.title || 'Your Custom Celebration Title',
    category: isCustomCat ? (formData.customCategory || 'Custom Milestone') : (formData.category || 'Birthday'),
    price: formData.price ? Number(formData.price) : 29999,
    formattedPrice: formData.price ? `₹${Number(formData.price).toLocaleString('en-IN')}` : '₹29,999',
    tagline: formData.tagline || 'Crafted with bespoke pastel elegance & cherished memories',
    description: formData.description || 'Describe the ambiance, decorations, ceremonial highlights, and hospitality included in this unique celebration package.',
    guestCapacity: formData.guestCapacity || '50 - 150 Guests',
    duration: formData.duration || '5 Hours',
    themeColor: formData.themeColor,
    badge: formData.badge || 'New Theme',
    rating: 5.0,
    reviewsCount: 1,
    image: formData.image || PRESET_IMAGES[0].url,
    features: formData.featuresText
      ? formData.featuresText.split(',').map((f) => f.trim()).filter(Boolean)
      : ['Bespoke Setup', 'Full Hospitality Support', 'Exclusive Lighting']
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Celebration package title is required';
    } else if (formData.title.trim().length < 4) {
      newErrors.title = 'Title must be at least 4 characters';
    }

    const finalCat = isCustomCat ? formData.customCategory.trim() : formData.category;
    if (!finalCat) {
      newErrors.category = 'Celebration category is required';
    }

    if (!formData.price) {
      newErrors.price = 'Base price is required';
    } else if (Number(formData.price) <= 0) {
      newErrors.price = 'Base price must be greater than zero';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 15) {
      newErrors.description = 'Description should be at least 15 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const finalCategory = isCustomCat ? formData.customCategory.trim() : formData.category;
    const finalFeatures = formData.featuresText
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    const newPackage = {
      id: `evt-custom-${Date.now()}`,
      title: formData.title.trim(),
      category: finalCategory,
      price: Number(formData.price),
      formattedPrice: `₹${Number(formData.price).toLocaleString('en-IN')}`,
      tagline: formData.tagline.trim() || `${finalCategory} milestone package`,
      description: formData.description.trim(),
      guestCapacity: formData.guestCapacity || '50 - 150 Guests',
      duration: formData.duration || '5 Hours',
      themeColor: formData.themeColor,
      badge: formData.badge || 'Custom Created',
      rating: 5.0,
      reviewsCount: 1,
      image: formData.image || PRESET_IMAGES[0].url,
      features: finalFeatures.length > 0 ? finalFeatures : [
        'Curated Decor Theme',
        'Specialty Lighting & Audio',
        'Hospitality Host Assistance'
      ]
    };

    // State Management: Add to live state list
    onAddEvent(newPackage);

    // Reset Form
    setFormData({
      title: '',
      category: 'Birthday',
      customCategory: '',
      price: '',
      tagline: '',
      description: '',
      guestCapacity: '50 - 150 Guests',
      duration: '5 Hours',
      featuresText: 'Bespoke Floral Decor, 4K Photography Coverage, Welcome Mocktails, DJ Sound & Lighting',
      image: PRESET_IMAGES[0].url,
      themeColor: PRESET_COLORS[0].hex,
      badge: 'Custom Exclusive'
    });
    setIsCustomCat(false);
    setErrors({});
  };

  return (
    <div className="create-page-container">
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '1.75rem' }}>
        <span className="section-tag">Theme Creator</span>
        <h2 className="section-title">Design a Celebration Package</h2>
        <p className="section-subtitle" style={{ margin: 0 }}>
          Create a bespoke milestone theme and watch it publish to the live catalog instantly.
        </p>
      </div>

      <div className="create-page-layout">
        {/* Form Card */}
        <section className="create-form-card">
          <form onSubmit={handleSubmit} noValidate id="create-event-form">
            {/* Title */}
            <div className="form-field">
              <label htmlFor="create-title" className="form-label">
                Package Title <span className="label-required">*</span>
              </label>
              <input
                id="create-title"
                name="title"
                type="text"
                placeholder="e.g. Fairytale Garden Engagement & Sangeet"
                className={`form-input ${errors.title ? 'error' : ''}`}
                value={formData.title}
                onChange={handleChange}
                style={{ paddingLeft: '1rem' }}
                required
              />
              {errors.title && (
                <span className="form-error-text" id="error-create-title">
                  <AlertCircle size={13} />
                  <span>{errors.title}</span>
                </span>
              )}
            </div>

            {/* Category Selector + Custom Category */}
            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="create-category-select" className="form-label">
                  Category <span className="label-required">*</span>
                </label>
                <select
                  id="create-category-select"
                  className="form-select"
                  value={isCustomCat ? '__custom__' : formData.category}
                  onChange={handleCategorySelect}
                  style={{ paddingLeft: '1rem' }}
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Haldi Ceremony">Haldi Ceremony</option>
                  <option value="Marriage">Marriage</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="__custom__">+ Enter Custom Category...</option>
                </select>
              </div>

              {isCustomCat && (
                <div className="form-field">
                  <label htmlFor="create-custom-category" className="form-label">
                    Custom Category Name <span className="label-required">*</span>
                  </label>
                  <input
                    id="create-custom-category"
                    name="customCategory"
                    type="text"
                    placeholder="e.g. Sangeet / Housewarming"
                    className="form-input"
                    value={formData.customCategory}
                    onChange={handleChange}
                    style={{ paddingLeft: '1rem' }}
                    required
                  />
                </div>
              )}

              {/* Base Price */}
              <div className="form-field">
                <label htmlFor="create-price" className="form-label">
                  Base Price (₹) <span className="label-required">*</span>
                </label>
                <input
                  id="create-price"
                  name="price"
                  type="number"
                  min="1000"
                  step="500"
                  placeholder="e.g. 35000"
                  className={`form-input ${errors.price ? 'error' : ''}`}
                  value={formData.price}
                  onChange={handleChange}
                  style={{ paddingLeft: '1rem' }}
                  required
                />
                {errors.price && (
                  <span className="form-error-text" id="error-create-price">
                    <AlertCircle size={13} />
                    <span>{errors.price}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Tagline */}
            <div className="form-field">
              <label htmlFor="create-tagline" className="form-label">
                Short Tagline
              </label>
              <input
                id="create-tagline"
                name="tagline"
                type="text"
                placeholder="e.g. Dreamy twilight florals and acoustic melodies"
                className="form-input"
                value={formData.tagline}
                onChange={handleChange}
                style={{ paddingLeft: '1rem' }}
              />
            </div>

            {/* Description */}
            <div className="form-field">
              <label htmlFor="create-desc" className="form-label">
                Package Description <span className="label-required">*</span>
              </label>
              <textarea
                id="create-desc"
                name="description"
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Describe what makes this milestone celebration special, including decor elements, ambiance, and hospitality..."
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
              />
              {errors.description && (
                <span className="form-error-text" id="error-create-description">
                  <AlertCircle size={13} />
                  <span>{errors.description}</span>
                </span>
              )}
            </div>

            {/* Guest Capacity & Duration */}
            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="create-guests" className="form-label">
                  Guest Capacity
                </label>
                <input
                  id="create-guests"
                  name="guestCapacity"
                  type="text"
                  placeholder="e.g. 50 - 150 Guests"
                  className="form-input"
                  value={formData.guestCapacity}
                  onChange={handleChange}
                  style={{ paddingLeft: '1rem' }}
                />
              </div>

              <div className="form-field">
                <label htmlFor="create-duration" className="form-label">
                  Duration
                </label>
                <input
                  id="create-duration"
                  name="duration"
                  type="text"
                  placeholder="e.g. 5 Hours / Full Day"
                  className="form-input"
                  value={formData.duration}
                  onChange={handleChange}
                  style={{ paddingLeft: '1rem' }}
                />
              </div>
            </div>

            {/* Features (Comma-separated) */}
            <div className="form-field">
              <label htmlFor="create-features" className="form-label">
                Included Highlights (comma-separated)
              </label>
              <input
                id="create-features"
                name="featuresText"
                type="text"
                placeholder="e.g. Theme Stage Decor, Photography, Welcome Drinks, DJ Setup"
                className="form-input"
                value={formData.featuresText}
                onChange={handleChange}
                style={{ paddingLeft: '1rem' }}
              />
            </div>

            {/* Preset Imagery Selection */}
            <div className="form-field">
              <label className="form-label">
                <ImageIcon size={15} />
                <span>Select Curated Visual Theme</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))', gap: '0.6rem' }}>
                {PRESET_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, image: img.url }))}
                    style={{
                      height: '54px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: formData.image === img.url ? '2.5px solid #f43f5e' : '1px solid var(--border-light)',
                      position: 'relative',
                      boxShadow: formData.image === img.url ? '0 0 0 2px rgba(244,63,94,0.2)' : 'none'
                    }}
                    title={img.label}
                  >
                    <img src={img.url} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Pastel Color Swatches */}
            <div className="form-field">
              <label className="form-label">
                <Sparkles size={15} />
                <span>Choose Pastel Theme Tone</span>
              </label>
              <div className="color-picker-row">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    className={`theme-color-chip ${formData.themeColor === color.hex ? 'selected' : ''}`}
                    style={{
                      backgroundColor: color.bg,
                      borderColor: formData.themeColor === color.hex ? color.hex : 'var(--border-light)'
                    }}
                    onClick={() => setFormData((prev) => ({ ...prev, themeColor: color.hex }))}
                    title={color.name}
                    aria-label={`Select accent color ${color.name}`}
                  >
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        display: 'inline-block'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <button
              id="submit-create-event-btn"
              type="submit"
              className="btn-submit-booking"
            >
              <PlusCircle size={18} />
              <span>Publish Theme to Live Catalog</span>
            </button>
          </form>
        </section>

        {/* Live Card Preview Box */}
        <aside className="live-preview-box">
          <div className="preview-badge-label">
            <Eye size={15} />
            <span>Live Interactive Preview</span>
          </div>

          {/* Render Actual EventCard component using Props */}
          <EventCard
            event={previewEvent}
            onBookNow={() => {
              alert('This is a live preview of your custom package!');
            }}
          />

          <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'var(--pastel-yellow-bg)', borderRadius: '12px', border: '1px solid var(--pastel-yellow-border)' }}>
            <p style={{ fontSize: '0.84rem', color: 'var(--pastel-yellow-text)', margin: 0, lineHeight: 1.5 }}>
              ✨ <strong>Live React State:</strong> When submitted, this package immediately joins your active catalog without a reload.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
