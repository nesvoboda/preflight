import React from 'react';

class Nav extends React.Component {
	render() {
	return (
			<div className="mt-10 flex items-center">
				<div className="flex-grow">
					<h1 className="font-bold text-s md:text-3xl">Preflight 🛫</h1>
					<p className="text-gray-700 text-xs md:text-xl">Share checklists with a click.</p>
				</div>
				<div className=" flex-grow-0 md:mx-20">
					<div className="font-bold text-gray-700 md:text-3xl">
						<h1>About</h1>
					</div>
				</div>
			</div>
		);
	}
}

export default Nav;