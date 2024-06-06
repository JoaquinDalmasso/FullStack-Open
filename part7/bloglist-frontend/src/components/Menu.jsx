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
      if (!user) {
        return null
    }
    return (
      <nav className="p-4 bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex space-x-4">
          <Link className="text-white hover:text-gray-400" style={{ padding: '8px' }} to="/">Blogs</Link>
          <Link className="text-white hover:text-gray-400" style={{ padding: '8px' }} to="/users">Users</Link>
        </div>
        <div className="flex items-center">
          <p className="mr-4 text-white">
            {user.name} logged in
          </p>
          <button
            id="logout-button"
            type="button"  // Cambia esto a 'button' en lugar de 'submit'
            onClick={handleLogout}
            className="px-3 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    )
  }

  export default Menu;