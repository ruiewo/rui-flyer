import { Grid } from "@chakra-ui/react";

import { Images } from "./Images";
import { LayoutData } from "./schema";
import { GridArea } from "./template";

type FlyerProps = {
  layout: LayoutData;
};

// todo remove chakra
export const Flyer = ({ layout }: FlyerProps) => {
  return (
    <Grid
      className="flyerRoot"
      position="relative"
      gridTemplate={layout.gridTemplate}
      style={{ ...layout.size }}
      p={0}
      m={0}
      top={0}
      backgroundColor="white"
    >
      {layout.areas.map((area) =>
        area.id === "images" ? (
          <Images key={area.id} gridArea="images" />
        ) : (
          <GridArea key={area.id} gridArea={area.id} template={area.template} />
        )
      )}
    </Grid>
  );
};
