export const pdfElementType = {
  line: "line",
  text: "text",
  box: "box",
  image: "image",
  canvas: "canvas",
} as const;

// type PdfElementType = (typeof pdfElementType)[keyof typeof pdfElementType]

export type Definition =
  | {
      type: typeof pdfElementType.line;
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
    }
  | {
      type: typeof pdfElementType.box;
      x: number;
      y: number;
      w: number;
      h: number;
      border: string;
      padding: string;
    }
  | {
      type: typeof pdfElementType.image;
      x: number;
      y: number;
      w: number;
      h: number;
      src: string;
    }
  | {
      type: typeof pdfElementType.text;
      x: number;
      y: number;
      w: number;
      h: number;
      text: string;
      fontSize?: string;
      fontWeight?: number;
      color?: string;
      // bgColor?: string;
    }
  | {
      type: typeof pdfElementType.canvas;
      x: number;
      y: number;
      w: number;
      h: number;
    };
