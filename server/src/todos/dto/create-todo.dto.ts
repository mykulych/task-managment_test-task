import { IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  readonly board_id: string;
  
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  readonly description: string;
}