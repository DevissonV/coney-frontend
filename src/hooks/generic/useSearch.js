import { useState, useEffect } from 'react';

export const useSearch = (data, searchFields) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        searchFields.some((field) =>
          item[field]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  }, [data, searchQuery, searchFields]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
};
