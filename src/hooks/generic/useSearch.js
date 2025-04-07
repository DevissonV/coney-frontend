import { useState, useMemo } from 'react';

/**
 * Custom hook to filter data based on a search query.
 *
 * @param {Array} data - The array of data to be filtered.
 * @param {Function} filterFn - A function that determines whether an item matches the search query.
 *                              It receives two arguments: the item and the search query (in lowercase).
 * @returns {Object} An object containing:
 *                   - `searchQuery` {string}: The current search query.
 *                   - `setSearchQuery` {Function}: A function to update the search query.
 *                   - `filteredData` {Array}: The filtered array of data based on the search query.
 */
export const useSearch = (data, filterFn) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((item) => filterFn(item, searchQuery.toLowerCase()));
  }, [data, searchQuery, filterFn]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
};
