import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum TodoStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
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

export interface StructuredTodos {
  [TodoStatus.TODO]: Todo[];
  [TodoStatus.IN_PROGRESS]: Todo[];
  [TodoStatus.DONE]: Todo[];
}

export const TodoSchema = SchemaFactory.createForClass(Todo);