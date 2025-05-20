"use client"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useDispatch, useSelector } from "react-redux"
import { reorderTodos, selectFilteredTodos } from "@/lib/features/todos/todosSlice"
import TodoItem from "./todo-item"
import { AlertCircle } from "lucide-react"

function SortableTodoItem({ todo }: { todo: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "8px",
    background: "#f1f5f9",
    userSelect: "none",
  }
  return (
    <li ref={setNodeRef} style={style}>
      <TodoItem todo={todo} dragHandleProps={{ ...listeners, ...attributes }} />
    </li>
  )
}
export default function TodoList() {
  const todos = useSelector(selectFilteredTodos)
  const dispatch = useDispatch()
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((t: any) => t.id === active.id)
      const newIndex = todos.findIndex((t: any) => t.id === over.id)
      dispatch(reorderTodos({ from: oldIndex, to: newIndex }))
    }
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p>Không có công việc nào</p>
      </div>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={todos.map((t: any) => t.id)} strategy={verticalListSortingStrategy}>
        <ul>
          {todos.map((todo: any) => (
            <SortableTodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}