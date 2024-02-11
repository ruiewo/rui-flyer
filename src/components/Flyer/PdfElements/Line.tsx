import { pdfElementType } from "../utils";

import { commonProps } from "./pdfElement";

const defaultColor = "#555";

type BaseLineProps = {
  width: string;
  height: string;
  color?: string;
};

const Line = ({ width, height, color = "#555" }: BaseLineProps) => (
  <div
    {...commonProps}
    data-pdf-element-type={pdfElementType.line}
    style={{
      height,
      width,
      backgroundColor: color,
    }}
  />
);

type LineProps = {
  width: string;
  color?: string;
};

export type VLineProps = LineProps;
export const VLine = ({
  width,
  color = defaultColor,
}: {
  width: string;
  color?: string;
}) => <Line width={width} height="100%" color={color} />;

export type HLineProps = LineProps;
export const HLine = ({
  width,
  color = defaultColor,
}: {
  width: string;
  color?: string;
}) => <Line width="100%" height={width} color={color} />;
