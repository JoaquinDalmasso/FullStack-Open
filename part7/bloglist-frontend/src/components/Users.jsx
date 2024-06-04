import { useDispatch, useSelector } from 'react-redux'
import {Link,useMatch} from 'react-router-dom'

const Users = () => {
    const users = useSelector(state => state.users)
    
return (
    <div className="container mx-auto">
    <h2 className="mb-4 text-xl font-bold">Users</h2>
    <table className="bg-white ">
        <thead>
            <tr>
                <th className="px-2 py-2 text-sm leading-4 text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">Name</th>
                <th className="px-3 py-2 text-sm leading-4 text-right text-gray-600 bg-gray-100 border-b-2 border-gray-200">Blogs Created</th>
            </tr>
        </thead>
        <tbody>
            {[...users].map(user => (
                <tr key={user.id}>
                    <Link to={`/users/${user.id}`}><td className="px-2 py-2 border-b border-gray-200">{user.name}</td></Link>
                    <td className="px-3 py-2 text-right border-b border-gray-200">{user.blogs.length}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
)}

export default Users;