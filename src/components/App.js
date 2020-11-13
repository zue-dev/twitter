import { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'firebaseInstance';

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		authService.onAuthStateChanged(user => {
			if (user) {
				setLoggedIn(true);
			} else {
				setLoggedIn(false);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
			<footer>&copy;Twitter {new Date().getFullYear()}</footer>
		</>
	);
}

export default App;
