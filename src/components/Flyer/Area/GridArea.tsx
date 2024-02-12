import { useFlyerData } from "../../Contexts/FlyerDataProvider";
import { TemplateElement, generateElement } from "../template";

type GridAreaProps = { gridArea: string; template: TemplateElement };

export const GridArea = ({ gridArea, template }: GridAreaProps) => {
  const referenceData = useFlyerData().data[gridArea];

  template.props.style = { ...template.props.style, gridArea };

  return generateElement(template, referenceData);
};
