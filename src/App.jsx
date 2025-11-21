import HomePage from "@/pages/Home"
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div>
      <HomePage />
      <Analytics />
    </div>
  )
}

export default App