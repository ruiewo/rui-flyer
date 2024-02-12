import { pdfElementType } from "../utils";

import { commonProps } from "./pdfElement";

export type ImageProps = React.ComponentProps<"img">;
export const Image = (props: ImageProps) => {
  return (
    <img
      {...commonProps}
      data-pdf-element-type={pdfElementType.image}
      style={{
        objectFit: "contain",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
      {...props}
    />
  );
};
