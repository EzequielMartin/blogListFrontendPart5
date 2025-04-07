import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

test("Titulo visible y lo demas oculto", () => {
  const blog = {
    title: "Probando test de render title y lo demas oculto",
    author: "Eze",
    url: "test.com/render",
    likes: 5,
  }

  render(<Blog blog={blog} />)
  screen.debug()

  let element = screen.getByText("Probando test de render title y lo demas oculto")
  expect.soft(element).toBeVisible()
  element = screen.getByText("Eze")
  expect.soft(element).not.toBeVisible()
  element = screen.getByText("test.com/render")
  expect.soft(element).not.toBeVisible()
  element = screen.getByText("5")
  expect.soft(element).not.toBeVisible()
  
})