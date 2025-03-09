import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import StoriesContainer, { Story } from '../StoriesContainer'

describe('StoriesContainer', () => {
  const stories: Story[] = [
    {
      id: '1',
      imageUrl: 'user1.jpg',
      username: 'User1',
      storiesUrl: ['story1.jpg'],
      hasUnseenStory: true
    },
    {
      id: '2',
      imageUrl: 'user2.jpg',
      username: 'User2',
      storiesUrl: ['story2.jpg'],
      hasUnseenStory: false
    }
  ]

  const onStoryClick = jest.fn()

  beforeEach(() => {
    onStoryClick.mockClear()
  })

  test('renders all story circles with correct images and usernames', () => {
    render(<StoriesContainer stories={stories} onStoryClick={onStoryClick} />)

    expect(screen.getByAltText('User1')).toBeInTheDocument()
    expect(screen.getByAltText('User2')).toBeInTheDocument()

    expect(screen.getByText('User1')).toBeInTheDocument()
    expect(screen.getByText('User2')).toBeInTheDocument()
  })

  test('calls onStoryClick with correct index when a story is clicked', () => {
    render(<StoriesContainer stories={stories} onStoryClick={onStoryClick} />)

    const firstUserStory = screen.getByAltText('User1')
    fireEvent.click(firstUserStory)
    expect(onStoryClick).toHaveBeenCalledTimes(1)
    expect(onStoryClick).toHaveBeenCalledWith(0)
  })
})
