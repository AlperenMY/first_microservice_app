const CommentList = ({ comments }) => {
	const renderedComments = comments.map((comment) => {
		let content;
		if (comment.status === "approved") content = comment.content;
		else if (comment.status === "pending")
			content = "This comment is awaiting moderation";
		else if (comment.status === "rejected")
			content = "This comment has been rejected";
		return <li key={comment.id}>{content}</li>;
	});

	return (
		<div>
			<p>{`${comments.length} comments`}</p>
			<ul>{renderedComments}</ul>
		</div>
	);
};

export default CommentList;
