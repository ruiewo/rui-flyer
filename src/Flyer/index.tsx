import { GridArea } from "./Area/GridArea";
import { ImageArea, OnImageSelect } from "./Area/ImageArea";
import { Content, Layout } from "./schema";

type FlyerProps = {
  layout: Layout;
  data: Content;
  onImageClick: OnImageSelect;
};

export const Flyer = ({ layout, data, onImageClick }: FlyerProps) => {
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
            data={data}
            onImageClick={onImageClick}
          />
        ) : (
          <GridArea
            key={area.id}
            gridArea={area.id}
            template={area.template}
            data={data}
          />
        )
      )}
    </div>
  );
};
