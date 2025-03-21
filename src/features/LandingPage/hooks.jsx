import { useMemo } from 'react';

/**
 * useFilteredFaqs ...
 *
 * Custom hook to create a filtered faq list
 *
 * @param {Array} faqs - the list of faq
 * @param {string} searchQuery - the text that the user can search with
 * @param {string} selectedCategory - the selected category the faq belongs to
 */
export const useFilteredFaqs = (faqs, searchQuery, selectedCategory) => {
  return useMemo(() => {
    let filteredFaqs = [...faqs];

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filteredFaqs = filteredFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(lowerCaseQuery) || faq.answer.toLowerCase().includes(lowerCaseQuery)
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      filteredFaqs = filteredFaqs.filter((faq) => faq.category === selectedCategory);
    }

    return filteredFaqs;
  }, [faqs, searchQuery, selectedCategory]);
};
