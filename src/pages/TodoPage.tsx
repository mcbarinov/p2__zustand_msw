import { useEffect, useState } from "react"
import { fetchTodos } from "@/api/todos"
import { useTodos } from "@/stores/useTodos"
import { TodoItem } from "@/components/TodoItem"
import { TodoInput } from "@/components/TodoInput"

export function TodoPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const todos = useTodos((s) => s.todos)
  const setTodos = useTodos((s) => s.setTodos)

  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .catch(() => setError("Failed to load todos"))
      .finally(() => setLoading(false))
  }, [setTodos])

  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      <h1 className="text-2xl font-bold">My Tasks</h1>

      <TodoInput />

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="space-y-2">
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} />
        ))}
      </div>
    </div>
  )
}
