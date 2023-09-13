// import React from 'react'

import { Outlet } from "react-router-dom";

const HomeLayout = () => {
	return (
		<>
			{/* <nav>navbar</nav> */}
			{/* whatever content in the child pages 
			it's going to be display in the outlet*/}
			<Outlet />
		</>
	);

};

export default HomeLayout;