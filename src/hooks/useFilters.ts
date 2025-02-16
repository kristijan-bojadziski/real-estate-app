import { useState, useEffect } from "react";
// Models
import { Filter } from "models/filters";

const FILTER_STORAGE_KEY = "property-filters";

const defaultFilters = {
  location: "",
  squareMeters: 0,
  rooms: 0,
  type: "",
  status: "",
};

export const useFilters = () => {
  const [filters, setFilters] = useState<Filter>(() => {
    const savedFilters = localStorage.getItem(FILTER_STORAGE_KEY);
    return savedFilters ? JSON.parse(savedFilters) : defaultFilters;
  });

  useEffect(() => {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  const updateFilters = (newFilters: Partial<Filter>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return {
    filters,
    updateFilters,
    clearFilters,
  };
};
