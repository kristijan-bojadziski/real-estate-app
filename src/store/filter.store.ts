import { create } from "zustand";
import { persist } from "zustand/middleware";
// Models
import { Filter } from "models/filters";

const defaultFilters: Filter = {
  location: "all",
  squareMeters: 120,
  rooms: 6,
  type: "all",
  status: "all",
};

type FiltersState = {
  searchTerm: string;
  filters: Filter;
  hasAppliedFilters: boolean;
  setSearch: (searchTerm: string) => void;
  updateFilters: (newFilters: Partial<Filter>) => void;
  clearFilters: () => void;
};

export const useFiltersStore = create<FiltersState>()(
  persist(
    set => ({
      searchTerm: "",
      filters: defaultFilters,
      hasAppliedFilters: false,
      setSearch: newSearchTerm => set(() => ({ searchTerm: newSearchTerm })),
      updateFilters: newFilters =>
        set(state => ({
          filters: { ...state.filters, ...newFilters },
          hasAppliedFilters: true,
        })),
      clearFilters: () =>
        set({
          filters: defaultFilters,
          hasAppliedFilters: false,
        }),
    }),
    { name: "filters" }
  )
);
