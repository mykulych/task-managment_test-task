import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
  chakra,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Todo, TodoStatus } from "../../types/todo";
import { FaEdit, FaTrash } from "react-icons/fa";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

const CFaEdit = chakra(FaEdit);
const CFaTrash = chakra(FaTrash);

interface Props {
  todo: Todo;
  index: number;
  column: TodoStatus;
  moveCard: (dragIndex: number, hoverIndex: number, item: Item) => void;
  onEdit: (data: Todo) => void;
  onRemove: (data: Todo) => void;
}

interface Item extends Todo {
  index: number;
}

export const TodoCard: React.FC<Props> = ({ todo, index, column, moveCard, onEdit, onRemove }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ handlerId }, drop] = useDrop({
    accept: "todo",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: Item, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex && item.status === column) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top
    
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveCard(dragIndex, hoverIndex, {...item})
      
      item.status = column;
      item.index = hoverIndex
    }
  });

  const [_, drag] = useDrag({
    type: "todo",
    item: {...todo, index},
  });

  drag(drop(ref));
  
  return (
    <Card
      ref={ref}
      w="100%"
      h={"fit-content"}
      minH="100px"
      boxShadow="1px 4px 11px -2px rgba(135,135,135,0.75)"
      data-handler-id={handlerId}
      cursor="move"
      draggable
    >
      <CardHeader>{todo.title}</CardHeader>
      <CardBody transform="translate(0, 0)">
        <Text>{todo.description}</Text>
      </CardBody>
      <CardFooter justifyContent="flex-end" gap={4}>
        <Button onClick={() => onEdit(todo)}>
          <CFaEdit />
        </Button>
        <Button onClick={() => onRemove(todo)}>
          <CFaTrash />
        </Button>
      </CardFooter>
    </Card>
  );
};
