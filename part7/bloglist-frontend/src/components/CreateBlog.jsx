import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef } from 'react';
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable';

const CreateBlog = () => {
  const dispatch = useDispatch()
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const blogFormRef = useRef();
  const user = useSelector((state) => state.user)

  const addBlog = (event) => {
    event.preventDefault();
    const content = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user,
    };
    try {
    dispatch(createBlog(content))
    dispatch(setNotification(`a new blog ${content.title} by ${content.author}`, 3));
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  } catch (exception) {
         dispatch(setNotification('Error creating a new blog', 3));
       }
  };

  return (
    <Togglable buttonLabel="Add blog" ref={blogFormRef}>
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={(event) => setNewTitle(event.target.value)}
            id="title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={(event) => setNewAuthor(event.target.value)}
            id="author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={(event) => setNewUrl(event.target.value)}
            id="url"
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
    </Togglable>
  );
};

export default CreateBlog;
