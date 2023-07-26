import { useSearchParams } from 'react-router-dom'
import { postApi } from '../../../../apis/post.api'
import CommentPageNation from '../../../../components/pagenation/Pagenation.Comment'
import useFetch from '../../../../hooks/useFetch'

const LIMIT_TAKE = 20
const CommentList = () => {
	const [params] = useSearchParams()
	const { data: commentResponse, loading } = useFetch(postApi.getComment, {
		take: params.get('take') ?? LIMIT_TAKE,
	})
	const commentList = commentResponse?.Comments

	if (loading) return <div>로딩중...</div>

	return (
		<>
			{commentList.map(comment => (
				<div key={comment.id}>
					<p>{comment.content}</p>
					<p>{comment.User.nickName}</p>
				</div>
			))}
			<CommentPageNation />
		</>
	)
}

export default CommentList
