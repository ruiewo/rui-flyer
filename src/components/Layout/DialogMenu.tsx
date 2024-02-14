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
  Heading,
  Card,
  CardBody,
  VStack,
} from "@chakra-ui/react";
import {
  FieldPath,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
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
        <ModalBody display="flex" flexDirection="column" gap={3}>
          {Object.entries(areaData).map(([key, value]: [string, any]) => {
            if (Array.isArray(value)) {
              return <ArrayInput key={key} area={key} items={value} />;
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

const ArrayInput = ({
  area,
  items,
}: {
  area: string;
  items: Record<string, string>[];
}) => {
  const register = useFormContext().register;

  return (
    <VStack>
      <Heading size="md" textAlign="left" w="100%">
        {area}
      </Heading>
      <VStack border="0" borderLeft="1px solid lightgray" w="100%" px={3}>
        {items.map((x, i) => (
          <Card key={`${area}.${i}`} w="100%" variant="outline">
            <CardBody gap={3} display="flex" flexDirection="column">
              {Object.keys(x).map((key) => (
                <FormControl key={`${area}.${i}.${key}`}>
                  <FormLabel>{key}</FormLabel>
                  <Input type="text" {...register(`${area}.${i}.${key}`)} />
                </FormControl>
              ))}
            </CardBody>
          </Card>
        ))}
      </VStack>
    </VStack>
  );
};
