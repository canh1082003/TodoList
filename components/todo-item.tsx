"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { toggleTodo, removeTodo, editTodo } from "@/lib/features/todos/todosSlice"
import type { Todo } from "@/lib/features/todos/types"
import { Trash2, Edit2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"


interface TodoItemProps {
  todo: Todo
  dragHandleProps?: React.HTMLAttributes<HTMLSpanElement>
}
export default function TodoItem({ todo, dragHandleProps }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(todo.text)
  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id))
  }

  const handleRemove = () => {
    dispatch(removeTodo(todo.id))
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedText.trim()) {
      dispatch(editTodo({ id: todo.id, text: editedText }))
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditedText(todo.text)
    setIsEditing(false)
  }

  return (
    <div className={`flex items-center p-3 rounded-lg border ${todo.completed ? "bg-gray-50" : "bg-gray-100"}`}>
      <span
        {...dragHandleProps}
        style={{
          cursor: "grab",
          marginRight: 12,
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          userSelect: "none",
        }}
        title="Kéo để di chuyển"
      >☰</span>
      <Checkbox checked={todo.completed} onCheckedChange={handleToggle} className="mr-3" />

      {isEditing ? (
        <div className="flex flex-1 gap-2">
          <Input value={editedText} onChange={(e) => setEditedText(e.target.value)} className="flex-1" autoFocus />
          <Button size="icon" variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            className="text-green-600  hover:text-green-700  ml-2">
            Sửa<Check className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }} className="text-red-600 hover:text-red-700 ml-4">
            Xóa<X className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <>

          <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.text}</span>
          {/* <p >{todo.createdAt}</p> */}

          <div className="flex gap-1">
            <Button size="icon" variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              className="text-blue-600 hover:text-blue-700 ml-2">
              Sửa <Edit2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }} className="text-red-600 hover:text-red-700 ml-4">
              Xóa <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
