import { useParams } from "react-router";
// Store
import { usePropertiesStore } from "store/properties.store";
// Layout
import { MainLayout } from "layouts/MainLayout";
// Components
import { Galleria } from "primereact/galleria";
import { Tag } from "primereact/tag";
// Icons
import { CurrencyEur, MapPin, Ruler, Bed } from "@phosphor-icons/react";
// Models
import { GalleryItem } from "models/gallery";
// Styles
import style from "./Details.module.scss";

export const Details = () => {
  const { id } = useParams<string>();
  const property = usePropertiesStore(state => (id ? state.getPropertyById(id) : undefined));

  if (!property) {
    return <div>Property not found.</div>;
  }

  const galleriaItems: GalleryItem[] = property.images.map(img => ({
    previewImageSrc: img.fields.file.url,
    thumbnailImageSrc: img.fields.file.url,
    title: img.fields.title,
  }));

  const renderStatus = () => {
    switch (property.status) {
      case "sold":
        return <Tag value="Sold" severity="danger" />;
      case "pending":
        return <Tag value="Pending" severity="warning" />;
      default:
        return <Tag value="Available" severity="success" />;
    }
  };

  const itemTemplate = (item: GalleryItem) => {
    return <img src={item.previewImageSrc} alt={item.title} className="w-full" />;
  };

  const thumbnailTemplate = (item: GalleryItem) => {
    return <img src={item.previewImageSrc} alt={item.title} className="w-full" />;
  };

  return (
    <MainLayout>
      <div className="flex flex-column gap-4 p-5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img
              src={property.heroImage.fields.file.url}
              alt={property.heroImage.fields.title}
              className={style.image}
              style={{ objectFit: "cover", maxHeight: "400px", maxWidth: "550px" }}
            />
          </div>
          <div className="md:w-1/2">
            {renderStatus()}
            <div className="flex justify-between items-start my-4">
              <h2 className="text-2xl font-bold m-0">{property.name}</h2>
            </div>
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex align-items-center gap-2">
                <MapPin size={20} weight="bold" />
                <span>{property.location}</span>
              </div>
              <div className="flex align-items-center gap-2">
                <Ruler size={20} weight="bold" />
                <span>{property.squareMeters} m²</span>
              </div>
              <div className="flex align-items-center gap-2">
                <Bed size={20} weight="bold" />
                <span>{property.rooms} rooms</span>
              </div>
            </div>

            <div className="flex align-items-center gap-1 mb-6">
              <CurrencyEur size={24} weight="bold" />
              <span className="text-2xl font-bold">{property.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">{property.description}</p>
        {galleriaItems.length > 0 && (
          <div className="flex flex-column ">
            <h3 className="text-xl font-semibold mb-4">Gallery</h3>
            <Galleria
              value={galleriaItems}
              numVisible={5}
              item={itemTemplate}
              thumbnail={thumbnailTemplate}
              className="w-full"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};
