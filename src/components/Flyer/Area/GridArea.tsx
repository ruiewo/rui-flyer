import { Content } from "../schema";
import { TemplateElement, generateElement } from "../template";

type GridAreaProps = {
  gridArea: string;
  template: TemplateElement;
  data: Content;
};

export const GridArea = ({ gridArea, template, data }: GridAreaProps) => {
  const referenceData = data[gridArea];

  // @ts-ignore
  template.props.style = { ...template.props.style, gridArea };

  return generateElement(template, referenceData);
};
