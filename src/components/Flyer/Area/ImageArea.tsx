import { useFlyerData } from "../../Contexts/FlyerDataProvider";
import { Image } from "../PdfElements";

type ImageAreaProps = {
  gridArea: string;
  onImageClick: OnImageSelect;
};

export type OnImageClick = {
  area: string;
  index: number;
  src: string;
  width: number;
  height: number;
};

export type OnImageSelect = (props: OnImageClick) => void;

export const ImageArea = ({ gridArea, onImageClick }: ImageAreaProps) => {
  const imageData = useFlyerData().data[gridArea];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(2, minmax(0, 1fr))",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        padding: "0.25rem 0.75rem",
        width: "100%",
        height: "100%",
      }}
    >
      {imageData.images!.map(({ src, ...x }, i) => (
        <div key={src} {...x}>
          <Image
            src={src}
            onClick={(e) => {
              const parent = (e.target as HTMLElement).parentElement!;

              const data = {
                area: gridArea,
                index: i,
                src,
                width: parent.offsetWidth,
                height: parent.offsetHeight,
              };

              onImageClick(data);
            }}
          />
        </div>
      ))}
    </div>
  );
};
