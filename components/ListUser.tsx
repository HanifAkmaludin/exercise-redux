import { useAppSelector } from "@/lib/hooks";
import { User } from "@/lib/features/userSlice";

export default function List(){
  const users = useAppSelector(state => state.user.users);
  const loading = useAppSelector(state => state.user.isLoading);

  return (
    <div>
      <h1>Component List User</h1>
      { loading ? (
        <p>Loading...</p>
      ) : 
        users?.length > 0 ? (
          <ul>
            {users.map((user: User) => (
              <li key={user.id} className="flex items-center justify-between my-2">
                <span>{ user?.name }</span>
              </li>
            ))}
          </ul>
        ):(
          <p>No users found.</p>
        )
      }
    </div>
  )
}