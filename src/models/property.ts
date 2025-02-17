import { EntrySkeletonType } from "contentful";
import { ContentfulImage } from "./contentful";

export interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  views: number;
  price: number;
  squareMeters: number;
  rooms: number;
  heroImage: ContentfulImage;
  images: ContentfulImage[];
  type: "apartment" | "house" | "villa";
  status: "available" | "sold" | "pending";
  createdBy: string;
}

export interface PropertyEntry extends EntrySkeletonType {
  contentTypeId: "realEstate";
  fields: Property;
}
