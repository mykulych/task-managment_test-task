import { ModalCloseButton, ModalBody, ModalFooter, Button, VStack, Flex } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "../../inputs/textInput";
import { TextAreaInput } from "../../inputs/textAreaInput";

export type FormValues = {
  title: string;
  description: string;
};

interface Props {
  onSubmit: (data: FormValues) => void;
  onClose: () => void;
  defaultData?: FormValues;
}

export const UseTodoForm: React.FC<Props> = ({ onSubmit, onClose, defaultData }) => {
  const { register, handleSubmit } = useForm<FormValues>({defaultValues: defaultData });

  const handler: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(handler)}>
      <ModalCloseButton />
      <ModalBody gap={5}>
        <Flex flexDir="column" gap={8}>
          <TextInput id="title" register={register} label="Board name:" placeholder="Enter board name" />
          <TextAreaInput id="description" register={register} label="Board name:" placeholder="Enter board name" />
        </Flex>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
        <Button type="submit" variant="ghost">
          Submit
        </Button>
      </ModalFooter>
    </form>
  );
};