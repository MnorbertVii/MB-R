import React,{ useState, useEffect } from 'react';
import { Link as RouterLink,useParams,useNavigate } from 'react-router-dom';	
import { Back } from '../assets/images';
// import '../styles/SingleBlog.css';

function BlogPost() {

	const { id } = useParams();
	const [article, setArticle] = useState(null);
	const [comments, setComments] = useState([]);
	const [commentInput, setCommentInput] = useState('');
	const navigate = useNavigate;
	// console.log(commentInput)
  
	useEffect(() => {
	  fetch(`https://mb-be-norbert.onrender.com/articles/${id}`)
		.then(response => response.json())
		.then(data => setArticle(data.Article));
  
	  fetch(`https://mb-be-norbert.onrender.com/article/${id}/comments`)
		.then(response => response.json())
		.then(data => setComments(data.listOfComments || []));
	}, [id]);
  

	const handleCommentSubmit = (event) => {
		// console.log("handleCommentSubmit listened")
		event.preventDefault();

		const token = localStorage.getItem('token');
		if (!token) {
		  navigate ('/SignIn');
		  return;
		}
	
		fetch(`https://mb-be-norbert.onrender.com/article/${id}/comment`, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		  },
		  body: JSON.stringify({ comment: commentInput }),
		})
		  .then(response => response.json())
		  .then(data => {
			// console.log(data);
			setComments(prevComments => [...prevComments, data.commentary]);
			setCommentInput('');
		  });
	  };

	  const deleteComment = (commentId) => {
		fetch(`https://mb-be-norbert.onrender.com/article/${id}/comment/${commentId}`, {
		  method: 'DELETE',
		  headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`  
		  }
		})
		.then(response => response.json())
		.then(data => {
		  setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
		})
		.catch(error => console.error('Error:', error));
	  };

	if (!article) {
	  return <div><h1>Loading...</h1></div>;
	}


  return (
    <div>
     <RouterLink to={{ pathname: "/", state: { id: "blogs" } }}>
        <img className="back" src={Back} alt="Back" width="40" height="40" />
		</RouterLink>
      <div className="container" id="article-container">
        <h3 id="blog-title">{article.title}</h3>
        <img src={article.image} alt="avatar" id="blog-image"/>
        <p className="leading" id="blog-description">
          {article.content}
        </p>
        <form onSubmit={handleCommentSubmit}>
          <textarea className="style-input" placeholder="comment" value={commentInput} onChange={(e) => setCommentInput(e.target.value)}></textarea>
          <button className="comment-btn" id="send-comment-btn">send</button>
        </form>
        <div className="comments">
          <h5>{comments.length} comments</h5>
          {comments.map((comment, index) => (
            <div key={index} id="comments-list">
              <h4>{comment.user}</h4>
              <p className="comment-text">{comment.comment}</p>
              <h5 id="delete"onClick={() => deleteComment(comment._id)}>Delete</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPost;