import { TemplateElement } from "./template";

export type Image = {
  src: string;
  rowSpan?: number;
  colSpan?: number;
};

export type FlyerDataValue = Record<
  string,
  string | Record<string, string>[] | Image[]
>;
export type FlyerData = Record<string, FlyerDataValue>;

export type LayoutData = {
  size: { width: string; height: string };
  gridTemplate: string;
  areas: { id: string; text: string; template: TemplateElement }[];
};
