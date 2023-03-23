import { configureStore } from '@reduxjs/toolkit'
import PostSlice from '../state/posts/PostSlice'
import UsersSlice from '../state/users/UsersSlice'
export default configureStore({
  reducer: { posts: PostSlice, users: UsersSlice },
})
