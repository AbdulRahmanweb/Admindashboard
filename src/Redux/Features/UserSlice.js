import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", 
	async function() {
		const response = await fetch("https://dummyjson.com/users");
		const data = await response.json();
		return data.users;
	});

	//Delete User 
	export const deleteUsers = createAsyncThunk("users/deleteUser", 
		async (userId) => {
			 await fetch(`https://dummyjson.com/users/${userId}`);
			return userId;
		});

		//Edit User
		export const editUsers = createAsyncThunk("users/editUser", 
			async ({id, updatedData}) => {
				const res =  await fetch(`https://dummyjson.com/users/${id}`,{
					method: "PUT",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(updatedData),
				});
				return res.json();
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
		}).addCase(deleteUsers.fulfilled, (state, action) => {
			state.list = state.list.filter((user) => user.id !== action.payload);
		}).addCase(editUsers.fulfilled, (state, action) => {
			const index = state.list.findIndex((user) => user.id === action.payload.id);
			if (index !== -1) {
				state.list[index] = 
				{...state.list[index], ...action.payload}
			}
		});
	}
});

export const { setSearchQuery, setSort, setPage } = userSlice.actions;
export default userSlice.reducer;