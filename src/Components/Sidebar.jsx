import React, { useState } from 'react';
import { FaHome, FaUsers, FaBox, FaChartBar, FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
		<button className='md:hidden fixed top-4 left-2 bg-gray-900 text-white pt-3 rounded z-50' onClick={() => setIsOpen(!isOpen)}><FaBars size={20} /></button>
		{/*Sidebar*/}
	<div className={`fixed top-0 left-0 h-screen z-60 bg-gray-900
	 text-white p-5 w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
			<h2 className='text-2xl font-bold mb-6 ml-10 md:ml-2'>Admin Panel</h2>
			<ul className='space-y-4'>
				<li className='flex-item-center gap-3 p-2 hover:bg-gray-700 curser-pointer rounded'><NavLink to={"/"}><FaHome />Dashboard</NavLink></li>
				<li className='flex-item-center gap-3 p-2 hover:bg-gray-700 curser-pointer rounded'><NavLink to={'/users'}><FaUsers />Users</NavLink></li>
				<li className='flex-item-center gap-3 p-2 hover:bg-gray-700 curser-pointer rounded'><FaBox />Orders</li>
				<li className='flex-item-center gap-3 p-2 hover:bg-gray-700 curser-pointer rounded'><FaChartBar />Analytics</li>
			</ul>
			</div>
			{/*Close sidebar on Click*/}
			{/*isOpen && (
			<div className='fixed inset-0 bg-black bg-opacity-50 lg:hidden' onClick={() => setIsOpen(false)}></div>
			)*/}
			</>
	);
}

export default Sidebar;
