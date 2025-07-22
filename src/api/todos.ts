import { http } from "@/lib/http"
import { type Todo } from "@/types/todo"

export async function fetchTodos(): Promise<Todo[]> {
  return await http.get("todos").json()
}

export async function deleteTodo(id: string): Promise<void> {
  await http.delete(`todos/${id}`)
}

export async function toggleTodo(id: string): Promise<Todo> {
  return await http.patch(`todos/${id}`, { json: {} }).json()
}

export async function createTodo(title: string): Promise<Todo> {
  return await http.post("todos", { json: { title } }).json()
}
