import type { Todo } from "@/types/todo"
import { useTodos } from "@/stores/useTodos"
import { Button } from "@/components/ui/button"

type Props = {
  todo: Todo
}

export function TodoItem({ todo }: Props) {
  const toggle = useTodos((s) => s.toggleTodo)
  const remove = useTodos((s) => s.removeTodo)

  return (
    <div className="flex items-center justify-between border p-2 rounded">
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={todo.completed} onChange={() => toggle(todo.id)} />
        <span className={todo.completed ? "line-through text-gray-500" : ""}>{todo.title}</span>
      </label>
      <Button size="sm" variant="destructive" onClick={() => remove(todo.id)}>
        Delete
      </Button>
    </div>
  )
}
