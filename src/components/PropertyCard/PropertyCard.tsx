import { useNavigate } from "react-router";
// Components
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
// Icons
import { Bed, CurrencyEur, Eye, MapPin, Ruler } from "@phosphor-icons/react";
// Models
import { Property } from "models/property";
// Styles
import style from "./PropertyCard.module.scss";

interface Props {
  property: Property;
}

export const PropertyCard = ({ property }: Props) => {
  const navigate = useNavigate();

  const renderStatus = () => {
    switch (true) {
      case property.status === "sold":
        return <Tag value="Sold" severity="danger" className={style.ribbon} />;
      case property.status === "pending":
        return <Tag value="Pending" severity="warning" className={style.ribbon} />;
      default:
      case property.status === "available":
        return <Tag value="Available" severity="success" className={style.ribbon} />;
    }
  };

  return (
    <Card key={property.id} className={style.card} onClick={() => navigate(`/details/${property.id}`)}>
      {renderStatus()}
      <div className={style.views}>
        <Eye size={20} weight="bold" />
        <span>{property.views}</span>
      </div>
      {property.heroImage && (
        <div className={style.imageWrapper}>
          <img src={property.heroImage.fields.file.url} alt={property.heroImage.fields.title} className={style.image} />
        </div>
      )}
      <div className="flex flex-column gap-1 px-3">
        <div className="flex align-items-center gap-4 pt-2">
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
            <span>{property.rooms}</span>
          </div>
        </div>
        <div className="flex align-items-center justify-content-between pt-2 pb-2">
          <h4 className="m-0">{property.name}</h4>
        </div>
        <p className={`${style.description} m-0 pb-3`}>{property.description}</p>
        <div className="flex align-items-center gap-1 mt-4">
          <CurrencyEur size={20} weight="bold" />
          <span>{property.price.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};
