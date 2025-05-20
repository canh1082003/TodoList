"use client"

import { useSelector } from "react-redux"
import { selectCompletedTodos, selectTodos } from "@/lib/features/todos/todosSlice"

export default function TodoHeader() {
  const todos = useSelector(selectTodos)
  const completedTodos = useSelector(selectCompletedTodos)

  return (
    <div className="bg-emerald-600 text-white p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-2">Todo App</h1>
      <div className="flex justify-between text-emerald-100">
        <p>Tổng số: {todos.length}</p>
        <p>Hoàn thành: {completedTodos.length}</p>
      </div>
    </div>
  )
}
