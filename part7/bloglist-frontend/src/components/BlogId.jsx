import {useMatch} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateLike, deleteBlogs, addComment } from '../reducers/blogReducer'

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

  const handleComment= async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.value = ''
    dispatch(addComment(blogSeleccionado, comment))
  }
  
return (
<div className="container mx-auto" >
    <h2 className="mb-4 text-xl font-bold">{blogSeleccionado.title}</h2>
    <p className="mb-4 text-m">{blogSeleccionado.url}</p>
    <p className="mb-4 text-m" id="likesBlog">{blogSeleccionado.likes} likes<button  className="px-4 py-1 ml-4 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent" onClick={() => updateBlog(blogSeleccionado)}>
    like
    </button></p>
    <p className="mb-4 text-m">added by {blogSeleccionado.author}
    <button className="px-4 py-1 ml-4 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent" onClick={() => deleteBlog(blogSeleccionado)}>
    Remove blog
    </button></p>
    <h3 className="mb-4 text-xl font-bold">comments</h3>
    <form className="w-full max-w-sm" onSubmit={handleComment}>
        <div className="flex items-center py-2 border-b border-blue-700 ">
          add comment
          <input
            type="text"
            name="comment"
            id="comment"
            className="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
          />
         <button className="px-4 py-1 ml-4 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent" id="comment-button" type="submit">
          Add
        </button>
        </div>
        </form>
        <div>
          <ul className="list-disc">
            {blogSeleccionado.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
</div>
)}

export default BlogId;