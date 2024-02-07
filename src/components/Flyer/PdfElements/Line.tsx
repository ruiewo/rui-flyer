import { Box } from "@chakra-ui/react"

import { pdfElementType } from "../utils"

import { commonProps } from "./pdfElement"

type LineProps = {
  orientation: "vertical" | "horizontal"
  borderWidth: string
  color?: string
}

const Line = ({ orientation, borderWidth, color = "#555" }: LineProps) => (
  <Box
    {...commonProps}
    data-pdf-element-type={pdfElementType.line}
    h={orientation === "vertical" ? "100%" : "1px"}
    w={orientation === "vertical" ? "1px" : "100%"}
    borderWidth={borderWidth}
    borderColor={color}
  />
)

export type VLineProps = Pick<LineProps, "borderWidth" | "color">
export const VLine = (props: { borderWidth: string; color?: string }) => (
  <Line {...props} orientation="vertical" />
)

export type HLineProps = Pick<LineProps, "borderWidth" | "color">
export const HLine = (props: { borderWidth: string; color?: string }) => (
  <Line {...props} orientation="horizontal" />
)
