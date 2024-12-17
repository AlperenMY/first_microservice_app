import { useState } from "react";
import axios from "axios";

const PostCreate = () => {
	const [title, setTitle] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();

		axios.post("http://posts.com/posts", { title });
		setTitle("");
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					<label className="form-label" htmlFor="post">
						Title
					</label>
					<input
						type="text"
						className="form-control"
						placeholder="Enter post"
						id="post"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary mt-3">
					Create
				</button>
			</form>
		</div>
	);
};

export default PostCreate;
