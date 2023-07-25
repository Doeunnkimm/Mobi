import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/Home/Home'
import PostListPage from '../pages/Post/List/Post.List'
import PostDetailPage from '../pages/Post/Detail/Post.Detail'

const router = createBrowserRouter([
	{ path: '/', element: <HomePage /> },
	{ path: '/posts', element: <PostListPage /> },
	{ path: '/post-detail/:postId', element: <PostDetailPage /> },
])

export default router
