import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const Notification = (props) => {
  if (props.error === null && props.success === null) {
    return null
  }else if (props.error !== null && props.success === null){
    return (
      <div>{props.error}</div>
    )
  }else if (props.error === null && props.success !== null){
    return (
      <div>{props.success}</div>
    )
  }
  // return(<p>HOLA</p>)
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setURL] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      // alert("wrong credentials")
    }
  }

  const loginForm = () => (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogDisplay = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>Add blog</h2>
      <form onSubmit={addBlog}>
        <p>Title: <input type={"text"} value={title} name={"Title"} onChange={({ target }) => setTitle(target.value)} /></p>
        <p>Author: <input type={"text"} value={author} name={"Author"} onChange={({ target }) => setAuthor(target.value)} /></p>
        <p>URL: <input type={"text"} value={url} name={"URL"} onChange={({ target }) => setURL(target.value)} /></p>
        <button type='submit'>Create</button>
      </form>
    </div>
  )

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setTitle("")
          setAuthor("")
          setURL("")
          setSuccessMessage("Blog created")
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      
  }

  return (
    <div>
      <Notification error={errorMessage} success={successMessage} />
      {user === null ? loginForm() : <div>{blogDisplay()} {blogForm()}</div>}
    </div>
  )
}

export default App