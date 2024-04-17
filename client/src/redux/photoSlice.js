import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",
  async (category) => {
    const response = await axios.get(
      `http://localhost:3001/photos?q=${category}`
    )
    return response.data
  }
)

const photosSlice = createSlice({
  name: "photos",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload.hits
        state.totalPages = Math.ceil(action.payload.totalHits / 9)
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { setCurrentPage } = photosSlice.actions
export default photosSlice.reducer
