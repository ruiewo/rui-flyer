import {
  Flex,
  FlexProps,
  Table,
  TableCellProps,
  TableProps,
  TableRowProps,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";

import { useFlyerData } from "../Contexts/FlyerDataProvider";
import {
  Box,
  BoxProps,
  HLine,
  HLineProps,
  Image,
  ImageProps,
  Text,
  TextProps,
  VLine,
  VLineProps,
} from "./PdfElements";
import { FlyerDataValue } from "./schema";

type ReferenceKey = { key: string };
export type TemplateElement =
  | {
      type: "flex";
      props?: FlexProps;
      children: TemplateElement[];
    }
  | {
      type: "box";
      props: BoxProps;
      children: TemplateElement[];
    }
  | {
      type: "text";
      props?: Omit<TextProps, "children">;
      children: string | ReferenceKey;
    }
  | {
      type: "hline";
      props: HLineProps;
    }
  | {
      type: "vline";
      props: VLineProps;
    }
  | {
      type: "image";
      props?: ImageProps;
    }
  | {
      type: "table";
      key: string;
      props?: TableProps;
      trProps?: TableRowProps;
      children: TemplateElement[];
    }
  | {
      type: "td";
      props?: TableCellProps;
      children: TemplateElement[];
    }
  | {
      type: "array";
      key: string;
      props?: TableCellProps; // todo
      children: {
        type: "text";
        props?: Omit<TextProps, "children">;
        children: string | ReferenceKey;
      };
    };

export function generateElement(
  node: TemplateElement,
  reference: FlyerDataValue
): JSX.Element | null {
  switch (node.type) {
    case "flex":
      return (
        <Flex {...node.props}>
          {node.children.map((x) => generateElement(x, reference))}
        </Flex>
      );
    case "box":
      return (
        <Box {...node.props}>
          {node.children.map((x) => generateElement(x, reference))}
        </Box>
      );
    case "text":
      return (
        <Text {...node.props}>
          {typeof node.children === "string"
            ? node.children
            : (reference[node.children.key] as unknown as string)}
        </Text>
      );
    case "hline":
      return <HLine {...node.props} />;
    case "vline":
      return <VLine {...node.props} />;
    case "image":
      return <Image {...node.props} />;
    case "table": {
      const rowList = reference[node.key] as unknown as Record<
        string,
        string
      >[];

      return (
        <Table>
          <Tbody>
            {rowList.map((row, i) => (
              <Tr key={i} {...node.trProps}>
                {node.children.map((x) => generateElement(x, row))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
    }
    case "td":
      return (
        <Td {...node.props}>
          {node.children.map((x) => generateElement(x, reference))}
        </Td>
      );

    case "array": {
      const dataList = reference[node.key] as unknown as Record<
        string,
        string
      >[];
      return <>{dataList.map((x) => generateElement(node.children, x))}</>;
    }

    default:
      return null;
  }
}

type GridAreaProps = { gridArea: string; template: TemplateElement };

export const GridArea = ({ gridArea, template }: GridAreaProps) => {
  const referenceData = useFlyerData().data[gridArea];

  template.props = { ...template.props, gridArea };

  return generateElement(template, referenceData);
};
