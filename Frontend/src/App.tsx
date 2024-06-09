import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, About } from "./pages"
import { Header } from "./components"

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
