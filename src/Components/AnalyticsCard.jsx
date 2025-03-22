import React from 'react';

const AnalyticsCard = ({title, value}) => {
	return (
		<div className='bg-gray-800 p-6 rounded-lg shadow-md'>

			<h3 className='text-lg font-semibold'>{title}</h3>
			<p className='text-2xl fonr-bold mt-2'>{value}</p>
		</div>
	);
}

export default AnalyticsCard;
