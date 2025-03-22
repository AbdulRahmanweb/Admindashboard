import React, { useEffect } from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSearchQuery, setSort, setPage } from '../../Redux/Features/UserSlice';

const UserManagement = () => {
	const dispatch = useDispatch();
	const { list, status, error, searchQuery, sortField, sortOrder, currentPage, itemsPerPage } = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(fetchUsers())
	}, [dispatch]);

	//Filtering users based on search query
	const filteredUsers = list.filter((user) => user.firstName.toLowerCase().includes(searchQuery.toLowerCase()));

	//Sorting users dynamically
	const sortedUsers = [...filteredUsers].sort((a, b) => {
		if (sortOrder === "asc") { return a[sortField] > b[sortField] ? 1 : -1}
		else {return a[sortField] < b[sortField] ? 1 : -1}
	});

	//Pagination login
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

	return (
			<div className='p-6 mt-16 md:ml-64 max-xs:mt-12'>
				<h2 className='text-2xl font-bold mb-4 max-xs:text-xl'>Users</h2>
				<input className='max-xs:p-1 p-2 border rounded w-full mb-4' type='text' placeholder='Search Users...' value={searchQuery} onChange={(e) => dispatch(setSearchQuery(e.target.value))} />

				{status === "loading" && <p>Loading...</p>}
				{status === "failed" && <p className='text-red-500'>Error: {error}</p>}
				{status === "succeeded" && (
					<>{/*Sorting buttons*/}
					<div className='flex gap-2 mb-4 max-xs:text-sm'>
						<button className='px-1 py-1 bg-blue-500 text-white rounded' onClick={() => dispatch(setSort("id"))}>Sort by Id{sortField === "id" ? (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />) : ""}</button>
						<button className='px-1 py-1 bg-blue-500 text-white rounded' onClick={() => dispatch(setSort("firstName"))}>Sort by Name {sortField === "firstName" ? (setSort === "asc" ? <FaSortUp /> : <FaSortDown />) : ""}</button>
						</div>
					<table className='w-full border-collapse border border-gray-200 max-xs:text-xs'>
						<thead>
							<tr className='bg-gray-800'>
								<th className='border p-1'>ID</th>
								<th className='border p-1'>Name</th>
								<th className='border p-1'>Email</th>
							</tr>
						</thead>
						<tbody>
							{currentUsers.map((user) => (
								<tr className='hover:bg-gray-600' key={user.id}>
									<td className='border pl-1 sm:p-2'>{user.id}</td>
									<td className='border pl-1 sm:p-2'>{user.firstName} {user.lastName}</td>
									<td className='border pl-1 sm:p-2'>{user.email}</td>
								</tr>
							))}
						</tbody>
					</table>
					{/*Pagination Controls*/}
					<div className='flex justify-center mt-4'>
						<button className='px-3 py-1 bg-gray-500 text-white rounded mr-2 disabled:opacity-50' disabled={currentPage === 1} onClick={() => dispatch(setPage(currentPage - 1))}>Prev</button>
						<span className='px-3 py-1'>{currentPage}/{totalPages}</span>
						<button className='px-3 py-1 bg-gray-500 text-white rounded ml-2 disabled:opacity-50' disabled={currentPage === totalPages} onClick={() => dispatch(setPage(currentPage + 1))}>Next</button>
					</div>
					</>
					)}
			</div>
	);
}

export default UserManagement;
