import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'

const CreateBlog =({createBlog, user}) => {
  const [newTitle, setNewTitle] = useState('') 
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  
  const addBlog = (event) =>{
    event.preventDefault();
    createBlog ({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user
    })
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  }

  return(
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
              <input
              type="text"
              value={newTitle}
              name="Title"
              onChange={event => setNewTitle(event.target.value)}
              id='title'
            />
          </div>
          <div>
            author:
              <input
              type="text"
              value={newAuthor}
              name="Author"
              onChange={event => setNewAuthor(event.target.value)}
              id='author'
            />
          </div>
          <div>
            url:
              <input
              type="text"
              value={newUrl}
              name="Url"
              onChange={event => setNewUrl(event.target.value)}
              id='url'
            />
          </div>
          <button id='create-button' type="submit">create</button>
        </form>
        </div>
    )
}

export default CreateBlog