import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useModalContext,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "../Flyer/Area/ImageAreaUtil";
import { useFlyerData } from "../Contexts/FlyerDataProvider";
import { FlyerImageDataValue } from "../Flyer/schema";

export type ImageClopDialogProps = {
  area: string;
  index: number;
  src: string;
  width: number;
  height: number;
};

export const ImageCropDialog = ({
  area,
  index,
  src,
  width,
  height,
  isOpen,
  onClose,
}: ImageClopDialogProps & {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const { data, setData } = useFlyerData();

  const updateImage = async (
    i: number,
    imgSrc: string,
    croppedAreaPixels: Area
  ) => {
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
      const newImages = (data[area] as FlyerImageDataValue).images!.map(
        (x, j) => (i === j ? { ...x, src: croppedImage } : x)
      );
      setData((x) => ({
        ...x,
        [area]: { ...data[area], images: newImages },
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const aspect = width / height;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <FormModalContent
        aspect={aspect}
        src={src}
        index={index}
        updateImage={updateImage}
      />
    </Modal>
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
  const areaRef = useRef({ width: 0, height: 0, x: 0, y: 0 });

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    areaRef.current = croppedAreaPixels;
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
          minZoom={0.3}
          restrictPosition={false}
          zoomSpeed={0.1}
        />
      </ModalBody>

      <ModalFooter>
        <ModalCloseButton />
        <Button
          colorScheme="blue"
          onClick={async () => {
            await updateImage(index, src, areaRef.current);
            onClose();
          }}
        >
          変更
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
