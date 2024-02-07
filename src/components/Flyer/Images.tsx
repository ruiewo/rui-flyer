import {
  Box,
  BoxProps,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  useModalContext,
} from "@chakra-ui/react";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";

import { useFlyerData } from "../Contexts/FlyerDataProvider";
import { Image as PdfImage } from "./PdfElements";

export const Images = (props: BoxProps) => {
  const { data, setData } = useFlyerData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [aspect, setAspect] = useState(4 / 3);
  const [src, setSrc] = useState("");
  const [index, setIndex] = useState(0);

  const updateImage = async (
    i: number,
    imgSrc: string,
    croppedAreaPixels: Area
  ) => {
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
      const newImages = data.images.images.map((x, j) =>
        i === j ? { ...x, src: croppedImage } : x
      );
      setData({ ...data, images: { ...data.images, images: newImages } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Box {...props} px={3} py={1}>
        <Grid
          w="100%"
          h="100%"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
        >
          {data.images.images.map(({ src, ...x }, i) => (
            <GridItem key={src} {...x} position="relative">
              <PdfImage
                src={src}
                alt=""
                width="100%"
                height="100%"
                onClick={(e) => {
                  const parent = (e.target as HTMLElement).parentElement!;

                  const aspect = parent.offsetWidth / parent.offsetHeight;
                  setAspect(aspect);
                  setSrc(src);
                  setIndex(i);
                  onOpen();
                }}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <FormModalContent
          aspect={aspect}
          src={src}
          index={index}
          updateImage={updateImage}
        />
      </Modal>
    </>
  );
};

type FormModalContentProps = {
  aspect: number;
  src: string;
  index: number;
  updateImage: (i: number, src: string, area: Area) => Promise<void>;
};
const FormModalContent = ({
  aspect,
  src,
  index,
  updateImage,
}: FormModalContentProps) => {
  const { onClose } = useModalContext();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({});

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <ModalContent>
      <ModalBody>
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </ModalBody>

      <ModalFooter>
        <ModalCloseButton />
        <Button
          colorScheme="blue"
          onClick={async () => {
            await updateImage(index, src, croppedAreaPixels);
            onClose();
          }}
        >
          変更
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return "";
  }

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return canvas.toDataURL("jpg");
}
