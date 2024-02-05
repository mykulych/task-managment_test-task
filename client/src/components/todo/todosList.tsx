import React, { ReactNode } from "react";
import { StructuredTodos, Todo, TodoStatus } from "../../types/todo";
import { Box, Flex, Text } from "@chakra-ui/react";
import { TodoCard } from "./todoCard";

interface Props {
  todos: StructuredTodos;
  onEdit: (data: Todo) => void;
  onRemove: (data: Todo) => void;
}

interface ColumnProps {
  name: string;
  children: ReactNode;
}

export const TodosList: React.FC<Props> = ({ todos, ...props }) => {
  return <Flex w="100%" h="100%">
    <Column name="To Do">
      {todos[TodoStatus.TODO].map((todo) => <TodoCard todo={todo} {...props} />)}
    </Column>
    <Column name="In Progress">
      {todos[TodoStatus.IN_PROGRESS].map((todo) => <TodoCard todo={todo} {...props} />)}
    </Column>
    <Column name="Done">
      {todos[TodoStatus.DONE].map((todo) => <TodoCard todo={todo} {...props} />)}
    </Column>
  </Flex>
}

const Column: React.FC<ColumnProps> = ({ name, children }) => {
  return <Box w="33.3%">
    <Text textAlign="center" fontSize="xl" fontWeight="700" mb={30}>{name}</Text>
    <Flex flexDir="column" gap={4}>
      {children}
    </Flex>
  </Box>
}
