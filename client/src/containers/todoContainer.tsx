import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetTodosQuery } from "../features/todo.api";
import { TodosList } from "../components/todo/todosList";
import { Button, Flex, Heading, Text, chakra, useDisclosure } from "@chakra-ui/react";
import { Todo, TodoStatus } from "../types/todo";
import { CreateTodoModal } from "../components/modals/todo/createTodoModal";
import { UpdateTodoModal } from "../components/modals/todo/updateTodoModal";
import { RemoveTodoModal } from "../components/modals/todo/removeTodoModal";
import { FaArrowLeft } from "react-icons/fa";

const CFaArrowLeft = chakra(FaArrowLeft);

export const TodoContainer: React.FC = () => {
  const {boardId} = useParams();
  const { data, isFetching } = useGetTodosQuery(boardId, { skip: !boardId })
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const removeModal = useDisclosure();
  const selectedTodo = useRef<Todo>({ _id: "", title: "", description: "", board_id: "", status: TodoStatus.TODO });

  const onEdit = (data: Todo) => {
    selectedTodo.current = data;
    updateModal.onOpen();
  };

  const onRemove = (data: Todo) => {
    selectedTodo.current = data;
    removeModal.onOpen();
  };

  if (isFetching) return <div>Loading...</div>

  if (!data) return <div>No data</div>

  return <>
    <CreateTodoModal {...createModal} />
    <UpdateTodoModal {...updateModal} selectedTodo={selectedTodo.current} />
    <RemoveTodoModal {...removeModal} selectedTodoId={selectedTodo.current._id} />
    <Link to="/">
      <Flex alignItems="center" gap={2}>
        <CFaArrowLeft /> 
        <Text fontSize="xl" fontWeight="700">Back</Text>
      </Flex>
    </Link>
    <Flex justifyContent="space-between" alignItems="center" py={5}>
      <Heading fontSize="2xl">Todos</Heading>
      <Button colorScheme="teal" onClick={createModal.onOpen}>
        Create new todo
      </Button>
    </Flex>
    <TodosList todos={data} {...{ onEdit, onRemove }} />
  </>
}