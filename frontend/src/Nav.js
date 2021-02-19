import React from 'react';

class Nav extends React.Component {
	render() {
	return (
			<div className="mt-10 flex items-center">
				<div className="">
					<h1 className="font-bold text-3xl">Preflight 🛫</h1>
					<p className="text-gray-700">Share checklists with a click.</p>
				</div>
				<div className="mx-20 justify-self-end items-center">
					<div className="font-bold text-gray-700 text-l">
						<h1>About</h1>
					</div>
				</div>
			</div>
		);
	}
}

export default Nav;