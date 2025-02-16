import { contentfulClient } from "./client";
import { Property, PropertyEntry } from "models/property";

export const getProperties = async (): Promise<Property[]> => {
  const response = await contentfulClient.getEntries<PropertyEntry>({
    content_type: "realEstate",
  });

  return response.items.map(item => ({
    ...item.fields,
  }));
};
