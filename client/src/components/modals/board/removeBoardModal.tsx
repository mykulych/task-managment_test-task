import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, useToast } from '@chakra-ui/react'
import { useRemoveBoardMutation } from '../../../features/boards.api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedBoardId: string;
}

export const RemoveBoardModal: React.FC<Props> = ({ isOpen, onClose, selectedBoardId }) => {
  const [removeBoard] = useRemoveBoardMutation();
  const toast = useToast();

  const handleRemoveBoard = () => {
    removeBoard(selectedBoardId)
      .unwrap()
      .then(() => toast({ title: "Board removed successfully!", status: "success" }))
      .catch((err) => toast({ title: err?.data?.message || "Board removal failed", status: "error" }))
      .finally(() => onClose());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure ?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to remove this board ?</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleRemoveBoard}>
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};