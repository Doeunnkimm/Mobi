import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Board from './Pages/Board'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
