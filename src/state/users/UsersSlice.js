import { createSlice } from '@reduxjs/toolkit'
const UsersSlice = createSlice({
  name: 'users',
  initialState: [
    { id: '0', name: 'Tianna Jenkins' },
    { id: '1', name: 'Kevin Grant' },
    { id: '2', name: 'Madison Price' },
  ],
  reducers: {},
})
export const {} = UsersSlice.actions
export default UsersSlice.reducer
