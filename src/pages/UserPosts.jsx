import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function UserPosts() {
  const [userPosts, setUserPosts] = useState([])

  const params = useParams()

  // Foydalanuvchi postlarini ulash
  useEffect(() => {
    const fetchUserPosts = async () => {
      await fetch(
        `https://jsonplaceholder.typicode.com/users/${params.userId}/posts`
      )
        .then((response) => response.json())
        .then((json) => setUserPosts(json))
    }

    fetchUserPosts()
  }, [params])
  return (
    <>
      <h1 className="text-5xl text-center mt-10 mb-5">Posts</h1>
      <ul className="menu bg-base-100 p-2 shadow-lg rounded-box">
        {userPosts.map((post) => (
          <li key={post.id} className="hover-bordered">
            <Link to={`/users/${post.userId}/posts/${post.id}`}>
              <span>
                <h2 className="text-2xl lg:text-3xl font-bold">
                  {post.title.length > 30
                    ? post.title.slice(0, 50) + '...'
                    : post.title}
                </h2>
                <p>
                  {post.body.length > 30
                    ? post.body.slice(0, 100) + '...'
                    : post.body}
                </p>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserPosts
