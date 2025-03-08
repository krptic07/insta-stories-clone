import React from 'react'
import styles from '~/src/Styles/Loader/Loader.module.scss'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
  fullScreen?: boolean
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  className = '',
  fullScreen = false
}) => {
  return (
    <div
      className={`
      ${styles.container} 
      ${className} 
      ${fullScreen ? styles.fullScreen : ''}
    `}
    >
      <div className={`${styles.spinner} ${styles[size]}`} />
    </div>
  )
}

export default Loader
