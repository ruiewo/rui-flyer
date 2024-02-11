import { PropsWithChildren } from "react";
import { pdfElementType } from "../utils";

import { commonProps } from "./pdfElement";

export type BoxProps = Required<
  Pick<React.CSSProperties, "border" | "padding">
>;

export const Box = ({
  border,
  padding,
  children,
}: BoxProps & PropsWithChildren) => (
  <div
    {...commonProps}
    data-pdf-element-type={pdfElementType.box}
    style={{
      justifyContent: "center",
      alignItems: "center",
      border,
      padding,
    }}
  >
    {children}
  </div>
);
