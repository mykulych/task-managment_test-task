import { TodosService } from './todos.service';
import { StructuredTodos, Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';
export declare class TodosController {
    private todosService;
    constructor(todosService: TodosService);
    getTodos(board_id: string): Promise<StructuredTodos>;
    createTodo(todo: CreateTodoDto): Promise<Todo>;
    updateTodo(id: string, todo: UpdateTodoDto): Promise<Todo>;
    changeTodoStatus(id: string, { status }: UpdateTodoStatusDto): Promise<Todo>;
    updateTodoOrder({ ids }: {
        ids: string[];
    }): Promise<{
        success: boolean;
    }>;
    deleteTodo(id: string): Promise<Todo>;
}
