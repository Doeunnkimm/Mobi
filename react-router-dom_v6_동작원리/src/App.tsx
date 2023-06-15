import Home from './pages/Home'
import Melon from './pages/Melon'
import createRouter from './router'

function App() {
  const pages = {
    home: () => <Home />,
    melon: () => <Melon />,
  }
  const router = createRouter()
  router.addRoute('#/', pages.home).addRoute('#/melon', pages.melon).start()

  return (
    <>
      <header>
        <a href="#/">home</a>
        <a href="#/melon">melon</a>
      </header>
      <main></main>
    </>
  )
}

export default App
