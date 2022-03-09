import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Home from "./pages/Home";
import Post from "./pages/Post";
import UserPosts from "./pages/UserPosts";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <Router>
      <div className="h-screen drawer drawer-mobile w-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        {/* Asosiy sahifadagi kontentlar */}
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost btn-circle drawer-button m-5 lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <Link to='/' className="font-bold text-4xl lg:hidden">Blog App</Link>
          <div className="container min-h-screen mx-auto mb-10 flex flex-col items-center justify-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-post" element={<CreatePost />} />
              <Route path="/users/:userId/posts" element={<UserPosts />} />
              <Route path="/users/:userId/posts/:postId" element={<Post />} />
            </Routes>
          </div>
        </div>
        {/* Asosiy sahifadagi kontentlar tugadi */}
        <Sidebar />
      </div>
    </Router>
  );
}

export default App;
