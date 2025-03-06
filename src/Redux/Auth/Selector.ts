import { createSelector } from '@reduxjs/toolkit'
import { TAppStore } from '~/src/Configurations/AppStore'

export const SLICE_NAME = 'auth'

const select = (state: TAppStore) => state[SLICE_NAME]

export const isLoggedInSelector = createSelector(
  [select],
  auth => auth.isLoggedIn
)
