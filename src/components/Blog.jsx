import Toggleable from "./Toggleable"

const Blog = ({ blog, increaseLikes, removeBlog, userId }) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 300
  }

  let visible = ""

  if(userId === blog.user) {
    visible = ""
  }else{
    visible = "none"
  }

  //console.log(userId);

  return(
    <div style={blogStyle}>
      <p>{blog.title}</p>
      <Toggleable buttonLabel="View">
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={increaseLikes}>Like</button></p>
        <p>{blog.author}</p>
        <p><button onClick={removeBlog} style={{display: visible}}>Remove</button></p> 
      </Toggleable>
    </div>  
  )
}

export default Blog