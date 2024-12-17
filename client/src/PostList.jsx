import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
	const [posts, setPosts] = useState({});

	const renderedPost = Object.values(posts).map((post) => {
		return (
			<div
				key={post.id}
				className="card"
				style={{ width: "30%", marginBottom: "20px" }}
			>
				<div className="card-body">
					<h3>{post.title}</h3>
					<CommentList comments={post.comments} />
					<CommentCreate postId={post.id} />
				</div>
			</div>
		);
	});

	const fetchPosts = useCallback(async () => {
		const response = await axios.get("http://posts.com/postsQuery");
		setPosts(response.data);
	}, []);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	return (
		<div className="d-flex flex-row flex-wrap justify-content-evenly">
			{renderedPost}
		</div>
	);
};

export default PostList;
