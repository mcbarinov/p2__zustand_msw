import { useState } from "react"
import { useTodos } from "@/stores/useTodos"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function TodoInput() {
  const [title, setTitle] = useState("")
  const add = useTodos((s) => s.addTodo)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    add(title.trim())
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input placeholder="New task..." value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button type="submit">Add</Button>
    </form>
  )
}
