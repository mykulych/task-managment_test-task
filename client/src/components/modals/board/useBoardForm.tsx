import { ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "../../inputs/textInput";

type FormValues = {
  name: string;
};

interface Props {
  onSubmit: (name: string) => void;
  onClose: () => void;
  defaultName?: string;
}

export const UseBoardForm: React.FC<Props> = ({ onSubmit, onClose, defaultName = "" }) => {
  const { register, handleSubmit } = useForm<FormValues>({defaultValues: { name: defaultName }});

  const handler: SubmitHandler<FormValues> = ({ name }) => {
    onSubmit(name);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(handler)}>
      <ModalCloseButton />
      <ModalBody>
        <TextInput id="name" register={register} label="Board name:" placeholder="Enter board name" />
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