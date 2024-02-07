import { Flex as ChakraFlex, FlexProps } from "@chakra-ui/react"

import { pdfElementType } from "../utils"

import { commonProps } from "./pdfElement"

export type BoxProps = FlexProps &
  Required<Pick<FlexProps, "border" | "padding">>

const defaultProps = {
  border: "none",
  padding: "0",
}

export const Box = (props: BoxProps) => (
  <ChakraFlex
    justify="center"
    align="center"
    {...commonProps}
    data-pdf-element-type={pdfElementType.box}
    {...defaultProps}
    {...props}
  />
)
