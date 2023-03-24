import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
)

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead: (state, action) => {
      Object.values(state.entities).forEach((notif) => {
        notif.read = true
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationsAdapter.upsertMany(state, action.payload)
      Object.values(state.entities).forEach((notification) => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read
      })
      // Sort with newest first
      //   state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})
export default notificationSlice.reducer
// selectors
export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state) => state.notifications)
export const { allNotificationsRead } = notificationSlice.actions
