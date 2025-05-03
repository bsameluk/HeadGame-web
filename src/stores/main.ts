import { createLogger } from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'
import teamEditSheetSlice from './teamEditSheet/teamEditSheetSlice'
import gameSlice from './game/gameSlice'

const middleware = (getDefaultMiddleware: any) => {
  const middlewares = getDefaultMiddleware()

  if (process.env.NODE_ENV === 'development' || true) {
    middlewares.push(createLogger({ collapsed: true }))
  }

  return middlewares
}

export const store = configureStore({
  reducer: {
    game: gameSlice,
    teamEditSheet: teamEditSheetSlice,
  },
  middleware,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
