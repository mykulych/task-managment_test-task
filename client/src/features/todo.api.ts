import { StructuredTodos, Todo } from "../types/todo";
import { api } from "./api";

interface TodoPayload {
  title: string;
  description: string;
  board_id?: string;
}

export const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<StructuredTodos, string | undefined>({
      query: (board_id) => `todos/${board_id}`,
      providesTags: ["Todo"],
    }),
    createTodo: build.mutation<Todo, TodoPayload>({
      query: (todo) => ({
        url: "todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: build.mutation<Todo, { id: string; todo: TodoPayload }>({
      query: ({ id, todo }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    changeStatus: build.mutation<Todo, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `todos/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Todo"],
    }),
    removeTodo: build.mutation<Todo, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useChangeStatusMutation,
  useRemoveTodoMutation,
} = todoApi;
