import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <h1>Home Page 🏠</h1>
      <Link to={'/list'}>List 페이지로 이동하기</Link>
    </>
  )
}
export default Home
