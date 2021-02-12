import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Header from './Header'

test('clicking the project button calls event handler once', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Header setTableType={mockHandler} />
  )

  const button = component.getByText('Projects')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('clicking the user button calls event handler once', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Header setTableType={mockHandler} />
  )

  const button = component.getByText('Users')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})