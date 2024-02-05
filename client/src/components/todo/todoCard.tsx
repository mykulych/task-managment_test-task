import { Button, Card, CardBody, CardFooter, Text, chakra } from "@chakra-ui/react";
import React from "react";
import { Todo } from "../../types/todo";
import { FaEdit, FaTrash } from "react-icons/fa";

const CFaEdit = chakra(FaEdit);
const CFaTrash = chakra(FaTrash);

interface Props {
  todo: Todo;
  onEdit: (data: Todo) => void;
  onRemove: (data: Todo) => void;
}

export const TodoCard: React.FC<Props> = ({ todo, onEdit, onRemove }) => {
  return <Card w="100%" h="200px">
    <CardBody>
      <Text>{todo.title}</Text>
      <Text>{todo.description}</Text>
    </CardBody>
    <CardFooter justifyContent="flex-end" gap={4}>
      <Button onClick={() => onEdit(todo)}><CFaEdit /></Button>
      <Button onClick={() => onRemove(todo)}><CFaTrash /></Button>
    </CardFooter>
  </Card>
}
