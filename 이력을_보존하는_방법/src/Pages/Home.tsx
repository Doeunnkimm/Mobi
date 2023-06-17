import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Home Page 🏠</h1>
      <button onClick={() => navigate('/board')}>Board 페이지로 이동</button>
    </div>
  )
}
export default Home
