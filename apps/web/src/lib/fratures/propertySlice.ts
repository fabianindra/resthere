import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataPropertyByRoom } from '@/api/property';

interface PropertyState {
  dataProperty: any[];
  page: number;
  maxPage: number;
  search: string;
  city: string;
  startDate: string;
  endDate: string;
  sortBy: string;
  sortDirection: string;
}

const initialState: PropertyState = {
  dataProperty: [],
  page: 1,
  maxPage: 1,
  search: '',
  city: '',
  startDate: '',
  endDate: '',
  sortBy: '',
  sortDirection: 'asc',
};

export const fetchProperties = createAsyncThunk(
  'property/fetchProperties',
  async (params: {
    page: number;
    city: string;
    search: string;
    sortBy: string;
    sortDirection: string;
    startDate: string;
    endDate: string;
  }) => {
    const { page, city, search, sortBy, sortDirection, startDate, endDate } =
      params;
    const response = await getDataPropertyByRoom(
      page,
      city,
      search,
      sortBy,
      sortDirection,
      startDate,
      endDate,
    );
    return {
      data: response.data.data,
      count: response.data.count,
    };
  },
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    toggleSortDirection: (state) => {
      state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.dataProperty = action.payload.data;
      state.maxPage = Math.ceil(action.payload.count / 4);
    });
  },
});

export const {
  setPage,
  setSearch,
  setCity,
  setSortBy,
  setStartDate,
  setEndDate,
  toggleSortDirection,
} = propertySlice.actions;
export default propertySlice.reducer;
