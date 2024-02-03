import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, useToast } from "@chakra-ui/react";
import { UseBoardForm } from "./useBoardForm";
import { useCreateBoardMutation } from "../../../features/boards.api";


interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateBoardModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [createBoard] = useCreateBoardMutation();
  const successToast = useToast({ status: "success" })
  const errorToast = useToast({ status: "error" })

  const handleCreateBoard = (name: string) => {
    createBoard({ name })
      .unwrap()
      .then(() => successToast({ title: "Board created" }))
      .catch((err) => errorToast({ title: err?.data?.message || "Board creation failed" }))
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new board</ModalHeader>
        <UseBoardForm onSubmit={handleCreateBoard} onClose={onClose} />
      </ModalContent>
    </Modal>
  );
};
