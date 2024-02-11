import React, { ReactNode } from "react";
import { StructuredTodos, Todo, TodoStatus } from "../../types/todo";
import { Box, Flex, Text } from "@chakra-ui/react";
import { TodoCard } from "./todoCard";
import { useDrop } from "react-dnd";

interface Props {
  todos: StructuredTodos;
  onEdit: (data: Todo) => void;
  onRemove: (data: Todo) => void;
  handleMoveCard: (dragIndex: number, hoverIndex: number, status: TodoStatus, todo: Todo) => void;
  addCardToColumn: (todo: Todo, status: TodoStatus) => void;
}

interface ColumnProps {
  name: string;
  colId: TodoStatus;
  children: ReactNode;
  handleDrop: (todo: Todo) => void;
}

export const TodosList: React.FC<Props> = ({ todos, handleMoveCard, addCardToColumn, ...props }) => {
  const statuses = [TodoStatus.TODO, TodoStatus.IN_PROGRESS, TodoStatus.DONE]

  return (
    <Flex w="100%" h="100%" gap="40px">
      {statuses.map((status) => (
        <Column
          name={status}
          colId={status}
          handleDrop={(item) => addCardToColumn(item, status)}
        >
          {todos[status].map((todo, index) => (
            <TodoCard
              todo={todo}
              index={index}
              {...props}
              column={status}
              moveCard={(dragIndex, hoverIndex, item) => {
                handleMoveCard(dragIndex, hoverIndex, status, item);
              }}
            />
          ))}
        </Column>
      ))}
    </Flex>
  );
}

const Column: React.FC<ColumnProps> = ({ name, handleDrop, children }) => {
  const childrenLength = React.Children.count(children);
  const [{ isOver }, drop] = useDrop({
    accept: "todo",
    drop: (item: Todo) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box w="33.3%" ref={!childrenLength ? drop : null}>
      <Text textAlign="center" fontSize="xl" fontWeight="700" mb={4}>
        {name}
      </Text>
      <Box
        visibility={isOver ? "visible" : "hidden"}
        w="100%"
        h="4px"
        bg="#707070"
        mb={30}
      ></Box>
      <Flex flexDir="column" gap={4}>
        {children}
      </Flex>
    </Box>
  );
};
