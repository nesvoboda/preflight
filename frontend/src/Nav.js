import React from 'react';

import {
  Switch,
  Link,
  Route,
} from "react-router-dom";




class Nav extends React.Component {
		// let history = useHistory();

	// backbutton() {
	// 	alert("Backbutton triggered")
	// 	let data = sessionStorage.getItem('listName');
	// 	if (!data)
	// 	{
	// 		this.setState({ redirect: "/" });
	// 	}
	// 	else
	// 	{
	// 		this.setState({ redirect: `/${data}` });
	// 	}
	// }

	render() {
		let data = this.props.listName;
		let backLink = data ? data : '/';
		// alert(`backLink: ${backLink}`);
		return (
				<div className="mt-10 flex items-center">
					<div className="flex-grow">
						<h1 className="font-bold text-s md:text-3xl">Preflight 🛫</h1>
						<p className="text-gray-700 text-xs md:text-xl">Share checklists with a click.</p>
					</div>
					<div className=" flex-grow-0 md:ml-20">
						<div className="font-bold text-black md:text-xl text-gray-800 underline hover:no-underline">
							<Switch>
	                                <Route path="/about">
	                                    <Link to={backLink}><h1>Back to app</h1></Link>
	                                </Route>
	                                <Route path="/">
	                                    <Link to="/about"><h1>About</h1></Link>
	                                </Route>
	                        </Switch>
							
						</div>
					</div>
				</div>
			);
	}
}


export default Nav;