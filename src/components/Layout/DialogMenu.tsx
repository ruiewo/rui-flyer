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
  Flex,
} from "@chakra-ui/react";
import {
  FieldPath,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { IconType } from "react-icons";

import { useFlyerData } from "../Contexts/FlyerDataProvider";
import { Area, FlyerDataValue, FlyerImageDataValue } from "../Flyer/schema";
import { NavItem } from "./NavItem";

type DialogMenuProps = {
  label: string;
  icon: IconType;
  area: string;
  type: Area["type"];
};
export const DialogMenu = ({ label, icon, area, type }: DialogMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NavItem icon={icon} label={label} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <FormModalContent label={label} area={area} type={type} />
      </Modal>
    </>
  );
};

type FormModalContentProps = {
  label: string;
  area: string;
  type: Area["type"];
};

const FormModalContent = ({ label, area, type }: FormModalContentProps) => {
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
        <ModalHeader>{label}</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" gap={3}>
          {type === "image" ? (
            <Flex gap={3}>
              <GridLayout
                area={area}
                gridTemplate={`
"area0 area3" minmax(0, 1fr)
"area0 area3" minmax(0, 1fr)
"area1 area3" minmax(0, 1fr)
"area1 area4" minmax(0, 1fr)
"area2 area4" minmax(0, 1fr)
"area2 area4" minmax(0, 1fr)
/ minmax(0, 1fr) minmax(0, 1fr)`}
                count={5}
              />
              <GridLayout
                area={area}
                gridTemplate={`
"area0 area0 area1 area1 area2 area2" minmax(0, 1fr)
"area3 area3 area3 area4 area4 area4" minmax(0, 1fr)
/ minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)`}
                count={5}
              />
              <GridLayout
                area={area}
                gridTemplate={`
"area0 area1" minmax(0, 1fr)
/ minmax(0, 2fr) minmax(0, 1fr)`}
                count={2}
              />
              <GridLayout
                area={area}
                gridTemplate={`
"area0 area2" minmax(0, 1fr)
"area1 area2" minmax(0, 1fr)
/ minmax(0, 1fr) minmax(0, 1fr)`}
                count={3}
              />
            </Flex>
          ) : (
            Object.entries(areaData).map(([key, value]: [string, any]) => {
              if (Array.isArray(value)) {
                return <ArrayInput key={key} area={key} items={value} />;
              }

              return <FormInput key={key} formKey={key} />;
            })
          )}
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

type GridLayoutProps = {
  area: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplate: string;
  count: number;
};

const GridLayout = ({
  area,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplate,
  count,
}: GridLayoutProps) => {
  const { setData } = useFlyerData();

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        display: "grid",
        gridTemplateColumns,
        gridTemplateRows,
        gridTemplate,
        gap: "3px",
        padding: "3px",
        backgroundColor: "lightgray",
      }}
      onClick={() => {
        setData((x) => {
          const data = x[area] as FlyerImageDataValue;
          const newData = {
            ...data,
            props: {
              style: {
                ...data.props.style,
                gridTemplate,
              },
              count,
            },
          };
          return { ...x, [area]: newData };
        });
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{ backgroundColor: "white", gridArea: `area${i}` }}
        />
      ))}
    </div>
  );
};
