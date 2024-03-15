import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog title and author test', () => {
  let blog = {
    title:"Prueba",
    author:"Yo",
    url:".com/",
    likes:1
  }

  let mockUpdateBlog = jest.fn()
  
  test('title and author', async () => {
        const { container } = render(
      <Blog blog={blog} />
    )

    const div = container.querySelector('.blogOculto')
    expect(div).toHaveTextContent(
      'Prueba Yo'
    )

  })

  test('click view for url and likes', async () => {
    const component = render(
      <Blog blog={blog} likeBlog={mockUpdateBlog} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(component.container).toHaveTextContent(
      '.com/'
    )

    expect(component.container).toHaveTextContent(
      '1'
    )
  })

  test('click button for url and likes', async () => {
    render(
      <Blog blog={blog} likeBlog={mockUpdateBlog} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)

    expect(mockUpdateBlog.mock.calls).toHaveLength(1)
  })
})