import { IsOptional, IsString } from "class-validator";

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}