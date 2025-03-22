import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/Features/authSlice';
import { logout } from '../Firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = async () => {
	   await logout();//Perform logout
	   dispatch(logoutUser());//Update logout user
	   navigate("/login");
	}

	return (
		<div className='bg-gray-900 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full'>
			<h2 className=' ml-8 text-xl font-semibold text-white md:ml-64'>Dashboard</h2>
			<div className='relative flex items-center gap-4'>
				<span className='text-white-700'>Admin</span>
				<img src='https://via.placeholder.co/40' alt='Profile' className='w-10 h-10 rounded-full cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
				{/*Dropdown Menu*/}
				{isOpen && (
					<div className='absolute right-0 mt-24 bg-gray-500 w-40  rounded-md shadow-lg py-2'>
						<button className='flex items-center gap-2 w-full px-2 py-2' onClick={handleLogout}>Logout <FiLogOut /></button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Navbar;
