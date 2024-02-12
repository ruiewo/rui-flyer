import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useModalContext,
} from "@chakra-ui/react";
import { FieldPath, FormProvider, useForm } from "react-hook-form";
import { IconType } from "react-icons";

import { useFlyerData } from "../Contexts/FlyerDataProvider";
import { FlyerDataValue } from "../Flyer/schema";
import { NavItem } from "./NavItem";

type DialogMenuProps = {
  label: string;
  icon: IconType;
  area: string;
};
export const DialogMenu = ({ label, icon, area }: DialogMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NavItem icon={icon} label={label} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <FormModalContent area={area} />
      </Modal>
    </>
  );
};

type FormModalContentProps = {
  area: string;
};

const FormModalContent = ({ area }: FormModalContentProps) => {
  const { onClose } = useModalContext();

  const { data, setData } = useFlyerData();
  const areaData = data[area];
  const methods = useForm<FlyerDataValue>({ defaultValues: areaData });

  const onSubmit = methods.handleSubmit((data) => {
    setData((x) => ({ ...x, [area]: data }));
    onClose();
  });

  const FormInput = ({ formKey }: { formKey: FieldPath<FlyerDataValue> }) => (
    <FormControl mt={3}>
      <FormLabel>{formKey}</FormLabel>
      <Input type="text" {...methods.register(formKey)} />
    </FormControl>
  );

  return (
    <FormProvider {...methods}>
      <ModalContent as="form" onSubmit={onSubmit}>
        <ModalHeader>ヘッダー</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {Object.entries(areaData).map(([key, value]: [string, any]) => {
            if (Array.isArray(value)) {
              return value.map((x, i) =>
                Object.keys(x).map((key2) => (
                  <FormInput
                    key={`${key}.${i}.${key2}`}
                    formKey={`${key}.${i}.${key2}`}
                  />
                ))
              );
            }

            return <FormInput key={key} formKey={key} />;
          })}
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="blue">
            変更
          </Button>
        </ModalFooter>
      </ModalContent>
    </FormProvider>
  );
};
