import { create } from "zustand";
import { persist } from "zustand/middleware";
// Models
import { Filter } from "models/filters";

const defaultFilters: Filter = {
  location: "all",
  squareMeters: 100,
  rooms: 6,
  type: "all",
  status: "all",
};

type FiltersState = {
  filters: Filter;
  hasAppliedFilters: boolean;
  updateFilters: (newFilters: Partial<Filter>) => void;
  clearFilters: () => void;
};

export const useFiltersStore = create<FiltersState>()(
  persist(
    set => ({
      filters: defaultFilters,
      hasAppliedFilters: false,
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
