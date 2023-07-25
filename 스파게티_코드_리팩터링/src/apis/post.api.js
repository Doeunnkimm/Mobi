import axios from 'axios'

export const postApi = {
	getPostDetail: async () => await axios.get('/api/post'),
	getComment: async ({ params }) =>
		await axios.get('/api/comments', { params }),
}
