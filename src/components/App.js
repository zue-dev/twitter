import { useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'firebaseInstance';

function App() {
	const [isLoggedIn, setLoggedIn] = useState(authService.currentUser);

	return (
		<>
			<AppRouter isLoggedIn={isLoggedIn} />
			<footer>&copy;Twitter {new Date().getFullYear()}</footer>
		</>
	);
}

export default App;
