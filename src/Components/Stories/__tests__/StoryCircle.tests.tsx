import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import StoryCircle from '../StoryCircle'

describe('StoryCircle', () => {
  const defaultProps = {
    imageUrl: 'avatar.jpg',
    username: 'TestUser',
    hasUnseenStory: true,
    onClick: jest.fn()
  }

  beforeEach(() => {
    defaultProps.onClick.mockClear()
  })

  test('renders the avatar image and username', () => {
    render(<StoryCircle {...defaultProps} />)

    const avatar = screen.getByAltText('TestUser')
    expect(avatar).toBeInTheDocument()

    expect(screen.getByText('TestUser')).toBeInTheDocument()
  })
  test('renders the unseen story indicator', () => {
    render(<StoryCircle {...defaultProps} />)

    const storyRing = screen.getByTestId('story-ring')
    expect(storyRing.className).toMatch(/unseen/)
  })
  test('calls the onClick handler when clicked', () => {
    render(<StoryCircle {...defaultProps} />)

    const avatar = screen.getByAltText('TestUser')
    fireEvent.click(avatar)
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })
  test('does not render the unseen story indicator when hasUnseenStory is false', () => {
    render(<StoryCircle {...defaultProps} hasUnseenStory={false} />)

    const storyRing = screen.getByTestId('story-ring')
    expect(storyRing.className).not.toMatch(/unseen/)
  })
})
