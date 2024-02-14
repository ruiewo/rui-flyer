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
        width: "100%",
        height: "100%",
      }}
      {...props}
    />
  );
};
