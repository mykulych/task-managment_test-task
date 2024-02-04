import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum TodoStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface StructuredTodos {
  [TodoStatus.TODO]: Todo[];
  [TodoStatus.IN_PROGRESS]: Todo[];
  [TodoStatus.DONE]: Todo[];
}

@Schema({
  timestamps: true,
})
export class Todo {

  @Prop()
  board_id?: string;
  
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status?: TodoStatus;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);