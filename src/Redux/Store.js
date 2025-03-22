import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from './Features/DashboardSlice';
import userReducer from './Features/UserSlice';
import authReducer from './Features/authSlice';


const store = configureStore({
	reducer: {
		dashboard: dashboardReducer,
		users: userReducer,
		auth: authReducer
	}
})

export default store;