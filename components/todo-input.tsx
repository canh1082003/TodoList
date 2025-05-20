"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "@/lib/features/todos/todosSlice"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function TodoInput() {
  const [text, setText] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch(addTodo(text))
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Thêm công việc mới..."
        className="flex-1"
      />
      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
        <PlusCircle className="h-5 w-5 mr-1" />
        Thêm
      </Button>
    </form>
  )
}
