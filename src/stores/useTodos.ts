import { create } from "zustand"
import { type Todo } from "@/types/todo"
import { createTodo, deleteTodo, toggleTodo } from "@/api/todos"

type TodosState = {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
  addTodo: (title: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
}

export const useTodos = create<TodosState>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: async (title) => {
    try {
      const newTodo = await createTodo(title)
      set((state) => ({
        todos: [...state.todos, newTodo],
      }))
    } catch {
      console.error("Failed to add todo")
    }
  },
  toggleTodo: async (id) => {
    try {
      const updated = await toggleTodo(id)
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updated : t)),
      }))
    } catch {
      console.error("Failed to toggle todo")
    }
  },
  removeTodo: async (id) => {
    try {
      await deleteTodo(id)
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }))
    } catch {
      console.error("Failed to delete todo")
    }
  },
}))
