import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'

const MainLayout: React.ComponentType = () => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
