
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { StructuredTodos, Todo, TodoStatus } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get("/:board_id")
  async getTodos(@Param("board_id") board_id: string): Promise<StructuredTodos> {
    return this.todosService.findAll(board_id);
  }

  @Post()
  async createTodo(
    @Body()
    todo: CreateTodoDto,
  ): Promise<Todo> {
    return this.todosService.create(todo);
  }

  @Patch("/:id")
  async updateTodo(
    @Param("id") id: string,
    @Body() todo: UpdateTodoDto
  ): Promise<Todo> {
    return this.todosService.update(id, todo);
  }
  
  @Patch("/status/:id")
  async changeTodoStatus(
    @Param("id") id: string,
    @Body() { status }: UpdateTodoStatusDto
  ): Promise<Todo> {
    return this.todosService.changeStatus(id, status);
  }

  @Delete("/:id")
  async deleteTodo(
    @Param("id") id: string
  ): Promise<Todo> {
    return this.todosService.delete(id);
  }
    
}
