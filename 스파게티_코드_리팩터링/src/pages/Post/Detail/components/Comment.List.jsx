import { useSearchParams } from 'react-router-dom'
import { postApi } from '../../../../apis/post.api'
import useFetch from '../../../../hooks/useFetch'
import Pagination from '../../../../components/pagenation/Pagenation'

const LIMIT_TAKE = 20
const LIMIT_PAGE = 10

const CommentList = () => {
	const [params, setParams] = useSearchParams()
	const { data, loading } = useFetch(postApi.getComment, {
		take: params.get('take') ?? LIMIT_TAKE,
		page: params.get('page') ?? 1,
		limit: params.get('limit') ?? LIMIT_PAGE,
	})
	const commentList = data?.Comments
	const pageNation = data?.PageNation

	if (loading) return <div>로딩중...</div>

	return (
		<>
			{commentList.map(comment => (
				<div key={comment.id}>
					<p>{comment.content}</p>
					<p>{comment.User.nickName}</p>
				</div>
			))}
			<Pagination pageNation={pageNation} setParams={setParams} />
		</>
	)
}

export default CommentList
