import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, useToast } from "@chakra-ui/react";
import { UseTodoForm, FormValues } from "./useTodoForm";
import { useUpdateTodoMutation } from "../../../features/todo.api";
import { Todo } from "../../../types/todo";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedTodo: Todo | null;
}

export const UpdateTodoModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedTodo,
}) => {
  const [updateTodo] = useUpdateTodoMutation();
  const successToast = useToast({ status: "success" });
  const errorToast = useToast({ status: "error" });

  const handleUpdateTodo = (data: FormValues) => {
    if (!selectedTodo) return;
    
    updateTodo({ id: selectedTodo._id, todo: data })
      .unwrap()
      .then(() => successToast({ title: "Todo updated" }))
      .catch((err) =>
        errorToast({ title: err?.data?.message || "Failed to update todo" })
      );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update board</ModalHeader>
        <UseTodoForm
          onSubmit={handleUpdateTodo}
          onClose={onClose}
          defaultData={{
            title: selectedTodo?.title || "",
            description: selectedTodo?.description || "",
          }}
        />
      </ModalContent>
    </Modal>
  );
};
