import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserInfoState {
  first_name: string
  last_name: string
}

const initialState: UserInfoState = {
  first_name: '',
  last_name: ''
}

export const userInfoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer