import { useSelector } from 'react-redux'
import {useMatch} from 'react-router-dom'

const User = () => {
    const users = useSelector((state) => state.users)
    
    const match = useMatch('/users/:id')
    const usuario = match 
    ? users.find(user => user.id === match.params.id)
    : null

if (!usuario) {
    return null
}

return (
<div className="container mx-auto" >
    <h2 className="mb-4 text-xl font-bold">{usuario.name}</h2>
    <h3 className="mb-4 font-bold text-m">added blogs</h3>
    <ul className="space-y-4 list-disc">
    {usuario.blogs.map(blog => (
          <li key={blog.id} className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-md">
            {blog.title}
          </li>
        ))}
    </ul>
</div>
)}

export default User;