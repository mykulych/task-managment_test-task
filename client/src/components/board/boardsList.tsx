import React from "react";
import { Board } from "../../types/board";
import { VStack } from "@chakra-ui/react";
import { BoardCard } from "./boardCard";
import { ErrorMessage } from "../errorMessage";

interface Props {
  boards: Board[];
  onEdit: (data: Board) => void;
  onRemove: (data: Board) => void;
}

export const BoardsList: React.FC<Props> = ({ boards, ...props }) => {

  if (boards.length === 0) return <ErrorMessage message="List is empty" />
  
  return (
    <VStack align="stretch" spacing={6}>
      {boards.map((board) => (
        <BoardCard key={board._id} board={board} {...props} />
      ))}
    </VStack>
  );
};
