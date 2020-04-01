import { configureStore } from '@reduxjs/toolkit'
import PostSlice from '../state/posts/PostSlice'
export default configureStore({
  reducer: { posts: PostSlice },
})
