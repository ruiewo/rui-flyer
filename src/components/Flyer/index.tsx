import { GridArea } from "./Area/GridArea";
import { ImageArea, OnImageSelect } from "./Area/ImageArea";
import { FlyerData, LayoutData } from "./schema";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type FlyerProps = {
  layout: LayoutData;
  data: FlyerData;
  onImageClick: OnImageSelect;
};

export const Flyer = ({ layout, data, onImageClick }: FlyerProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};
