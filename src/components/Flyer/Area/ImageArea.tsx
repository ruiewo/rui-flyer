import { Image } from "../PdfElements";
import { Content, ImageContentValue } from "../schema";

type ImageAreaProps = {
  gridArea: string;
  data: Content;
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

export const ImageArea = ({ gridArea, data, onImageClick }: ImageAreaProps) => {
  const imageData = data[gridArea] as ImageContentValue;
  imageData.props.style = { ...imageData.props.style, gridArea };

  const maxImageCount = imageData.props.count;

  return (
    <div {...imageData.props}>
      {imageData.images!.map(
        ({ src, ...x }, i) =>
          i < maxImageCount && (
            <div
              key={i}
              {...x}
              style={{ gridArea: `area${i}`, position: "relative" }}
            >
              <Image
                key={i}
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
          )
      )}
    </div>
  );
};
