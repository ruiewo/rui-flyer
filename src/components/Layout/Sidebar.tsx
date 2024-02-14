import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
} from "@chakra-ui/react";
import DomToImage from "dom-to-image";
import { FiHome, FiPrinter } from "react-icons/fi";

import { DialogMenu } from "./DialogMenu";
import { Flyer } from "../Flyer";
import { NavItem } from "./NavItem";

import { Header } from "./Header";
import { useLayout } from "../Contexts/FlyerLayoutProvider";
import { ImageClopDialogProps, ImageCropDialog } from "./ImageCropDialog";
import { useState } from "react";
import { useFlyerData } from "../Contexts/FlyerDataProvider";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { layout } = useLayout();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <img src="/logo/logo.svg" width={80} height={30} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <NavItem icon={FiHome} label="Home" />
      {layout.areas.map((area, index) => (
        <DialogMenu
          key={index}
          label={area.text}
          area={area.id}
          type={area.type}
        />
      ))}

      <NavItem
        icon={FiPrinter}
        label="Print"
        onClick={() => {
          const node = document.querySelector(".flyerRoot");
          if (node) {
            DomToImage.toJpeg(node, { quality: 0.95 }).then(
              (dataUrl: string) => {
                const link = document.createElement("a");
                link.download = "flyer.jpg";
                link.href = dataUrl;
                link.click();
              }
            );
          }
        }}
      />
    </Box>
  );
};

export const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { layout } = useLayout();
  const { data } = useFlyerData();

  const {
    isOpen: isCropDialogOpen,
    onOpen: onCropDialogOpen,
    onClose: onCropDialogClose,
  } = useDisclosure();

  const [imageCropProps, setImageCropProps] = useState<ImageClopDialogProps>({
    area: "",
    index: 0,
    src: "",
    width: 0,
    height: 0,
  });

  const onImageClick = (data: ImageClopDialogProps) => {
    setImageCropProps(data);
    onCropDialogOpen();
  };

  return (
    <Box w="100vw" minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Flyer layout={layout} data={data} onImageClick={onImageClick} />
      </Box>
      <ImageCropDialog
        {...imageCropProps}
        isOpen={isCropDialogOpen}
        onOpen={onCropDialogOpen}
        onClose={onCropDialogClose}
      />
    </Box>
  );
};
