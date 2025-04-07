import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import { expect } from "vitest"

test("Titulo visible y lo demas oculto", () => {
  const blog = {
    title: "Probando test de render title y lo demas oculto",
    author: "Eze",
    url: "test.com/render",
    likes: 5,
  }

  render(<Blog blog={blog} />)

  let element = screen.getByText("Probando test de render title y lo demas oculto")
  expect.soft(element).toBeVisible()
  element = screen.getByText("Eze")
  expect.soft(element).not.toBeVisible()
  element = screen.getByText("test.com/render")
  expect.soft(element).not.toBeVisible()
  element = screen.getByText("5")
  expect.soft(element).not.toBeVisible()
  
})

test("Clickeando el boton View muestro el contenido del Blog", async () => {
  const blog = {
    title: "Probando test de render title y lo demas oculto",
    author: "Eze",
    url: "test.com/render",
    likes: 5,
  }

  render(<Blog blog={blog}  />)

  const user = userEvent.setup()
  const button = screen.getByText("View")
  await user.click(button)

  let element = screen.getByText("Probando test de render title y lo demas oculto")
  expect.soft(element).toBeVisible()
  element = screen.getByText("Eze")
  expect.soft(element).toBeVisible()
  element = screen.getByText("test.com/render")
  expect.soft(element).toBeVisible()
  element = screen.getByText("5")
  expect.soft(element).toBeVisible()
})

test("Clickeando dos veces el boton de likes se hace dos veces la llamada a la funcion de incrementar likes", async () => {
  const blog = {
    title: "Probando test de render title y lo demas oculto",
    author: "Eze",
    url: "test.com/render",
    likes: 5,
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} increaseLikes={mockHandler} />)

  const user = userEvent.setup()
  let button = screen.getByText("View")
  await user.click(button)
  button = screen.getByText("Like")
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})