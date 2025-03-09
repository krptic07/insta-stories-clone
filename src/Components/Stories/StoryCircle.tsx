import React from 'react'
import styles from '~/src/Styles/Stories/StoryCircle.module.scss'

interface StoryCircleProps {
  imageUrl: string
  username: string
  hasUnseenStory?: boolean
  onClick: () => void
}

const StoryCircle: React.FC<StoryCircleProps> = ({
  imageUrl,
  username,
  hasUnseenStory = true,
  onClick
}) => {
  return (
    <div className={styles.storyCircle} onClick={onClick}>
      <div
        className={`${styles.storyRing} ${hasUnseenStory ? styles.unseen : ''}`}
        data-testid='story-ring'
      >
        <div className={styles.avatarContainer}>
          <img src={imageUrl} alt={username} className={styles.avatar} />
        </div>
      </div>
      <span className={styles.username}>{username}</span>
    </div>
  )
}

export default StoryCircle
