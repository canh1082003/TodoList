"use client"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import TodoHeader from "./todo-header"
import TodoInput from "./todo-input"
import TodoList from "./todo-list"
import TodoFilter from "./todo-filter"

export default function TodoApp() {
  return (
    <Provider store={store}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <TodoHeader />
        <div className="p-4 sm:p-6">
          <TodoInput />
          <TodoFilter />
          <TodoList />
        </div>
      </div>
    </Provider>
  )
}
