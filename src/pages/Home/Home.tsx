import { useEffect, useState } from "react";
// Store
import { useFiltersStore } from "store/filter.store";
// Layout
import { MainLayout } from "layouts/MainLayout";
// Components
import { PropertyCard } from "components/PropertyCard/PropertyCard";
import { EmptyState } from "components/EmptyState/EmptyState";
// Hooks
import { useProperties } from "hooks/useProperties";
// Models
import { Property } from "models/property";

export const Home = () => {
  const { data: properties } = useProperties();
  const { filters } = useFiltersStore();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (!properties) return;

    const filtered = properties.filter(property => {
      const conditions = [
        filters.location && filters.location !== "all" ? property.location === filters.location : true,
        filters.squareMeters ? property.squareMeters <= filters.squareMeters : true,
        filters.rooms ? property.rooms <= filters.rooms : true,
        filters.type && filters.type !== "all" ? property.type === filters.type : true,
        filters.status && filters.status !== "all" ? property.status === filters.status : true,
      ];

      return conditions.every(Boolean);
    });

    setFilteredProperties(filtered);
  }, [properties, filters]);

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
