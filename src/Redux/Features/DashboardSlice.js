import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDashboardStats = createAsyncThunk("dashboard/fetchStats", 
	async function() {
		const usersResponse = await fetch("https://dummyjson.com/users");
		const userData = await usersResponse.json();

		const orderResponse = await fetch("https://dummyjson.com/carts");
		const orderData = await orderResponse.json();

		const productResponse = await fetch("https://dummyjson.com/products");
		const productsData = await productResponse.json();

		//Extract required data
		return {
			totalUsers: userData.total || userData.users.length,
			totalOrders: orderData.total || orderData.carts.length,
			revenue: productsData.products.reduce((acc, item) => acc + (item.price || 0),0)
		}
	}
);

const initialState = {
	totalUsers: 0,
	totalOrders: 0,
	revenue: 0,
	status: "idle",
	error: null
}

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchDashboardStats.pending, (state) => {
			state.status = "loading";
		}).addCase(fetchDashboardStats.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.totalUsers = action.payload.totalUsers;
			state.totalOrders = action.payload.totalOrders;
			state.revenue = action.payload.revenue;
		}).addCase(fetchDashboardStats.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	}
});

export default dashboardSlice.reducer;