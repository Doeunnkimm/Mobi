import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/Home/Home'
import PostListPage from '../pages/Post.list'
import PostDetailPage from '../pages/Post.detail'

const router = createBrowserRouter([
	{ path: '/', element: <HomePage /> },
	{ path: '/posts', element: <PostListPage /> },
	{ path: '/post-detail/:postId', element: <PostDetailPage /> },
])

export default router
