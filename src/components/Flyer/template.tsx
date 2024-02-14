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
  reference: FlyerDataValue,
  index?: number | undefined
): JSX.Element | null {
  switch (node.type) {
    case "flex":
      return (
        <div key={index ? index : ""} style={node.props?.style}>
          {node.children.map((x, i) => generateElement(x, reference, i))}
        </div>
      );
    case "box":
      return (
        <Box key={index ? index : ""} {...node.props}>
          {node.children.map((x, i) => generateElement(x, reference, i))}
        </Box>
      );
    case "text":
      return (
        <Text key={index ? index : ""} {...node.props}>
          {typeof node.children === "string"
            ? node.children
            : (reference[node.children.key] as unknown as string)}
        </Text>
      );
    case "hline":
      return <HLine key={index ? index : ""} {...node.props} />;
    case "vline":
      return <VLine key={index ? index : ""} {...node.props} />;
    case "image":
      return <Image key={index ? index : ""} {...node.props} />;
    case "table": {
      const rowList = reference[node.key] as unknown as Record<
        string,
        string
      >[];

      return (
        <table key={index ? index : ""}>
          <tbody>
            {rowList.map((row, i) => (
              <tr key={i} style={node.trProps?.style}>
                {node.children.map((x, i) => generateElement(x, row, i))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    case "td":
      return (
        <td key={index ? index : ""} style={node.props?.style}>
          {node.children.map((x, i) => generateElement(x, reference, i))}
        </td>
      );

    case "array": {
      const dataList = reference[node.key] as unknown as Record<
        string,
        string
      >[];
      return (
        <>{dataList.map((x, i) => generateElement(node.children, x, i))}</>
      );
    }

    default:
      return null;
  }
}
