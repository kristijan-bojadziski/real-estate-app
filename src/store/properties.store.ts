import { create } from "zustand";
import { Property } from "models/property";
import { persist } from "zustand/middleware";

interface PropertiesState {
  properties: Property[];
  setProperties: (properties: Property[]) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updatedProperty: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getPropertyById: (id: string) => Property | undefined;
}

export const usePropertiesStore = create<PropertiesState>()(
  persist(
    (set, get) => ({
      properties: [],
      setProperties: properties => set({ properties }),
      addProperty: property =>
        set(state => ({
          properties: [property, ...state.properties],
        })),
      updateProperty: (id, updatedProperty) =>
        set(state => ({
          properties: state.properties.map(property =>
            property.id === id ? { ...property, ...updatedProperty } : property
          ),
        })),
      deleteProperty: id =>
        set(state => ({
          properties: state.properties.filter(property => property.id !== id),
        })),
      getPropertyById: id => {
        return get().properties.find(property => property.id === id);
      },
    }),
    { name: "properties" }
  )
);
