import { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
	const [content, setContent] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post(`http://posts.com/comments/${postId}`, { content });
		setContent("");
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					<label htmlFor="content" className="form-label">
						New Comment
					</label>
					<input
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="Add a comment"
						className="form-control"
						id="content"
					/>
				</div>
				<button type="submit" className="btn btn-primary mt-2">
					Add Comment
				</button>
			</form>
		</div>
	);
};

export default CommentCreate;
