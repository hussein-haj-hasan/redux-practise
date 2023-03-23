import { createSlice, nanoid } from '@reduxjs/toolkit'
const PostSlice = createSlice({
  name: 'posts',
  initialState: [
    {
      id: '1',
      user: '0',
      title: 'First Post!',
      content: 'Hello!',
      date: '2019-02-04T11:22:00.000Z',
      reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    },
    {
      id: '2',
      user: '1',
      title: 'Second Post',
      content: 'More text',
      date: '2023-03-23T05:00:09.169Z',
      reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    },
  ],
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
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
      const index = state.findIndex((data) => data.id === action.payload.id)
      if (index) {
        state[index].title = action.payload.title
        state[index].content = action.payload.content
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})
export const { postAdded, postUpdated, reactionAdded } = PostSlice.actions
export default PostSlice.reducer
