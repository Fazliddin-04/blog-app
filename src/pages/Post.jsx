import React, { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function Post() {
  const [userPost, setUserPost] = useState([])
  const [postComments, setPostComments] = useState([])
  const [resultData, setResultData] = useState()
  const [showResult, setShowResult] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    body: '',
  })

  const { email, name, body } = formData

  const params = useParams()
  // Postni ulash
  useEffect(() => {
    const fetchUserPost = async () => {
      await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.postId}?userId=${params.userId}`
      )
        .then((response) => response.json())
        .then((json) => setUserPost(json))
    }

    fetchUserPost()
  }, [params])

  // Post kommentariyasini ulash
  useEffect(() => {
    const fetchComments = async () => {
      await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.postId}/comments?userId=${params.userId}`
      )
        .then((response) => response.json())
        .then((json) => setPostComments(json))
    }

    fetchComments()
  }, [params])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  // Kommentariya jo'natish
  const onSubmit = async (e) => {
    e.preventDefault()

    fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.postId}/comments?userId=${params.userId}`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      .then((response) => response.json())
      .then((json) => setResultData(json))

    setTimeout(() => {
      setShowResult(true)
    }, 2000)
  }

  // Input forma Animatsiya
  const ref1 = useRef()
  const ref2 = useRef()

  useEffect(() => {
    ref1.current.innerHTML = ref1.current.innerText
      .split('')
      .map(
        (letter, idx) =>
          `<span className="label-text" style="transition-delay: ${
            idx * 50
          }ms;">${letter}</span>`
      )
      .join('')
  })

  useEffect(() => {
    ref2.current.innerHTML = ref2.current.innerText
      .split('')
      .map(
        (letter, idx) =>
          `<span className="label-text" style="transition-delay: ${
            idx * 50
          }ms;">${letter}</span>`
      )
      .join('')
  })

  return (
    <div className="p-10">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/users/${params.userId}/posts`}>Posts</Link>
          </li>
          <li>This Post</li>
        </ul>
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-10">
          {userPost.title}
        </h1>
        <p className=" py-6 text-xl md:text-2xl">{userPost.body}</p>
      </div>
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-5">
        Comments
      </h2>
      <div className="bg-base-300 flex flex-wrap p-5 rounded-lg">
        {postComments.map((comment) => (
          <div
            className="w-fit bg-base-200 my-5 p-3 rounded-lg"
            key={comment.id}
          >
            <h4>
              From{' '}
              <a
                href={`mailto:${comment.email}`}
                className="link-primary link-hover"
              >
                {comment.email}
              </a>
            </h4>
            <h3 className="text-xl font-bold mb-3">{comment.name}</h3>
            <p className="text-md lg:text-lg">{comment.body}</p>
          </div>
        ))}
        {showResult && (
          <div
            className="w-fit bg-accent text-accent-content my-5 p-3 rounded-lg"
            key={resultData.id}
          >
            <h4>
              From{' '}
              <a
                href={`mailto:${resultData.email}`}
                className="link-primary link-hover"
              >
                {resultData.email}
              </a>
            </h4>
            <h3 className="text-xl font-bold mb-3">{resultData.name}</h3>
            <p className="text-md lg:text-lg">{resultData.body}</p>
          </div>
        )}
        <form
          className="form-control flex-row flex-wrap w-full gap-5 sm:gap-20"
          onSubmit={onSubmit}
        >
          <span>
            <div className="form-control-magic">
              <input
                className="input input-ghost w-full "
                type="email"
                id="email"
                value={email}
                onChange={onChange}
                required
              />
              <label className="label block" ref={ref1}>
                Email
              </label>
            </div>
            <div className="form-control-magic">
              <input
                className="input input-ghost w-full"
                type="name"
                id="name"
                value={name}
                onChange={onChange}
                required
              />
              <label className="label block" ref={ref2}>
                Name
              </label>
            </div>
          </span>
          <textarea
            className="textarea textarea-primary sm:flex-1 w-full"
            name="body"
            id="body"
            value={body}
            onChange={onChange}
            placeholder="Comment . . ."
            required
          ></textarea>
          <button className="btn btn-block">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Post
