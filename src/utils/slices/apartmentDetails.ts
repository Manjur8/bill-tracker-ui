import { ApartmentsListTypes } from '@/types/appartment'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const initialApartmentDetailsState: ApartmentsListTypes = {
    _id: '',
    name: '',
    available_fund: 0,
    address: {
        country: '',
        city_village: '',
        pincode: 0,
        locality: '',
    }
}

export const apartmentDetailsSlice = createSlice({
  name: 'counter',
  initialState: initialApartmentDetailsState,
  reducers: {
    setApartmentDetails: (state, action: PayloadAction<ApartmentsListTypes>) => {
      state._id = action.payload._id
      state.name = action.payload.name
      state.address = {
        country: action.payload.address.country,
        city_village: action.payload.address.city_village,
        pincode: action.payload.address.pincode,
        locality: action.payload.address.locality,
      }     
    },
  },
})

// Action creators are generated for each case reducer function
export const { setApartmentDetails } = apartmentDetailsSlice.actions

export default apartmentDetailsSlice.reducer