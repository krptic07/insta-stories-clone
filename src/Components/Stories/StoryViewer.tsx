import React, { useEffect, useState } from 'react'
import styles from '~/src/Styles/Stories/StoryViewer.module.scss'
import { Story } from './StoriesContainer'
import Loader from '../Loader/Loader'

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
  const [isLoading, setIsLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(true)

  const currentStory = stories[currentIndex]
  const storyUrls = currentStory.storiesUrl

  const fetchImage = async (url: string): Promise<void> => {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch image')

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)

      // Create image to ensure it's fully loaded
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          URL.revokeObjectURL(imageUrl) // Clean up the object URL
          resolve()
        }
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = imageUrl
      })
    } catch (error) {
      console.error('Error loading image:', error)
      throw error
    }
  }

  // Handle image loading
  useEffect(() => {
    let isMounted = true

    const loadImage = async () => {
      setIsLoading(true)
      setIsPaused(true)
      setProgress(0)

      try {
        await fetchImage(storyUrls[currentStoryIndex])
        if (isMounted) {
          setIsLoading(false)
          setIsPaused(false)
        }
      } catch (error) {
        if (isMounted) {
          setIsLoading(false)
          setIsPaused(false)
          // Optionally handle error case
          console.error('Failed to load image:', error)
        }
      }
    }

    loadImage()

    return () => {
      isMounted = false
    }
  }, [currentIndex, currentStoryIndex, storyUrls])

  useEffect(() => {
    if (isLoading || isPaused) return

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
    currentStory.id,
    isLoading,
    isPaused
  ])

  //Preload next image
  useEffect(() => {
    const preloadNextImage = async () => {
      const nextStoryIndex = currentStoryIndex + 1
      const nextStoryGroupIndex = currentIndex + 1

      if (nextStoryIndex < storyUrls.length) {
        // Preload next image in current story group
        try {
          await fetchImage(storyUrls[nextStoryIndex])
        } catch (error) {
          console.error('Failed to preload next image:', error)
        }
      } else if (nextStoryGroupIndex < stories.length) {
        // Preload first image of next story group
        const nextStoryUrls = Array.isArray(
          stories[nextStoryGroupIndex].storiesUrl
        )
          ? stories[nextStoryGroupIndex].storiesUrl
          : [stories[nextStoryGroupIndex].storiesUrl]

        try {
          await fetchImage(nextStoryUrls[0])
        } catch (error) {
          console.error('Failed to preload next story group image:', error)
        }
      }
    }

    preloadNextImage()
  }, [currentIndex, currentStoryIndex, stories, storyUrls])

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
      if (currentStoryIndex === storyUrls.length - 1) {
        onStoryComplete(currentStory.id)
      }

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

      <div
        className={styles.storyContent}
        onClick={!isLoading ? handleTouchArea : undefined}
      >
        <img
          className={`${styles.storyImage} ${isLoading ? styles.hidden : ''}`}
          alt='story'
          src={storyUrls[currentStoryIndex]}
        />
        {isLoading && (
          <div className={styles.loaderWrapper}>
            <Loader size='large' className={styles.storyLoader} />
          </div>
        )}
      </div>
    </div>
  )
}

export default StoryViewer
