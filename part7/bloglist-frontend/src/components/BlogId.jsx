import {useMatch} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateLike, deleteBlogs } from '../reducers/blogReducer'

const BlogId = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    
    const match = useMatch('/blogs/:id')
    const blogSeleccionado = match 
    ? blogs.find(blog => blog.id === match.params.id)
    : null

if (!blogSeleccionado) {
    return null
}

const updateBlog = (blog) => {
    try{
      dispatch(updateLike(blog.id, blog))
    }
    catch (exception) 
    {
      dispatch(setNotification('Error liked blog', 3));
    }
  };

  const deleteBlog = (blog) => {
    try{
      dispatch(deleteBlogs(blog.id))
      dispatch(setNotification('Blog removed', 3));
    }
    catch (exception) 
    {
      dispatch(setNotification('Error removed blog', 3));
    }
  };

return (
<div className="container mx-auto" >
    <h2 className="mb-4 text-xl font-bold">{blogSeleccionado.title}</h2>
    <p className="mb-4 text-m">{blogSeleccionado.url}</p>
    <p className="mb-4 text-m" id="likesBlog">{blogSeleccionado.likes}</p><button type="button" id="like-button" onClick={() => updateBlog(blogSeleccionado)}>
    like
    </button>
    <p className="mb-4 text-m">{blogSeleccionado.author}</p>
    <button id="remove-button" type="button" onClick={() => deleteBlog(blogSeleccionado)}>
    Remove
    </button>
</div>
)}

export default BlogId;