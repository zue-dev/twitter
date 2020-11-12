import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import EditProfile from 'routes/EditProfile';

export default ({ isLoggedIn }) => {
	return (
		<Router>
			<Switch>
				{isLoggedIn ? (
					<>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/profile">
							<Profile />
						</Route>
						<Route path="/edit-profile">
							<EditProfile />
						</Route>
					</>
				) : (
					<Route exact path="/">
						<Auth />
					</Route>
				)}
			</Switch>
		</Router>
	);
};
