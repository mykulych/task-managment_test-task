import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, useToast } from "@chakra-ui/react";
import { UseBoardForm } from "./useBoardForm";
import { useUpdateBoardMutation } from "../../../features/boards.api";
import { Board } from "../../../types/board";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedBoard: Board;
}

export const UpdateBoardModal: React.FC<Props> = ({ isOpen, onClose, selectedBoard }) => {
  const [updateBoard] = useUpdateBoardMutation();
  const successToast = useToast({ status: "success" })
  const errorToast = useToast({ status: "error" })

  const handleUpdateBoard = (name: string) => {
    updateBoard({...selectedBoard, name})
      .unwrap()
      .then(() => successToast({ title: "Board created" }))
      .catch((err) => errorToast({ title: err?.data?.message || "Board update failed"}))
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update board</ModalHeader>
        <UseBoardForm onSubmit={handleUpdateBoard} onClose={onClose} defaultName={selectedBoard.name} />
      </ModalContent>
    </Modal>
  );
};
