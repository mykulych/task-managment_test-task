import { Button, Card, CardBody, CardFooter, CardHeader, Text, chakra } from "@chakra-ui/react";
import React from "react";
import { Todo } from "../../types/todo";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDrag } from "react-dnd";

const CFaEdit = chakra(FaEdit);
const CFaTrash = chakra(FaTrash);

interface Props {
  todo: Todo;
  onEdit: (data: Todo) => void;
  onRemove: (data: Todo) => void;
}

export const TodoCard: React.FC<Props> = ({ todo, onEdit, onRemove }) => {
  const [{isDragging}, drag] = useDrag({
    type: "todo",
    item: todo,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return <Card w="100%" h={"fit-content"} minH="100px" ref={drag} boxShadow="1px 4px 11px -2px rgba(135,135,135,0.75)" opacity={isDragging ? 0 : 1} transform="translate3d(-50%, -50%)">
    <CardHeader>{todo.title}</CardHeader>
    <CardBody transform="translate(0, 0)">
      <Text>{todo.description}</Text>
    </CardBody>
    <CardFooter justifyContent="flex-end" gap={4}>
      <Button onClick={() => onEdit(todo)}><CFaEdit /></Button>
      <Button onClick={() => onRemove(todo)}><CFaTrash /></Button>
    </CardFooter>
  </Card>
};
