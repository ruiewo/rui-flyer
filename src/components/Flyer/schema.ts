import { TemplateElement } from "./template";

export type Image = {
  src: string;
  rowSpan?: number;
  colSpan?: number;
  style?: Pick<React.CSSProperties, "gridRow" | "gridColumn">;
};

export type FlyerDataValue =
  | FlyerImageDataValue
  | Record<string, string | Record<string, string>[] | Image[]>;
export type FlyerData = Record<string, FlyerDataValue>;

export type LayoutData = {
  size: { width: string; height: string };
  gridTemplate: string;
  areas: Area[];
};

export type Area =
  | {
      id: string;
      text: string;
      type?: undefined;
      template: TemplateElement;
    }
  | {
      id: string;
      text: string;
      type: "image";
    };

export type FlyerImageDataValue = {
  props: {
    style: React.CSSProperties;
    count: number;
  };
  images: Image[];
};
