import { useEffect, useState } from "react";
// Stores
import { useFiltersStore } from "store/filter.store";
import { usePropertiesStore } from "store/properties.store";
// Layout
import { MainLayout } from "layouts/MainLayout";
// Components
import { PropertyCard, EmptyState } from "components";
// Models
import { Property } from "models/property";

export const Home = () => {
  const properties = usePropertiesStore(state => state.properties);
  const { filters, searchTerm } = useFiltersStore();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (!properties.length) return;

    const filtered = properties.filter(property => {
      const searchCondition = searchTerm
        ? property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const filterConditions = [
        filters.location && filters.location !== "all" ? property.location === filters.location : true,
        filters.squareMeters ? property.squareMeters <= filters.squareMeters : true,
        filters.rooms ? property.rooms <= filters.rooms : true,
        filters.type && filters.type !== "all" ? property.type === filters.type : true,
        filters.status && filters.status !== "all" ? property.status === filters.status : true,
        searchCondition,
      ];

      return filterConditions.every(Boolean);
    });

    setFilteredProperties(filtered);
  }, [properties, filters, searchTerm]);

  return (
    <MainLayout>
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-start m-4">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </MainLayout>
  );
};
