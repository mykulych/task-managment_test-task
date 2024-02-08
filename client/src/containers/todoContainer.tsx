import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useChangeStatusMutation, useGetTodosQuery } from "../features/todo.api";
import { TodosList } from "../components/todo/todosList";
import { Button, Flex, Heading, Text, chakra, useDisclosure, useToast } from "@chakra-ui/react";
import { StructuredTodos, Todo, TodoStatus } from "../types/todo";
import { CreateTodoModal } from "../components/modals/todo/createTodoModal";
import { UpdateTodoModal } from "../components/modals/todo/updateTodoModal";
import { RemoveTodoModal } from "../components/modals/todo/removeTodoModal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useGetBoardByIdQuery } from "../features/boards.api";

const CFaArrowLeft = chakra(FaArrowLeft);
const CFaArrowRight = chakra(FaArrowRight);

export const TodoContainer: React.FC = () => {
  const {boardId} = useParams();
  const { data: board } = useGetBoardByIdQuery(boardId, { skip: !boardId });
  const { data, isFetching } = useGetTodosQuery(boardId, { skip: !boardId });
  const [changeStatus] = useChangeStatusMutation();
  const [todos, setTodos] = useState<StructuredTodos>(data || {[TodoStatus.TODO]: [], [TodoStatus.IN_PROGRESS]: [], [TodoStatus.DONE]: []})
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const removeModal = useDisclosure();
  const selectedTodo = useRef<Todo>({ _id: "", title: "", description: "", board_id: "", status: TodoStatus.TODO });
  const errToast = useToast({ status: "error" })

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data])

  const handleAddItemToColumn = (todo: Todo, newStatus: TodoStatus) => {
    if (todo.status === newStatus) return;
    
    setTodos(prev => {
      const newTodos = { ...prev, [newStatus]: [...prev[newStatus], {...todo, status: newStatus}] };
      const filteredStatus = newTodos[todo.status].filter((t) => t._id !== todo._id);
      newTodos[todo.status] = filteredStatus;
      return newTodos;
    })

    changeStatus({ id: todo._id, status: newStatus })
      .unwrap()
      .catch((err) => {
        if (data) {
          setTodos(data)
        }
        errToast({ title: err?.data?.message || "An error occurred" })
      })
  }

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
    <Flex justifyContent="space-between" alignItems="center" py={5} mb={10}>
      <Heading fontSize="2xl">
        <Flex alignItems="center" gap={4}>
          {board?.name}
          <CFaArrowRight size={20} />
          Todos
        </Flex>
      </Heading>
      <Button colorScheme="teal" onClick={createModal.onOpen}>
        Create new todo
      </Button>
    </Flex>
    <TodosList todos={todos} {...{ onEdit, onRemove, handleAddItemToColumn }} />
  </>
};
