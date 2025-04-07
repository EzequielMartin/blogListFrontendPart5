const BlogForm = ({
  onSubmit,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleURLChange
  }) => (
    <div>
      <h2>Add blog</h2>
      <form onSubmit={onSubmit}>
        <p>Title: <input type={"text"} value={title} name={"Title"} onChange={handleTitleChange} /></p>
        <p>Author: <input type={"text"} value={author} name={"Author"} onChange={handleAuthorChange} /></p>
        <p>URL: <input type={"text"} value={url} name={"URL"} onChange={handleURLChange} /></p>
        <button type='submit'>Create</button>
      </form>
    </div>
)

export default BlogForm