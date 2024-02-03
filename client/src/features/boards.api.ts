import { Board } from "../types/board";
import { api } from "./api";

export const boardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBoards: build.query<Board[], void>({
      query: () => "boards",
      providesTags: ["Board"]
    }),
    createBoard: build.mutation<Board, Partial<Board>>({
      query: (body) => ({
        url: "boards",
        method: "POST",
        body
      }),
      invalidatesTags: ["Board"]
    }),
    updateBoard: build.mutation<Board, Partial<Board>>({
      query: (body) => ({
        url: `boards/${body._id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Board"]
    }),
    removeBoard: build.mutation<Board, string>({
      query: (id) => ({
        url: `boards/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Board"]
    })
  })
});

export const { useGetBoardsQuery, useCreateBoardMutation, useUpdateBoardMutation, useRemoveBoardMutation } = boardApi;
