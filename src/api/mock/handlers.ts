// src/api/mock/handlers.ts
import { http, HttpResponse } from "msw"

const VALID_USERNAME = "admin"
const VALID_PASSWORD = "admin"

let todos = [
  { id: "1", title: "Buy milk", completed: false },
  { id: "2", title: "Read Zustand docs", completed: true },
]

export const handlers = [
  // Login endpoint
  http.post("/api/login", async ({ request }) => {
    const { username, password } = await request.json()

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      return HttpResponse.json({
        id: "1",
        username,
        token: "fake-jwt-token",
      })
    }

    return new HttpResponse("Invalid credentials", { status: 401 })
  }),

  // Get todos
  http.get("/api/todos", ({ request }) => {
    const auth = request.headers.get("authorization")
    if (auth !== "Bearer fake-jwt-token") {
      return new HttpResponse("Unauthorized", { status: 401 })
    }

    return HttpResponse.json(todos)
  }),

  http.post("/api/todos", async ({ request }) => {
    const { title } = await request.json()
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    }
    todos.push(newTodo)
    return HttpResponse.json(newTodo)
  }),

  http.delete("/api/todos/:id", ({ params }) => {
    const id = params.id as string
    todos = todos.filter((t) => t.id !== id)
    return new HttpResponse(null, { status: 204 })
  }),

  http.patch("/api/todos/:id", ({ params }) => {
    const id = params.id as string
    const todo = todos.find((t) => t.id === id)
    if (!todo) return new HttpResponse("Not found", { status: 404 })

    todo.completed = !todo.completed
    return HttpResponse.json(todo)
  }),
]
