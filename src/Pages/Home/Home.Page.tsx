import React, { useEffect, useState } from 'react'
import StoriesContainer, {
  Story
} from '~/src/Components/Stories/StoriesContainer'
import StoryViewer from '~/src/Components/Stories/StoryViewer'
import storiesJSONData from '~/src/Data/storiesData.json'

const HomePage: React.FC = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null
  )
  const [showStoryViewer, setShowStoryViewer] = useState(false)
  const [stories, setStories] = useState<Story[]>(() => {
    const savedStories = sessionStorage.getItem('stories')
    if (savedStories) {
      const parsedStories = JSON.parse(savedStories)
      return parsedStories
    }
    return storiesJSONData.stories
  })

  useEffect(() => {
    sessionStorage.setItem('stories', JSON.stringify(stories))
  }, [stories])

  const handleStoryComplete = (storyId: string) => {
    setStories(prevStories => {
      const updatedStories = prevStories.map(story =>
        story.id === storyId ? { ...story, hasUnseenStory: false } : story
      )
      return updatedStories
    })
  }

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index)
    setShowStoryViewer(true)
  }

  const handleClose = () => {
    setShowStoryViewer(false)
    setSelectedStoryIndex(null)
  }

  return (
    <div>
      <StoriesContainer stories={stories} onStoryClick={handleStoryClick} />

      {showStoryViewer && selectedStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
          onClose={handleClose}
          onStoryComplete={handleStoryComplete}
        />
      )}
    </div>
  )
}

export default HomePage
