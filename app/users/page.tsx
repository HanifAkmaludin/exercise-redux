'use client';

import { useEffect, useState } from "react";
import ListUser from "@/components/ListUser";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setUsers, type User, setLoading } from "@/lib/features/userSlice";

export default function Page(){
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.user.users);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch users from the API
    dispatch(setLoading(true));
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        dispatch(setUsers(data)); // Assuming you have a setUsers action in your userSlice
        dispatch(setLoading(false));
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        dispatch(setLoading(false));
      });
  }, []);

  const addUser = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    const newUser = await response.json();
    console.log(newUser);
    dispatch(setUsers([...users, newUser])); // Assuming you have a setUsers action in your userSlice
    setEmail('');
    setName("");
  }

  const updateUser = async (id: string) => {
    const newName = prompt("Enter new name:");
    const newEmail = prompt("Enter new email:");

    if(!newName || !newEmail) {
      return;
    }

    const response = await fetch('/api/users', {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name: newName, email: newEmail }),
    });

    const updated = await response.json();
    // setUsers(prev => prev.map(user => user.id === id ? updated : user));
  }

  const deleteUser = async (id: string) => {
    const response = await fetch('/api/users', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const deletedUser = await response.json();
    // setUsers(prev => prev.filter((user: User) => user.id !== deletedUser.id));
  }

  return (
    <div>
      <h1>Users Page</h1>

      {/* INPUT USERS */}
      <div>
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Ketikan nama ...."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Ketikan email ...."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addUser}
        >
          Add User
        </button>
      </div>

      { users?.length > 0 ? (
        <ul>
          {users.map((user: User) => (
            <li key={user.id} className="flex items-center justify-between my-2">
              <span>{ user?.name }</span>
              <div>
                {/* <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => updateUser(user.id)}
                >
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button> */}
              </div>
            </li>
          ))}
        </ul>
      ):(
        <p>No users found.</p>
      )}

      <ListUser />
    </div>
  )
}