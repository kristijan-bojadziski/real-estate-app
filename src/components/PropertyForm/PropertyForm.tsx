import { useForm, Controller } from "react-hook-form";
// Stores
import { useAuthStore } from "store/auth.store";
import { usePropertiesStore } from "store/properties.store";
// Components
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
// Constants
import { locations, propertyStatus, propertyTypes } from "constants/filtersOptions";
// Models
import { Property } from "models/property";
import { ContentfulImage } from "models/contentful";

interface Props {
  initialValues?: Property;
  onSubmit: (data: Property) => void;
}

export const PropertyForm = ({ initialValues, onSubmit }: Props) => {
  const { username } = useAuthStore();
  const { properties } = usePropertiesStore();

  const { control, handleSubmit, register, setValue, watch } = useForm<Property>({
    defaultValues: initialValues || {
      id: `${properties.length + 2}`,
      name: "",
      description: "",
      location: "",
      views: 0,
      price: 0,
      squareMeters: 0,
      rooms: 1,
      heroImage: { fields: { file: { url: "", details: { size: 0 }, fileName: "", contentType: "" }, title: "" } },
      images: [],
      type: "apartment",
      status: "available",
      createdBy: username ?? "",
    },
  });

  const heroImageUrl = watch("heroImage.fields.file.url");
  const galleryImages = watch("images");

  const handleHeroImageUpload = async (event: FileUploadHandlerEvent) => {
    const file = event.files[0];
    const imageUrl = await onImageUpload(file);
    setValue("heroImage.fields.file.url", imageUrl);
  };

  const onImageUpload = async (file: File) => {
    return new Promise<string>(resolve => {
      setTimeout(() => {
        resolve(URL.createObjectURL(file));
      }, 1000);
    });
  };

  const handleGalleryImagesUpload = async (event: FileUploadHandlerEvent) => {
    const files = event.files;
    const uploadedImages: ContentfulImage[] = await Promise.all(
      files.map(async file => {
        const imageUrl = await onImageUpload(file);
        return {
          fields: {
            file: { url: imageUrl, details: { size: file.size }, fileName: file.name, contentType: file.type },
            title: file.name,
          },
        };
      })
    );
    setValue("images", [...galleryImages, ...uploadedImages]);
    event.options.clear();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-3">
      <div className="flex flex-column">
        <label htmlFor="name">Name</label>
        <InputText id="name" {...register("name", { required: true })} />
      </div>
      <div className="flex flex-column">
        <label htmlFor="description">Description</label>
        <InputTextarea id="description" {...register("description", { required: true })} rows={5} />
      </div>
      <div className="flex flex-column">
        <label htmlFor="location">Location</label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Dropdown id="location" {...field} options={locations.filter(location => location.value !== "all")} />
          )}
        />
      </div>
      <div className="flex flex-column">
        <label htmlFor="price">Price</label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <InputNumber
              id="price"
              value={field.value ?? 0}
              onChange={e => field.onChange(e.value ?? 0)}
              mode="currency"
              currency="EUR"
            />
          )}
        />
      </div>
      <div className="flex flex-column">
        <label htmlFor="squareMeters">Square Meters</label>
        <Controller
          name="squareMeters"
          control={control}
          render={({ field }) => (
            <InputNumber
              id="squareMeters"
              value={field.value ?? 0}
              onChange={e => field.onChange(e.value ?? 0)}
              max={200}
            />
          )}
        />
      </div>
      <div className="flex flex-column">
        <label htmlFor="rooms">Rooms</label>
        <Controller
          name="rooms"
          control={control}
          render={({ field }) => (
            <InputNumber id="rooms" value={field.value ?? 1} onChange={e => field.onChange(e.value ?? 1)} max={6} />
          )}
        />
      </div>
      <div className="flex flex-column">
        <label htmlFor="type">Type</label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Dropdown id="type" {...field} options={propertyTypes.filter(type => type.value !== "all")} />
          )}
        />
      </div>
      <div className="flex flex-column">
        <label htmlFor="status">Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Dropdown id="status" {...field} options={propertyStatus.filter(status => status.value !== "all")} />
          )}
        />
      </div>
      <div className="flex flex-column">
        <label htmlFor="heroImage" className="mb-2">
          Hero Image
        </label>
        <FileUpload mode="basic" customUpload uploadHandler={handleHeroImageUpload} accept="image/*" />
        {heroImageUrl && <img src={heroImageUrl} alt="Hero Preview" className="mt-2 w-15rem" />}
      </div>
      <div className="flex flex-column">
        <label htmlFor="images" className="mb-2">
          Gallery Images
        </label>
        <FileUpload mode="advanced" customUpload multiple uploadHandler={handleGalleryImagesUpload} accept="image/*" />
        <div className="flex flex-wrap mt-2 gap-1">
          {galleryImages?.map((img, idx) => (
            <img key={idx} src={img.fields.file.url} alt={`Gallery ${idx}`} style={{ maxWidth: "100px" }} />
          ))}
        </div>
      </div>
      <Button type="submit" label="Submit" className="mt-6" />
    </form>
  );
};
