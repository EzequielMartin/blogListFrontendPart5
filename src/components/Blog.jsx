import Toggleable from "./Toggleable"

const Blog = ({ blog, increaseLikes }) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 300
  }

  return(
    <div style={blogStyle}>
      <p>{blog.title}</p>
      <Toggleable buttonLabel="View">
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={increaseLikes}>Like</button></p>
        <p>{blog.author}</p>
      </Toggleable>
    </div>  
  )
}

export default Blog