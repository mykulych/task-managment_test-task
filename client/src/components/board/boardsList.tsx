import React from "react";
import { Board } from "../../types/board";
import { VStack } from "@chakra-ui/react";
import { BoardCard } from "./boardCard";

interface Props {
  boards: Board[];
  onEdit: (data: Board) => void;
  onRemove: (data: Board) => void;
}

export const BoardsList: React.FC<Props> = ({ boards, ...props }) => {
  return (
    <VStack align="stretch" spacing={6}>
      {boards.map((board) => (
        <BoardCard key={board._id} board={board} {...props} />
      ))}
    </VStack>
  );
};
