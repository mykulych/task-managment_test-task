import React, { useState } from "react";
import { Board } from "../../types/board";
import { Button, Card, CardBody, Flex, Text, chakra } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const CFaEdit = chakra(FaEdit);
const CFaTrash = chakra(FaTrash);

interface Props {
  board: Board;
  onEdit: (data: Board) => void;
  onRemove: (data: Board) => void;
}

export const BoardCard: React.FC<Props> = ({ board, onEdit, onRemove }) => {
  const [show, setShow] = useState(false);

  return (
    <Link to={`/${board._id}`}>
      <Card
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <CardBody>
          <Flex justifyContent="space-between">
            <Text>{board.name}</Text>
            <Flex visibility={show ? "visible" : "hidden"} gap={4}>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  onEdit(board);
                }}
              >
                <CFaEdit />
              </Button>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  onRemove(board);
                }}
              >
                <CFaTrash />
              </Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Link>
  );
};