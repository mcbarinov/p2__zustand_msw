import ky from "ky"

export const http = ky.create({
  prefixUrl: "/new-api",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token")
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`)
        }
      },
    ],
  },
})
