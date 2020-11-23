import { useState, useEffect } from 'react';
import { authService } from 'firebaseInstance';
import AppRouter from 'components/Router';
import 'style.css';

function App() {
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged(user => {
			if (user) {
				setUserObj({
					uid: user.uid,
					displayName: user.displayName,
					updateProfile: args => user.updateProfile(args)
				});
			} else {
				setUserObj(null);
			}
			setInit(true);
		});
	}, []);

	const refreshUser = () => {
		const user = authService.currentUser;
		setUserObj({
			uid: user.uid,
			displayName: user.displayName,
			updateProfile: args => user.updateProfile(args)
		});
	};

	return (
		<>
			{init ? (
				<AppRouter
					refreshUser={refreshUser}
					isLoggedIn={Boolean(userObj)}
					userObj={userObj}
				/>
			) : (
				'Initializing...'
			)}
		</>
	);
}

export default App;
