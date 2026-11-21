/**
 * CelebrationCraft — Theme & Pastel Utility Helpers
 */

/**
 * Returns cohesive pastel style definitions for each celebration category
 * adhering to the CelebrationCraft pastel design system:
 * - Birthday: Soft Lavender & Lilac (#f3e8ff, #7e22ce, #e9d5ff)
 * - Haldi Ceremony: Warm Sunlit Buttercup (#fef3c7, #b45309, #fde68a)
 * - Marriage: Soft Blush Rose (#ffe4e6, #be123c, #fecdd3)
 * - Baby Shower: Powder Sky Blue (#e0f2fe, #0369a1, #bae6fd)
 */
export const getCategoryPastel = (category = '') => {
  const norm = (category || '').toLowerCase();
  if (norm.includes('birthday')) {
    return {
      text: '#7e22ce',
      bg: '#f3e8ff',
      border: '#e9d5ff',
      dot: '#a855f7'
    };
  }
  if (norm.includes('haldi')) {
    return {
      text: '#b45309',
      bg: '#fef3c7',
      border: '#fde68a',
      dot: '#f59e0b'
    };
  }
  if (norm.includes('marr') || norm.includes('wed')) {
    return {
      text: '#be123c',
      bg: '#ffe4e6',
      border: '#fecdd3',
      dot: '#f43f5e'
    };
  }
  if (norm.includes('baby')) {
    return {
      text: '#0369a1',
      bg: '#e0f2fe',
      border: '#bae6fd',
      dot: '#0284c7'
    };
  }
  return {
    text: '#9d174d',
    bg: '#fce7f3',
    border: '#fbcfe8',
    dot: '#ec4899'
  };
};
