import React, { useState, useEffect } from 'react';
import * as logos from '../assets/images';
import { useNavigate } from 'react-router-dom';
function Blogs() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://mb-be-norbert.onrender.com/articles')
      .then(response => response.json())
      .then(data => {
		// console.log(data)
        const promises = data.Articles.map(async article => {
          const commentCount = await fetch(`https://mb-be-norbert.onrender.com/article/${article._id}/comments`)
            .then(response => response.json())
            .then(data => data.listOfComments ? data.listOfComments.length : 0);
          return { ...article, commentCount };
        });
        return Promise.all(promises);
      })
      .then(articlesWithComments => setArticles(articlesWithComments))
      .catch(error => console.error('Error:', error));
  }, []);

  const addLike = (articleId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate ('/');
    } else {
      fetch(`https://mb-be-norbert.onrender.com/article/${articleId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {

            console.log(data.likedArticle.likes.likesNumber);

            const updatedArticles = articles.map(article => {
              if (article._id === articleId) {
                return { ...article, likes: { likesNumber: data.likedArticle.likes.likesNumber } };
              }
              return article;
            });
            setArticles(updatedArticles);
          } else {
            console.error("error, can't display the likes");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <section id="blogs">
      <h3>Featured <span className="articles">Articles</span></h3>
      <div className="blog-contents grid" id="blog-contents">
        {articles.length > 0 ? (
          articles.map(article => (
            <div key={article._id} className="first-blog grid">
              <img src={article.image} alt="avatar" />
              <h4>{article.title}</h4>
              <p>
                {article.content.slice(0, 30)}
                <a href={`singleblog.html?id=${article._id}`} className="style-link">more</a>
              </p>

              <div className="likes-comments">
                <div className="likes">
                  <img src={logos.Like} alt="like" onClick={() => addLike(article._id)} /> 
                  <p className="like-count">{article.likes.likesNumber} {article.likes.likesNumber !== 1 ? "likes" : "like"}</p>
                </div>
                <div className="comments">
                  <a href={`singleblog.html?id=${article._id}`}>
                    <img src={logos.Comment} alt="comment" />
                  </a>
                  <p id="comment-count"> {article.commentCount} {article.commentCount !== 1 ? "comments" : "comment"}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 style={{ textAlign: 'center', color: '#dcc9aa' }}>There are no blogs to display.</h1>
        )}
      </div>
    </section>
  );
}

export default Blogs;