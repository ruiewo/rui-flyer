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

type Style = {
  style?: React.CSSProperties;
};

export type TemplateElement =
  | {
      type: "flex";
      props?: Style;
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
      props?: Style;
      trProps?: Style;
      children: TemplateElement[];
    }
  | {
      type: "td";
      props?: Style;
      children: TemplateElement[];
    }
  | {
      type: "array";
      key: string;
      props?: Style;
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
        <div style={node.props?.style}>
          {node.children.map((x) => generateElement(x, reference))}
        </div>
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
        <table>
          <tbody>
            {rowList.map((row, i) => (
              <tr key={i} style={node.trProps?.style}>
                {node.children.map((x) => generateElement(x, row))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    case "td":
      return (
        <td style={node.props?.style}>
          {node.children.map((x) => generateElement(x, reference))}
        </td>
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

  template.props.style = { ...template.props.style, gridArea };

  return generateElement(template, referenceData);
};
