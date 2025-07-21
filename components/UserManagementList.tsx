'use client';

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import { setListPengguna } from "@/lib/features/userSlice";

export default function UserManagementList(){
  const loading = useAppSelector(state => state.user.loading);
  const users = useAppSelector(state => state.user.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
      // Fetch users from the API
      fetch('/api/users')
        .then(response => response.json())
        .then(data => {
          dispatch(setListPengguna(data));
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }, []);

  return(
    <div className="mt-7">
      <h1 className="text-4xl font-bold">User Management List</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id} className="border-b py-2">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}