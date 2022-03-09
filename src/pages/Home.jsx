import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ava1 from '../avatars/avataaars(1).png'
import ava2 from '../avatars/avataaars(2).png'
import ava3 from '../avatars/avataaars(3).png'
import ava4 from '../avatars/avataaars(4).png'
import ava5 from '../avatars/avataaars(5).png'
import ava6 from '../avatars/avataaars(6).png'
import ava7 from '../avatars/avataaars(7).png'
import ava8 from '../avatars/avataaars(8).png'
import ava9 from '../avatars/avataaars(9).png'
import ava10 from '../avatars/avataaars(10).png'

function Home() {
  const [users, setUsers] = useState([])

  // Foydalanuvchilarni ulash
  useEffect(() => {
    const fetchUsers = async () => {
      await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => setUsers(json))
    }

    fetchUsers()
  }, [])

  return (
    <>
      <h1 className="text-5xl text-center mt-10 mb-5">Bloggers</h1>
      <ul className="menu bg-base-100 m-5 p-2 shadow-lg rounded-box xl:grid grid-cols-2 gap-4">
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}/posts`}>
              <img
                src={
                  // Bu universal usul emas, lekin URL foydalanilganda buni qisqartirish mumkin
                  user.id === 1
                    ? ava1
                    : user.id === 2
                    ? ava2
                    : user.id === 3
                    ? ava3
                    : user.id === 4
                    ? ava4
                    : user.id === 5
                    ? ava5
                    : user.id === 6
                    ? ava6
                    : user.id === 7
                    ? ava7
                    : user.id === 8
                    ? ava8
                    : user.id === 9
                    ? ava9
                    : ava10
                }
                alt="ava"
                className="mask mask-squircle w-20 bg-base-200 lg:w-40"
              />
              <h2 className="text-2xl lg:text-3xl font-bold">
                {user.name}
                <br />
                <div className="badge">ID: {user.id}</div>
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Home
