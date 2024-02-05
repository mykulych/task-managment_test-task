import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, useToast } from '@chakra-ui/react'
import { useRemoveTodoMutation } from '../../../features/todo.api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedTodoId: string;
}

export const RemoveTodoModal: React.FC<Props> = ({ isOpen, onClose, selectedTodoId }) => {
  const [removeTodo] = useRemoveTodoMutation();
  const toast = useToast();

  const handleRemoveTodo = () => {
    removeTodo(selectedTodoId)
      .unwrap()
      .then(() => toast({ title: "Todo removed successfully!", status: "success" }))
      .catch((err) => toast({ title: err?.data?.message || "Failed to remove todo", status: "error" }))
      .finally(() => onClose());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure ?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to remove this todo ?</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleRemoveTodo}>
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};