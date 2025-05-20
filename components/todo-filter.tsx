"use client"

import { useDispatch, useSelector } from "react-redux"
import { setFilter, selectFilter } from "@/lib/features/todos/todosSlice"
import type { FilterType } from "@/lib/features/todos/types"
import { Button } from "@/components/ui/button"

export default function TodoFilter() {
  const currentFilter = useSelector(selectFilter)
  const dispatch = useDispatch()

  const handleFilterChange = (filter: FilterType) => {
    dispatch(setFilter(filter))
  }

  return (
    <div className="flex gap-2 mb-4">
      <Button
        variant={currentFilter === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => handleFilterChange("all")}
        className={currentFilter === "all" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
      >
        Tất cả
      </Button>
      <Button
        variant={currentFilter === "active" ? "default" : "outline"}
        size="sm"
        onClick={() => handleFilterChange("active")}
        className={currentFilter === "active" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
      >
        Chưa hoàn thành
      </Button>
      <Button
        variant={currentFilter === "completed" ? "default" : "outline"}
        size="sm"
        onClick={() => handleFilterChange("completed")}
        className={currentFilter === "completed" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
      >
        Đã hoàn thành
      </Button>
    </div>
  )
}
