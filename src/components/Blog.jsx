import Toggleable from "./Toggleable"
import { useState } from "react"

const Blog = ({ blog, increaseLikes, removeBlog }) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 300
  }
  
  //const [visible, setVisible] = useState("none")

  // if (userId === blog.user) {
  //   setVisible("")
  // }else{
  //   setVisible("none")
  // }

  return(
    <div style={blogStyle}>
      <p>{blog.title}</p>
      <Toggleable buttonLabel="View">
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={increaseLikes}>Like</button></p>
        <p>{blog.author}</p>
        <p><button onClick={removeBlog}>Remove</button></p>  
      </Toggleable>
    </div>  
  )
}

export default Blog