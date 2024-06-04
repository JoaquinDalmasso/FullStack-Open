import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'

const store  = configureStore({
    reducer: {
      notification: notificationReducer,
      blogs: blogReducer,
      user: loginReducer,
      users: userReducer,
    }
  })
  

export default store