import Toggleable from "./Toggleable"

const Blog = ({ blog }) => {
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
        <p>{blog.likes}</p>
        <p>{blog.author}</p>
      </Toggleable>
    </div>  
  )
}

export default Blog