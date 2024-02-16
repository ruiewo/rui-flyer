import { pdfElementType } from "../utils";

import { commonProps } from "./pdfElement";

export type TextProps = {
  children: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  border?: string;
  whiteSpace?: string;
};

const defaultProps = {
  color: "#555",
  fontSize: "md",
  fontWeight: "normal",
  border: "none",
  whiteSpace: "pre-wrap",
};

export const Text = (props: TextProps) => (
  <p
    {...commonProps}
    data-pdf-element-type={pdfElementType.text}
    style={{
      display: "flex",
      ...defaultProps,
      ...props,
    }}
    children={props.children}
  />
);
