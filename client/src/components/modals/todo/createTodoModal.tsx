import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, useToast } from "@chakra-ui/react";
import { UseTodoForm, FormValues } from "./useTodoForm";
import { useCreateTodoMutation } from "../../../features/todo.api";
import { useParams } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTodoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { boardId } = useParams();
  const [createTodo] = useCreateTodoMutation();
  const successToast = useToast({ status: "success" });
  const errorToast = useToast({ status: "error" });

  const handleCreateTodo = (data: FormValues) => {
    createTodo({...data, board_id: boardId })
      .unwrap()
      .then(() => successToast({ title: "Todo created" }))
      .catch((err) => errorToast({ title: err?.data?.message || "Failed to create todo" }))
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new todo</ModalHeader>
        <UseTodoForm onSubmit={handleCreateTodo} onClose={onClose} />
      </ModalContent>
    </Modal>
  );
};
