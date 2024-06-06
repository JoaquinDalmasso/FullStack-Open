import { createSlice, current } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
      like(state, action) {
        const id = action.payload
        const blogToChange = state.find(n => n.id === id)
        const changedBlog = { 
          ...blogToChange, 
          likes: blogToChange.likes + 1 
        }
        return state.map(blog =>
            blog.id !== id ? blog : changedBlog 
        )  
      },
      appendBlog(state, action) {
        state.push(action.payload)
      },
      setBlogs(state, action) {
        return action.payload
      },
      newcomment(state, action){
        const id = action.payload
        const updatedBlog = state.find((blog) => blog.id === id)
        const changedBlog = {
          ...updatedBlog
        }
        return state.map(
          (blog) => (blog.id !== id ? blog : changedBlog))  
      },
    },
  })

  export const { like, appendBlog, setBlogs, newcomment } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogsService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateLike = (id , content) => {
  return async dispatch => {
    const updatedBlog = await blogsService.update( id , {...content, likes: content.likes + 1})
    dispatch(like(updatedBlog))
  }
}

export const addComment = (blog , comment) => {
  console.log(blog.comments)
  return async dispatch => {
    const updatedBlog = await blogsService.update(blog.id,
      {...blog, comments: blog.comments.concat([comment])}
    )
    console.log(updatedBlog)
    dispatch(newcomment(updatedBlog))
  }
}

export const deleteBlogs = (id) => {
  return async dispatch => {
    const deleteBlog = await blogsService.deleteOne(id)
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export default blogSlice.reducer