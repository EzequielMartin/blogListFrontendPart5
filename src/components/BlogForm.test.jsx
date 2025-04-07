import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"
import { expect } from "vitest"

test("Creacion de eventos con datos correctos", async () =>{
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  screen.debug()

  const title = screen.getByPlaceholderText("title")
  const author = screen.getByPlaceholderText("author")
  const url = screen.getByPlaceholderText("url")
  const button = screen.getByText("Create")

  await userEvent.type(title, "Probando crear blogs con test")
  await userEvent.type(author, "Eze")
  await userEvent.type(url, "probando.com/crearcontest")
  await userEvent.click(button)

  console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("Probando crear blogs con test")
  expect(createBlog.mock.calls[0][0].author).toBe("Eze")
  expect(createBlog.mock.calls[0][0].url).toBe("probando.com/crearcontest")
  expect(createBlog.mock.calls[0][0].likes).toBe(0)
})