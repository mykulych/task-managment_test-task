import { IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}