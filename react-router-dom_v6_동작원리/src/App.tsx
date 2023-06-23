import Home from 'pages/Home'
import List from 'pages/List'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ContextRoutes from 'react-router-dom/routesContext'

function App() {
  return (
    <ContextRoutes>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </BrowserRouter>
    </ContextRoutes>
  )
}

export default App
