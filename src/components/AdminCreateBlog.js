import React, { useState, useEffect } from 'react';

const AdminCreateBlog = ({ articleId, onArticleChange }) => {
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState({});
  const [alert, setAlert] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [photoLoaded, setPhotoLoaded] = useState(false);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
	if (articleId) {
	  const fetchBlog = async () => {
		const response = await fetch(`https://mb-be-norbert.onrender.com/articles/${articleId}`);
		const data = await response.json();
		// console.log(data.Article.image)
		setTitle(data.Article.title || '');
		setDescription(data.Article.content || '');
		setPhotoURL(data.Article.image || '');
	  };
  
	  fetchBlog();
	} else {

	  setTitle('');
	  setDescription('');
	  setPhoto('');
	  setPhotoURL('');
	}
  }, [articleId]);

//   console.log(title, photo, description)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateInputs();
    if (isValid) {
      await createBlog();
    }
  };

  const validateInputs = () => {
    let isValid = true;
    let errors = {};

    if (title.trim() === "" || title.trim().length < 5) {
      errors.title = "Title must be at least 5 characters";
      isValid = false;
    }

    if (description.trim() === "" || description.trim().length < 20) {
      errors.description = "Description must be at least 20 characters";
      isValid = false;
    }

    if (!photo) {
      errors.photo = "Upload photo for the blog";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const createBlog = async () => {
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("content", description);
      formData.append("image", photo);

	  const method = articleId ? 'PUT' : 'POST';

      const url = articleId
	  ? `https://mb-be-norbert.onrender.com/articles/${articleId}`
	  : "https://mb-be-norbert.onrender.com/articles";
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      

	  

    //   console.log(data.message);
      setAlert(data.message);
      setTitle('');
      setPhoto('');
      setDescription('');
	  onArticleChange();
    } catch (error) {
      setAlert(error.message);
    }
  };

  return (
    <section id="new-blog">
      <div className="header2">
	  <div className={`alert ${alert ? 'show' : 'hide'}`}>{alert}</div>
        <h2 className="h2">Create Your Blog Post</h2>
      </div>
      
      <form name="createForm" onSubmit={handleSubmit}>
        <input type="hidden" id="edit-article-id" name="edit-article-id" />
        <div className="input">
          <label htmlFor="title">Title:</label><br />
          <input
            type="text"
            id="title"
            name="title"
            placeholder='title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /><br /><br />
          <div className="err">{error.title}</div>
        </div>
        <div className="input">
          <label htmlFor="photo">Photo:</label><br />
          <img
            id="current-image-display"
            src={photoURL}
            alt="CurrentImage"
            // style={{ maxWidth: '100px', display: photo ? 'block' : 'none' }}
			style={{ maxWidth: '100px', display: photoLoaded ? 'block' : 'none' }}
  onLoad={() => setPhotoLoaded(true)}
          /><br />
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className="custom-file-input"
			onChange={(e) => {
				setPhoto(e.target.files[0]);
				setPhotoURL(URL.createObjectURL(e.target.files[0]));
			  }}
          /><br /><br />
          <div className="err">{error.photo}</div>
        </div>
        <div className="input">
          <label htmlFor="description">Description:</label><br />
          <textarea
            id="description"
            name="description"
            placeholder='description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea><br /><br />
          <div className="err">{error.description}</div>
        </div>
        <button type="submit" id="create-btn">Submit</button>
      </form>
    </section>
  );
};

export default AdminCreateBlog;