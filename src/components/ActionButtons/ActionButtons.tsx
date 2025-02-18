import { useState } from "react";
import { useNavigate, useParams } from "react-router";
// Stores
import { useAuthStore } from "store/auth.store";
import { usePropertiesStore } from "store/properties.store";
// Components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { PropertyForm } from "components";
// Icons
import { PencilSimple, Trash } from "@phosphor-icons/react";

export const ActionButtons = () => {
  const { id } = useParams<string>();
  const { username } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState<"edit" | "delete" | null>(null);

  if (!id) return;

  const property = usePropertiesStore(state => state.getPropertyById(id));
  const deleteProperty = usePropertiesStore(state => state.deleteProperty);
  const updateProperty = usePropertiesStore(state => state.updateProperty);

  return (
    property?.createdBy === username && (
      <div className="flex flex-column gap-3 mt-6 w-full">
        <Button
          className="w-full justify-content-center"
          outlined
          severity="info"
          icon={<PencilSimple size={20} weight="bold" />}
          onClick={() => setOpen("edit")}
        >
          Edit
        </Button>
        <Button
          className="w-full justify-content-center"
          outlined
          severity="danger"
          icon={<Trash size={20} weight="bold" />}
          onClick={() => setOpen("delete")}
        >
          Delete
        </Button>
        <Dialog
          header="Delete property"
          visible={open === "delete"}
          position="center"
          onHide={() => {
            if (open === null) return;
            setOpen(null);
          }}
          draggable={false}
          resizable={false}
        >
          <div className="flex flex-column">
            <div className="flex flex-row align-items-center gap-1 mb-4">
              <Trash size={24} weight="bold" />
              <p>Are you sure you want to delete this property?</p>
            </div>
            <div className="flex flex-row justify-content-end gap-3">
              <Button outlined onClick={() => setOpen(null)}>
                Cancel
              </Button>
              <Button
                severity="danger"
                onClick={() => {
                  deleteProperty(id);
                  navigate("/");
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Dialog>
        <Dialog
          header="Edit property"
          visible={open === "edit"}
          position="bottom"
          style={{ width: "50vw" }}
          onHide={() => setOpen(null)}
          draggable={false}
          resizable={false}
        >
          <PropertyForm
            initialValues={property}
            onSubmit={data => {
              updateProperty(id, data);
              setOpen(null);
            }}
          />
        </Dialog>
      </div>
    )
  );
};
