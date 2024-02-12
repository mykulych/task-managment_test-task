import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useChangeStatusMutation, useGetTodosQuery, useUpdateOrderMutation } from "../features/todo.api";
import { TodosList } from "../components/todo/todosList";
import { Button, Flex, Heading, Text, chakra, useDisclosure, useToast } from "@chakra-ui/react";
import { StructuredTodos, Todo, TodoStatus } from "../types/todo";
import { CreateTodoModal } from "../components/modals/todo/createTodoModal";
import { UpdateTodoModal } from "../components/modals/todo/updateTodoModal";
import { RemoveTodoModal } from "../components/modals/todo/removeTodoModal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useGetBoardByIdQuery } from "../features/boards.api";
import update from "immutability-helper";

const CFaArrowLeft = chakra(FaArrowLeft);
const CFaArrowRight = chakra(FaArrowRight);

export const TodoContainer: React.FC = () => {
  const {boardId} = useParams();
  const { data: board } = useGetBoardByIdQuery(boardId, { skip: !boardId });
  const { data, isFetching } = useGetTodosQuery(boardId, { skip: !boardId });
  const [changeStatus] = useChangeStatusMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [todos, setTodos] = useState<StructuredTodos>(data || {[TodoStatus.TODO]: [], [TodoStatus.IN_PROGRESS]: [], [TodoStatus.DONE]: []})
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const removeModal = useDisclosure();
  const selectedTodo = useRef<Todo>({ _id: "", title: "", description: "", board_id: "", status: TodoStatus.TODO });
  const errToast = useToast({ status: "error" });

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  const addCardToColumn = (todo: Todo, newStatus: TodoStatus) => {
    if (todo.status === newStatus) return;

    const prev = { ...todos };
    
    const newTodos = { ...prev, [newStatus]: [...prev[newStatus], {...todo, status: newStatus}] };
    const filteredStatus = newTodos[todo.status].filter((t) => t._id !== todo._id);
    newTodos[todo.status] = filteredStatus;
    
    setTodos(newTodos);

    changeStatusHandler(todo._id, newStatus);

    const ids = getTodosId(newTodos);
    updateOrderHandler(ids);
  };

  const handleMoveCard = (dragIndex: number, hoverIndex: number, newStatus: TodoStatus, todo: Todo) => {
    const sourceStatus = todo.status;
    const destinationStatus = newStatus;

    if (newStatus !== todo.status) {
      changeStatusHandler(todo._id, newStatus);
    }

    const prev = { ...todos };
    
    const draggedItem ={ ...prev[sourceStatus][dragIndex], status: newStatus};

    // Remove the dragged item from the source column
    const updatedSource = {
      ...prev,
      [sourceStatus]: [
        ...prev[sourceStatus].slice(0, dragIndex),
        ...prev[sourceStatus].slice(dragIndex + 1),
      ],
    };
  
    // Insert the dragged item at the specified position in the destination column
    const updatedDestination = update(updatedSource, {
      [destinationStatus]: { $splice: [[hoverIndex, 0, draggedItem]] },
    });

    setTodos(updatedDestination);

    const ids = getTodosId(updatedDestination);
    updateOrderHandler(ids);
  }

  
  const onEdit = (data: Todo) => {
    selectedTodo.current = data;
    updateModal.onOpen();
  };
  
  const onRemove = (data: Todo) => {
    selectedTodo.current = data;
    removeModal.onOpen();
  };


  const updateOrderHandler = (ids: string[]) =>
    updateOrder({ ids })
      .unwrap()
      .catch((err) => {
        if (data) {
          setTodos(data);
        }
        errToast({ title: err?.data?.message || "An error occurred" });
      });

  const changeStatusHandler = (todoId: string, status: TodoStatus) =>
    changeStatus({ id: todoId, status })
      .unwrap()
      .catch((err) => {
        if (data) {
          setTodos(data);
        }
        errToast({ title: err?.data?.message || "An error occurred" });
      });
  
  const getTodosId = (todos: StructuredTodos) => Object.values(todos).map((t) => t.map((i: Todo) => i._id)).flat();
  
  if (isFetching) return <div>Loading...</div>
  
  if (!data) return <div>No data</div>

  return (
    <>
      <CreateTodoModal {...createModal} />
      <UpdateTodoModal {...updateModal} selectedTodo={selectedTodo.current} />
      <RemoveTodoModal
        {...removeModal}
        selectedTodoId={selectedTodo.current._id}
      />
      <Link to="/">
        <Flex alignItems="center" gap={2}>
          <CFaArrowLeft />
          <Text fontSize="xl" fontWeight="700">
            Back
          </Text>
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
      <TodosList
        todos={todos}
        {...{ onEdit, onRemove, addCardToColumn, handleMoveCard }}
      />
    </>
  );
};
