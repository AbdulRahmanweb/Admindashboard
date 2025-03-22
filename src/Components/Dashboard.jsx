import React, { useEffect } from 'react';
import AnalyticsCard from './AnalyticsCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../Redux/Features/DashboardSlice';

const Dashboard = () => {
	const dispatch = useDispatch();

	const {totalUsers, totalOrders, revenue, status, error} = useSelector((state) => state.dashboard || {});

	useEffect(() => {
		dispatch(fetchDashboardStats())
	}, [dispatch]);

	if (status === "loading") {
		return <p>Loading...</p>
	}
	if (status === "failed") {
		return <p>Error: {error}</p>
	}
	return (
		<div className='p-4 mt-16 md:ml-64'>
			<h2 className='text-lg font-bold mb-4'>Dashboard</h2>
			{status === "loading" && <p>Loading stats...</p>}

			{status === "failed" && <p className='text-red-500'>Error: {error}</p>}

			{status === "succeeded" && (
			<div className='bg-gray-700 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				<AnalyticsCard title={"Total Users"} value={totalUsers} />
				<AnalyticsCard title={"Orders"} value={totalOrders} />
				<AnalyticsCard title={"Revenue"} value={`$${revenue.toFixed(2)}`} />
			</div>)
			}
			</div>);
			}

export default Dashboard;
