import React, { useEffect, useState, useRef } from 'react'

function CreatePost() {
  const [resultData, setResultData] = useState()
  const [showResult, setShowResult] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1,
  })

  const { title, body } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  // Post qo'shish
  const onSubmit = async (e) => {
    e.preventDefault()

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => setResultData(json))
    setTimeout(() => {
      setShowResult(true)
    }, 2000)
  }

  // Input forma Animatsiya
  const ref1 = useRef()

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

  return (
    <>
      <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-10">
        Add Post
      </h1>
      <div className="bg-base-300 flex flex-wrap p-5 rounded-lg">
        <form
          className="form-control flex-row flex-wrap w-full gap-5"
          onSubmit={onSubmit}
        >
          <div className="form-control-magic">
            <input
              className="input input-ghost w-full "
              type="title"
              id="title"
              value={title}
              onChange={onChange}
              required
            />
            <label className="label block" ref={ref1}>
              Title
            </label>
          </div>
          <textarea
            className="textarea textarea-primary w-full h-40"
            name="body"
            id="body"
            value={body}
            onChange={onChange}
            placeholder="Comment . . ."
            required
          ></textarea>
          <button type="submit" className="btn btn-block">
            Send
          </button>
        </form>
      </div>
      {showResult && (
        <>
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold my-10 text-center">
            Result
          </h2>
          <h3>Title: {resultData.title}</h3>
          <p>Body: {resultData.body}</p>
          <p>userId: {resultData.userId}</p>
        </>
      )}
    </>
  )
}

export default CreatePost
