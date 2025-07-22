import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./app/App.tsx"

async function enableMSW() {
  if (import.meta.env.DEV) {
    const { worker } = await import("@/api/mock/browser")
    await worker.start()
  }
}

enableMSW().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})
