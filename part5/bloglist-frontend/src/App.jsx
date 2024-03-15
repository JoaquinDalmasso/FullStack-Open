import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog));
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (exception) {
      setMessage('Error creating a new blog');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
    }
    
  const likeBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject.id,blogObject);
      setBlogs(blogs.map(blog =>
        blog.id === blogObject.id ? returnedBlog : blog));
    } catch (exception) {
      setMessage('Error liked blog');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
    }

  const deleteBlog = async (blogObject) => {
    const isDelete = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author} ?`)
    if(isDelete && (user.id === blogObject.user.id || user.id === blogObject.user)){
      try{
        await blogService.deleteOne(blogObject.id)
        setMessage('Blog removed');
        setBlogs(blogs.filter(blog =>
               blog.id !== blogObject.id))
        setTimeout(() => {
        setMessage(null);
        }, 3000);
      }catch{
        setMessage('Error removed blog');
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }else{
      setMessage('You cant remove this blog');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
    <div>
      <h2>Log in to application</h2>

      <Notification message={message}/>
      
      <LoginForm 
      handleLogin={handleLogin}
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </div>
  )}

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message}/>
      <form onSubmit={handleLogout}>
      <p >{user.name} logged in <button id='logout-button' type="submit">logout</button></p>
      </form>
      <Togglable buttonLabel='Add blog' ref={blogFormRef}>
      <CreateBlog
        createBlog={addBlog} user={user}
      />
      </Togglable>
      {blogs.sort(function (a,b){
        if(a.likes > b.likes){
          return -1;
        }
        if (a.likes<b.likes){
        return 1;
      }
        return 0}).map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App