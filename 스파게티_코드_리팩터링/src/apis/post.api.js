import axios from 'axios'

export const postApi = {
	getPostList: async ({ params }) => await axios.get('/api/posts', { params }),
	getPostDetail: async () => await axios.get('/api/post'),
	getComment: async ({ params }) =>
		await axios.get('/api/comments', { params }),
}
