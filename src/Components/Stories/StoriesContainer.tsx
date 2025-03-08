import React from 'react'
import styles from '~/src/Styles/Stories/StoriesContainer.module.scss'
import StoryCircle from './StoryCircle'

export interface Story {
  id: string
  imageUrl: string
  username: string
  storiesUrl: string[]
  hasUnseenStory?: boolean
}

interface StoriesContainerProps {
  stories: Story[]
  onStoryClick: (storyIndex: number) => void
}

const StoriesContainer: React.FC<StoriesContainerProps> = ({
  stories,
  onStoryClick
}) => {
  return (
    <div className={styles.storiesContainer}>
      <div className={styles.storiesWrapper}>
        {stories.map((story, index) => {
          return (
            <StoryCircle
              key={story.id}
              imageUrl={story.imageUrl}
              username={story.username}
              hasUnseenStory={story.hasUnseenStory}
              onClick={() => onStoryClick(index)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default StoriesContainer
