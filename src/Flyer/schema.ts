import { TemplateElement } from "./template";

export type Layout = {
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

export type Content = Record<string, ContentValue>;

export type ContentValue =
  | ImageContentValue
  | Record<string, string | Record<string, string>[] | Image[]>;

export type ImageContentValue = {
  props: {
    style: React.CSSProperties;
    count: number;
  };
  images: Image[];
};

export type Image = {
  src: string;
};
