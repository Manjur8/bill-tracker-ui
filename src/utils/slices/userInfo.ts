import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserInfoState {
  first_name: string
  last_name: string
  user_id: string,
  apartment_access: boolean,
  flat_access: boolean
}

export const initialUserInfoState: UserInfoState = {
  first_name: '',
  last_name: '',
  user_id: '',
  apartment_access: false,
  flat_access: false,
}

export const userInfoSlice = createSlice({
  name: 'counter',
  initialState: initialUserInfoState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.user_id = action.payload.user_id
      state.apartment_access = action.payload.apartment_access
      state.flat_access = action.payload.flat_access
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer