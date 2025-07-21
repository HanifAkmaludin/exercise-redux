'use client';

import { useEffect, useState } from "react";

import { useAppDispatch } from "@/lib/hooks";
import { setLoading, setListUsers } from "@/lib/features/userSlice";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Page(){
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch users from the API
    dispatch(setLoading(true));
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        dispatch(setListUsers(data));
        dispatch(setLoading(false));
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        dispatch(setLoading(false));
      });
  }, []);

  const addUser = async () => {
    try{
      console.log(name, email, 39);
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      console.log(response, 22);

      if(!response.ok) {
        throw new Error('Failed to add user');
      }

      const newUser = await response.json();
      setUsers(prev => [...prev, newUser])
      dispatch(setListUsers([...users, newUser]));
      setEmail('');
      setName("");
    }catch(error){
      console.error('Error adding user:', error);
      return;
    }
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
    setUsers(prev => prev.map(user => user.id === id ? updated : user));
    dispatch(setListUsers(users.map(user => user.id === id ? updated : user)));
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
    setUsers(prev => prev.filter((user: User) => user.id !== deletedUser.id));
    dispatch(setListUsers(users.filter((user: User) => user.id !== deletedUser.id)));
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Users Page</h1>

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
                <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => updateUser(user.id)}
                >
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ):(
        <p>No users found.</p>
      )}
    </div>
  )
}





