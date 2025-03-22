import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", 
	async function() {
		const response = await fetch("https://dummyjson.com/users");
		const data = await response.json();
		return data.users;
	});

const userSlice = createSlice({
	name: "users",
	initialState: {
		list: [],
		status: "idle",
		error: null,
		searchQuery: "",
		sortField: "id", //Default sorting by id
		sortOrder: "asc", //Default order ascending
		currentPage: 1,
		itemsPerPage: 15 //Showing 10 users per page
	},
	reducers: {
		setSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
		},
		setSort: (state, action) => {
			state.sortField = action.payload;
			state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
		},
		setPage: (state, action) => {
			state.currentPage = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.pending, (state) => {
			state.status = "loading";
		}).addCase(fetchUsers.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.list = action.payload;
		}).addCase(fetchUsers.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	}
});

export const { setSearchQuery, setSort, setPage } = userSlice.actions;
export default userSlice.reducer;