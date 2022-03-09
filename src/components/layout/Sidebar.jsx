import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlusSquare, FaListAlt } from 'react-icons/fa'

function Sidebar() {
  return (
    <div className="drawer-side shadow-lg">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 overflow-y-auto w-80 text-base-content bg-base-200">
        {/* <!-- Sidebar kontent shu yerda --> */}
        <div className="grid place-items-center p-10">
          <Link to='/' className="text-4xl font-bold ">Blog App</Link>
        </div>
        <li>
          <Link to="/">
            <FaListAlt className="rounded-none" /> Post List
          </Link>
        </li>

        <li>
          <Link to="/add-post" className="capitalize">
            <FaPlusSquare className="rounded-none" /> Add post
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
