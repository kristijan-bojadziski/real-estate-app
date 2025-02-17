// Store
import { useFiltersStore } from "store/filter.store";
// Components
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";
// Constants
import { locations, propertyStatus, propertyTypes } from "constants/filtersOptions";
// Styles
import style from "./Filters.module.scss";

export const Filters = () => {
  const { filters, hasAppliedFilters, updateFilters, clearFilters } = useFiltersStore();

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    updateFilters({ [key]: value });
  };

  return (
    <div className="mt-2">
      <h3 className={`${style.headline} mb-3`}>Filters</h3>
      <div className="flex flex-column gap-2">
        <div className="flex flex-column gap-2">
          <label className="text-sm font-medium">Location</label>
          <Dropdown
            value={filters.location}
            onChange={e => handleFilterChange("location", e.value)}
            options={locations}
            placeholder="Select location"
            className={style.dropdown}
          />
        </div>
        <div className="flex flex-column gap-2">
          <label className="text-sm font-medium">Square Meters: {filters.squareMeters}m²</label>
          <Slider
            value={filters.squareMeters}
            onChange={e => handleFilterChange("squareMeters", e.value.toString())}
            max={200}
            className={style.slider}
          />
        </div>
        <div className="flex flex-column gap-2">
          <label className="text-sm font-medium">Rooms: {filters.rooms}</label>
          <Slider
            value={filters.rooms}
            onChange={e => handleFilterChange("rooms", e.value.toString())}
            max={6}
            className={style.slider}
          />
        </div>
        <div className="flex flex-column gap-2">
          <label className="text-sm font-medium">Property Type</label>
          <Dropdown
            value={filters.type}
            onChange={e => handleFilterChange("type", e.value)}
            options={propertyTypes}
            placeholder="Select type"
            className={style.dropdown}
          />
        </div>
        <div className="flex flex-column gap-2">
          <label className="text-sm font-medium">Status</label>
          <Dropdown
            value={filters.status}
            onChange={e => handleFilterChange("status", e.value)}
            options={propertyStatus}
            placeholder="Select status"
            className={style.dropdown}
          />
        </div>
        {hasAppliedFilters && (
          <div className="flex justify-content-end">
            <Button icon="pi pi-times" onClick={clearFilters} text severity="secondary" label="Clear Filters" />
          </div>
        )}
      </div>
    </div>
  );
};
