import { http } from "@/lib/http"
import type { User } from "@/types/user"

export async function loginRequest(username: string, password: string): Promise<User> {
  return await http.post("login", { json: { username, password } }).json()
}
