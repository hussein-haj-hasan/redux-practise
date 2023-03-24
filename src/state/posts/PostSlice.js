import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const PostSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      // it isn't good to generate random id inside reducer cuz its behaviour is unpredicatebe
      // so it's better to add prepare function which take args and return payload object
      // when dispatch you need to put the args like the arge we defined in prepate
      // so you add dispatch(postAdded(title,content)) notice not object of args
      // then the prepare will process the args then send them to reducer
      // prepare callback is useful when you want to generate random id or add some synchrounous
      // logics on args you can add meta field and error field
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            user: userId,
            title,
            content,
            date: new Date().toISOString(),
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          },
        }
      },
    },

    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        // Use the `upsertMany` reducer as a mutating update utility
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failded'
        state.error = action.error.message
      })
      // Use the `addOne` reducer for the fulfilled case
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
  },
})
// selectors
// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state) => state.posts)

// const selectAllPosts = (state) => state.posts.posts
// const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)

export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId)
// thunk
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  console.log(response.data)
  return response.data
})
export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (state) => {
    const response = await client.post('/fakeApi/posts', state)
    return response.data
  }
)
export const { postAdded, postUpdated, reactionAdded } = PostSlice.actions
export default PostSlice.reducer
