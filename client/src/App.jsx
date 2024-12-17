import PostCreate from "./PostCreate";
import PostList from "./PostList";
// import "./App.css";

function App() {
	return (
		<div className="container">
			<h1>Create Post!</h1>
			<PostCreate />
			<hr />
			<h2>Post List</h2>
			<PostList />
		</div>
	);
}

export default App;
