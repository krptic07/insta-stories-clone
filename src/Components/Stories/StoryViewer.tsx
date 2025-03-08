import React, { useEffect, useState } from 'react'
import styles from '~/src/Styles/Stories/StoryViewer.module.scss'
import { Story } from './StoriesContainer'

interface StoryViewerProps {
  stories: Story[]
  initialStoryIndex: number
  onClose: () => void
  onStoryComplete: (storyId: string) => void
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  initialStoryIndex,
  onClose,
  onStoryComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const currentStory = stories[currentIndex]
  const storyUrls = currentStory.storiesUrl

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentStoryIndex === storyUrls.length - 1) {
            onStoryComplete(currentStory.id)
          }

          if (currentStoryIndex < storyUrls.length - 1) {
            setCurrentStoryIndex(prev => prev + 1)
            return 0
          } else if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setCurrentStoryIndex(0)
            return 0
          } else {
            onClose()
            return prev
          }
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(timer)
  }, [
    currentIndex,
    currentStoryIndex,
    stories.length,
    storyUrls.length,
    onClose,
    onStoryComplete,
    currentStory.id
  ])

  const handleTouchArea = (e: React.MouseEvent) => {
    const { clientX } = e
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const isLeftSide = clientX - left < width / 2
    if (isLeftSide) {
      if (currentStoryIndex > 0) {
        setCurrentStoryIndex(currentStoryIndex - 1)
        setProgress(0)
      } else if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
        setCurrentStoryIndex(
          Array.isArray(stories[currentIndex - 1].storiesUrl)
            ? stories[currentIndex - 1].storiesUrl.length - 1
            : 0
        )
        setProgress(0)
      }
    } else {
      if (currentStoryIndex < storyUrls.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1)
        setProgress(0)
      } else if (currentIndex < stories.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setCurrentStoryIndex(0)
        setProgress(0)
      }
    }
  }

  return (
    <div className={styles.storyViewer}>
      <div className={styles.progressContainer}>
        {storyUrls.map((_, index) => {
          return (
            <div key={index} className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{
                  width: `${
                    index === currentStoryIndex
                      ? progress
                      : index < currentStoryIndex
                      ? 100
                      : 0
                  }%`
                }}
              ></div>
            </div>
          )
        })}
      </div>

      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img
            className={styles.avatar}
            src={stories[currentIndex].imageUrl}
            alt={stories[currentIndex].username}
          />
          <span className={styles.username}>
            {stories[currentIndex].username}
          </span>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <i className='ri-close-large-fill'></i>
        </button>
      </div>

      <div className={styles.storyContent} onClick={handleTouchArea}>
        <img
          className={styles.storyImage}
          alt='story'
          src={storyUrls[currentStoryIndex]}
        />
      </div>
    </div>
  )
}

export default StoryViewer
