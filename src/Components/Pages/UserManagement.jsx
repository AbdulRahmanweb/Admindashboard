import React, { useEffect, useState } from 'react';
import { FaSortUp, FaSortDown, FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSearchQuery, setSort, setPage, deleteUsers, editUsers } from '../../Redux/Features/UserSlice';

const UserManagement = () => {
	const dispatch = useDispatch();
	const { list, status, error, searchQuery, sortField, sortOrder, currentPage, itemsPerPage } = useSelector((state) => state.users);
	
	const [dropDownOpen, setDropDownOpen] = useState(null);
	const [editUser, setEditUser] = useState(null);
	const [updateData, setUpdateData] = useState({});

	useEffect(() => {
		dispatch(fetchUsers())
	}, [dispatch]);

	//Delete User
	const handleDelete = (userId) => {
		dispatch(deleteUsers(userId));
	}

	//Edit User
	const handleEditClick = (user) => {
		setEditUser(user);
		setUpdateData({firstName: user.firstName, lastName: user.lastName, email: user.email});
	}

	const handleSaveEdit = () => {
		if (!editUser || !editUser.id)
			return;
		dispatch(editUsers({id: editUser.id, updateData})).then((result) => {
			(editUsers.fulfilled.match(result)) 
		setEditUser(null)
			}).catch((error) => console.error("Error updating user", error))
		}

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

		const toggleDropDown = (userId) => {
			setDropDownOpen(dropDownOpen === userId ? null : userId);
		}

	return (
			<div className='p-6 mt-16 md:ml-64'>
				<h2 className='text-2xl font-bold mb-4 max-xs:text-xl'>Users</h2>
				<input className='p-2 border rounded w-full mb-4' type='text' placeholder='Search Users...' value={searchQuery} onChange={(e) => dispatch(setSearchQuery(e.target.value))} />

				{status === "loading" && <p>Loading...</p>}
				{status === "failed" && <p className='text-red-500'>Error: {error}</p>}
				{status === "succeeded" && (
					<>{/*Sorting buttons*/}
					<div className='flex gap-2 mb-4 max-xs:text-xm'>
						<button className='px-1 py-1 bg-blue-500 text-white rounded' onClick={() => dispatch(setSort("id"))}>Sort by Id{sortField === "id" ? (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />) : ""}</button>
						<button className='px-1 py-1 bg-blue-500 text-white rounded' onClick={() => dispatch(setSort("firstName"))}>Sort by Name {sortField === "firstName" ? (setSort === "asc" ? <FaSortUp /> : <FaSortDown />) : ""}</button>
						</div>
					<table className='w-full border-collapse border border-gray-200 max-xs:text-sm'>
						<thead>
							<tr className='bg-gray-800'>
								<th className='border p-1'>ID</th>
								<th className='border p-1'>Name</th>
								<th className='border p-1'>Email</th>
								<th className='border p-1'>Edit</th>
							</tr>
						</thead>
						<tbody>
							{currentUsers.map((user) => (
								<tr className='hover:bg-gray-600' key={user.id}>
									<td className='border pl-1 sm:p-2'>{user.id}</td>
									<td className='border pl-1 sm:p-2'>{user.firstName} {user.lastName}</td>
									<td className='border pl-1 sm:p-2'>{user.email}</td>
									
									<td className='border pl-1 sm:p-2 relative'>
										<button className='px-2 py-1 text-white rounded' onClick={() => toggleDropDown(user.id)}>
										<FaPencilAlt /></button>

										{dropDownOpen === user.id && (
											<div className='absolute right-0 mt-2 w-24 bg-gray-500 shadow-lg rounded z-10'>
											<button className='block w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white' onClick={() => handleEditClick(user)}>Edit</button>
											<button className='block w-full px-4 py-2 text-left hover:bg-red-500 hover:text-white' onClick={() => handleDelete(user.id)}>Delete</button>
										</div>
										)}
										{editUser && (
											<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-10'>
												<div className='bg-gray-500 p-6 rounded-lg shadow-lg w-96'>
													<h2 className='text-xl font-semibold mb-4'>Edit User</h2>
													<input className='w-full p-2 border rounded mb-2' type='text' placeholder='First Name' value={updateData.firstName} onChange={(e) => setUpdateData({...updateData, firstName: e.target.value})} /> 
													<input className='w-full p-2 border rounded mb-2' type='text' placeholder='LastName' value={updateData.lastName} onChange={(e) => setUpdateData({...updateData, lastName: e.target.value})} /> 
													<input className='w-full p-2 border rounded mb-2' type='text' placeholder='Email' value={updateData.email} onChange={(e) => setUpdateData({...updateData, email: e.target.value})} /> 
													<div className='flex justify-end space-x-2'>
														<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transistion' onClick={handleSaveEdit}>Save</button>
														<button className='bg-gray-400 text-white px-4 py-2 rounded hover:bg-red-500 transistion' onClick={() => setEditUser(null)}>Cancel</button>
													</div>
												</div>
											</div>
										)}
									</td>
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
