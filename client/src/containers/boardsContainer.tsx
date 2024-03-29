import React, { useRef } from "react";
import { useGetBoardsQuery } from "../features/boards.api";
import { BoardsList } from "../components/board/boardsList";
import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { CreateBoardModal } from "../components/modals/board/createBoardModal";
import { UpdateBoardModal } from "../components/modals/board/updateBoardModal";
import { RemoveBoardModal } from "../components/modals/board/removeBoardModal";
import { Board } from "../types/board";
import { LoadingIndicator } from "../components/loadingIndicator";
import { ErrorMessage } from "../components/errorMessage";

export const BoardsContainer: React.FC = () => {
  const { data = [], isFetching, isError } = useGetBoardsQuery();
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const removeModal = useDisclosure();
  const selectedBoard = useRef<Board>({ _id: "", name: "" });

  const onEdit = (data: Board) => {
    selectedBoard.current = data;
    updateModal.onOpen();
  };

  const onRemove = (data: Board) => {
    selectedBoard.current = data;
    removeModal.onOpen();
  };

  if (isFetching) return <LoadingIndicator />

  if (isError) return <ErrorMessage message="Something went wrong, try again later!" />

  return (
    <>
      <CreateBoardModal {...createModal} />
      <UpdateBoardModal {...updateModal} selectedBoard={selectedBoard.current} />
      <RemoveBoardModal {...removeModal} selectedBoardId={selectedBoard.current._id} />
      <Flex justifyContent="space-between" alignItems="center" py={5} mb={10}>
        <Heading fontSize="2xl">Boards</Heading>
        <Button colorScheme="teal" onClick={createModal.onOpen}>
          Create new board
        </Button>
      </Flex>
      <Box px={10}>
        <BoardsList boards={data} {...{ onEdit, onRemove }} />
      </Box>
    </>
  );
};
