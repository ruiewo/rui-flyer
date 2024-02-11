import { Images } from "./Images";
import { LayoutData } from "./schema";
import { GridArea } from "./template";

type FlyerProps = {
  layout: LayoutData;
};

export const Flyer = ({ layout }: FlyerProps) => {
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
          <Images key={area.id} gridArea={area.id} />
        ) : (
          <GridArea key={area.id} gridArea={area.id} template={area.template} />
        )
      )}
    </div>
  );
};
