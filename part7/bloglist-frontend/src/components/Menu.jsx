import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Menu = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const padding = {
      paddingRight: 5
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        dispatch(logout())
      }

    return (
        <nav className="p-4 bg-gray-800">
        <div className="container flex items-center justify-between mx-auto">
          <div className="flex space-x-4">
            <Link className="text-white hover:text-gray-400" style={padding} to="/">Blogs</Link>
            <Link className="text-white hover:text-gray-400" style={padding} to="/users">Users</Link>
          </div>
          <form onClick={handleLogout} className="flex items-center">
            <p className="text-white" style={padding}>
              {user.name} logged in{' '}
              <button id="logout-button" type="submit" className="px-3 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600">
                Logout
              </button>
            </p>
          </form>
        </div>
      </nav>
    )
  }

  export default Menu;