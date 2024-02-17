import { Fragment } from "react";
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
import { ContentValue } from "./schema";

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
      type: "list";
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
  reference: ContentValue,
  index?: number | undefined
): JSX.Element | null {
  const key = index ?? "";
  switch (node.type) {
    case "flex":
      return (
        <div key={key} style={node.props?.style}>
          {node.children.map((x, i) => generateElement(x, reference, i))}
        </div>
      );
    case "box":
      return (
        <Box key={key} {...node.props}>
          {node.children.map((x, i) => generateElement(x, reference, i))}
        </Box>
      );
    case "text":
      return (
        <Text key={key} {...node.props}>
          {typeof node.children === "string"
            ? node.children
            : // @ts-ignore
              (reference[node.children.key] as unknown as string)}
        </Text>
      );
    case "hline":
      return <HLine key={key} {...node.props} />;
    case "vline":
      return <VLine key={key} {...node.props} />;
    case "image":
      return <Image key={key} {...node.props} />;
    case "table": {
      // @ts-ignore
      const rowList = reference[node.key] as unknown as Record<
        string,
        string
      >[];

      return (
        <table key={key}>
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
        <td key={key} style={node.props?.style}>
          {node.children.map((x, i) => generateElement(x, reference, i))}
        </td>
      );

    case "list": {
      // @ts-ignore
      const dataList = reference[node.key] as unknown as Record<
        string,
        string
      >[];
      return (
        <Fragment key={key}>
          {dataList.map((x, i) => generateElement(node.children, x, i))}
        </Fragment>
      );
    }

    default:
      return null;
  }
}
