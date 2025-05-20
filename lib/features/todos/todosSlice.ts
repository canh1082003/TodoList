import {
  createSlice,
  type PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import type { Todo, TodosState, FilterType } from "./types";
import type { RootState } from "@/lib/store";
import { formatDateTime } from "@/components/formatDate";

const getInitialState = (): TodosState => {
  if (typeof window !== "undefined") {
    try {
      const todos = localStorage.getItem("todos");
      const filter = localStorage.getItem("filter");
      return {
        todos: todos ? JSON.parse(todos) : [],
        filter: filter ? (filter as FilterType) : "all",
      };
    } catch {
      return { todos: [], filter: "all" };
    }
  }
  return { todos: [], filter: "all" };
};
const initialState: TodosState = getInitialState();

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      },
      prepare: (text: string): { payload: Todo } => {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
            createdAt: formatDateTime(new Date()),
          },
        };
      },
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    reorderTodos: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const [removed] = state.todos.splice(from, 1);
      state.todos.splice(to, 0, removed);
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  editTodo,
  setFilter,
  reorderTodos,
} = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectFilter = (state: RootState) => state.todos.filter;

export const selectCompletedTodos = createSelector(
  (state: RootState) => state.todos.todos,
  (todos) => todos.filter((todo) => todo.completed)
);

export const selectFilteredTodos = createSelector(
  (state: RootState) => state.todos.todos,
  (state: RootState) => state.todos.filter,
  (todos, filter) => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }
);

export default todosSlice.reducer;

if (typeof window !== "undefined") {
  import("@/lib/store").then(({ store }) => {
    store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem("todos", JSON.stringify(state.todos.todos));
      localStorage.setItem("filter", state.todos.filter);
    });
  });
}
