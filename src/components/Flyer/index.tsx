import { GridArea } from "./Area/GridArea";
import { ImageArea, OnImageSelect } from "./Area/ImageArea";
import { LayoutData } from "./schema";

type FlyerProps = {
  layout: LayoutData;
  onImageClick: OnImageSelect;
};

export const Flyer = ({ layout, onImageClick }: FlyerProps) => {
  return (
    <div
      className="flyerRoot"
      style={{
        display: "grid",
        gridTemplate: layout.gridTemplate,
        ...layout.size,
        position: "relative",
        padding: 0,
        margin: 0,
        backgroundColor: "white",
      }}
    >
      {layout.areas.map((area) =>
        area.type === "image" ? (
          <ImageArea
            key={area.id}
            gridArea={area.id}
            onImageClick={onImageClick}
          />
        ) : (
          <GridArea key={area.id} gridArea={area.id} template={area.template} />
        )
      )}
    </div>
  );
};
