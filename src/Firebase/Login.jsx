import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Features/authSlice';
import { login } from './auth';

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const dispatch = useDispatch();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await login(email, password);
			dispatch(setUser(userCredential.user));//Store user in redux
			alert("Login Successful");
			window.location.href = '/dashboard';
		} catch (error) {
			setError("Invalid credentials");
		}
	}
	return (
		<div className='flex justify-center items-center min-h-screen bg-gray-900'>
			<form className='bg-gray-800 p-6 rounded-lg shadow-lg text-white w-80' onSubmit={handleLogin}>
				<h2 className='text-2xl font-bold text-center mb-4'>Admin Login</h2>
				{error && <p className='text-red-500'>{error}</p>}
				<input type='email' className='w-full p-2 my-2 bg-gray-700 rounded' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
				<input type='password' className='w-full p-2 my-2 bg-gray-700 rounded' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
				<button className='w-full bg-blue-500 p-2 rounded'>Login</button>
			</form>
		</div>
	);
}

export default Login;
