import { TemplateElement } from "../Flyer/template";

type ArrayKey = [string, string[]];
export type TemplateKeys = (string | ArrayKey)[];

export const retrieveKeys = (
  template: TemplateElement
): (string | string[])[] => {
  // @ts-ignore
  if (template.key !== undefined) {
    // @ts-ignore
    const children = template.children;
    // @ts-ignore
    if (children === undefined) return [template.key];

    return [
      [
        // @ts-ignore
        template.key,
        Array.isArray(children)
          ? children.map(retrieveKeys).flat()
          : retrieveKeys(children),
      ],
    ];
  }

  // @ts-ignore
  const children = template.children;
  if (children === undefined) return [];

  if (Array.isArray(children)) {
    return children.map(retrieveKeys).flat();
  }

  return retrieveKeys(children);
};
