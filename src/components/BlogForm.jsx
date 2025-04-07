import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setURL] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })
    setTitle("")
    setAuthor("")
    setURL("")
  }

  return (
    <div>
      <h2>Add blog</h2>
      <form onSubmit={addBlog}>
        <p>Title: <input type={"text"} value={title} name={"Title"} onChange={event => setTitle(event.target.value)} /></p>
        <p>Author: <input type={"text"} value={author} name={"Author"} onChange={event => setAuthor(event.target.value)} /></p>
        <p>URL: <input type={"text"} value={url} name={"URL"} onChange={event => setURL(event.target.value)} /></p>
        <button type='submit'>Create</button>
      </form>
    </div>
  )}

export default BlogForm