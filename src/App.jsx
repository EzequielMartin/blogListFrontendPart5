import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

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

  //Notar que en esta funcion y en blogForm, como solo defino el html a retornar, no tengo que usar return() y no pongo {} despues de la funcion flecha sino ()
  const loginForm = () => (
    <Toggleable buttonLabel="Login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Toggleable>
  )

  const blogDisplay = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged-in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogForm = () => (
    <Toggleable buttonLabel="New blog">
      <BlogForm
        onSubmit={addBlog}
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleURLChange={({ target }) => setURL(target.value)}
      />
    </Toggleable>
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