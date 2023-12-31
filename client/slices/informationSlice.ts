import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ICompetition } from '../types/competition';
import { $host } from '../http';

interface InformationSlice {
  competition: ICompetition[],
  status: string
  error: string
}

export const fetchCompetitions = createAsyncThunk(
   'information/FetchInformation',
   async () => {
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'competition')
      return response.data.rows;
   }
) 

const initialState: InformationSlice = {
   competition: [],
   status: 'loading',
   error: ''
}

export const userSlice = createSlice({
  name: 'information',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
   builder
      .addCase(fetchCompetitions.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(fetchCompetitions.fulfilled, (state, action) => {
         state.competition = action.payload;
         state.status = 'idle';
      })
      .addCase(fetchCompetitions.rejected, (state) => {
         state.status = 'error';
      })
      .addDefaultCase(() => {})
  },
  
})

const {actions, reducer} = userSlice;
export default reducer;

