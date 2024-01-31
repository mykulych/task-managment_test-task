import { IsEnum, IsNotEmpty } from "class-validator";
import { TodoStatus } from "../schemas/todo.schema";

export class UpdateTodoStatusDto {
  @IsNotEmpty()
  @IsEnum(TodoStatus, { message: "Please enter a valid status"})
  readonly status: TodoStatus;
}