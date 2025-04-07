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
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
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

  const blogDisplay = () => {
    const sortedBlogs = blogs.sort((a,b) => (b.likes - a.likes))

    return(
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged-in</p>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} increaseLikes={() => increaseLikes(blog.id)} removeBlog={() => removeBlog(blog.id)} userId={user.id} />
      )}
    </div>
  )}

  const blogForm = () => (
    <Toggleable buttonLabel="New blog">
      <BlogForm createBlog={addBlog} />
    </Toggleable>
  )

  const addBlog = (blogObject) => {

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setSuccessMessage("Blog created")
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      
  }

  const increaseLikes = id => {
    const blog = blogs.find(b => b.id === id)
    const updatedLikes = blog.likes + 1
    const updatedBlog = {...blog, likes: updatedLikes}
    
    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const removeBlog = id => {
    blogService
      .remove(id)
      .then(
        setBlogs(blogs.filter(blog => blog.id !== id)))
  }

  return (
    <div>
      <Notification error={errorMessage} success={successMessage} />
      {user === null ? loginForm() : <div>{blogDisplay()} {blogForm()}</div>}
    </div>
  )
}

export default App