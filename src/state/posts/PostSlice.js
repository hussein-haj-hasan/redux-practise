import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
const PostSlice = createSlice({
  name: 'posts',
  initialState: [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' },
  ],
  reducers: {
    addPost: (state, action) => {
      if (action.payload.title && action.payload.content)
        state.push({
          id: nanoid(),
          ...action.payload,
        })
    },
  },
})
export const { addPost } = PostSlice.actions
export default PostSlice.reducer
