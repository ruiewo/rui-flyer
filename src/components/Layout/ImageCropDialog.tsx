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
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "../Flyer/Area/ImageAreaUtil";
import { useFlyerData } from "../Contexts/FlyerDataProvider";

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
      const newImages = data[area].images!.map((x, j) =>
        i === j ? { ...x, src: croppedImage } : x
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
