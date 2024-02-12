export enum TodoStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Todo {
  _id: string;
  board_id: string;
  title: string;
  description?: string;
  status: TodoStatus;
}

export interface StructuredTodos {
  [TodoStatus.TODO]: Todo[];
  [TodoStatus.IN_PROGRESS]: Todo[];
  [TodoStatus.DONE]: Todo[];
}
