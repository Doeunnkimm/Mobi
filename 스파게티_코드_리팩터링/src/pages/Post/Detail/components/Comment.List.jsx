import CommentPageNation from '../../../../components/pagenation/Pagenation.Comment'

const CommentList = ({ commentList }) => {
	return (
		<>
			{commentList &&
				commentList.map(comment => (
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
