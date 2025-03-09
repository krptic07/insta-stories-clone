import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import StoryViewer from '../StoryViewer'
import { Story } from '../StoriesContainer'

const stories: Story[] = [
  {
    id: '1',
    imageUrl: 'user1.jpg',
    username: 'User1',
    storiesUrl: ['story1.jpg', 'story2.jpg']
  },
  {
    id: '2',
    imageUrl: 'user2.jpg',
    username: 'User2',
    storiesUrl: ['story3.jpg']
  }
]
