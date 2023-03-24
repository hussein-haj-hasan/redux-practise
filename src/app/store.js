import { configureStore } from '@reduxjs/toolkit'
import PostSlice from '../state/posts/PostSlice'
import UsersSlice from '../state/users/UsersSlice'
import NotificationsSlice from '../state/notifications/NotificationsSlice'
import { apiSlice } from '../state/api/apiSlice'
export default configureStore({
  reducer: {
    posts: PostSlice,
    users: UsersSlice,
    notifications: NotificationsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiSlice.middleware),
})
