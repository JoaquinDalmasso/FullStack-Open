import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeAllUsers } from './reducers/userReducer'
import { initializeUser, logout } from './reducers/loginReducer'
import Inicio from './components/Inicio';
import Menu from './components/Menu';
import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';
import BlogId from './components/BlogId';
import LoginForm from './components/LoginForm';
import {Routes, Route, Link, useMatch} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())  
    dispatch(initializeAllUsers())
  }, [dispatch]) 


  const padding = {
    paddingRight: 5
  }

  if (user === null) {
    return (
      <div>
        <Menu />
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <Menu />
      <h2>blogs</h2>
        <Notification />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User/>} />
          <Route path="/blogs/:id" element={<BlogId />} />
      </Routes>
    </div>
  );
};

export default App;
