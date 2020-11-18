import React, { useState } from 'react';
import { authService } from 'firebaseInstance';
import { useHistory } from 'react-router-dom';

function Profile({ refreshUser, userObj }) {
	const history = useHistory();
	const [displayName, setDisplayName] = useState(userObj.displayName);

	const onLogOutClick = () => {
		authService.signOut();
		history.push('/');
	};

	const onChange = e => {
		const {
			target: { value }
		} = e;
		setDisplayName(value);
	};

	const onSubmit = async e => {
		e.preventDefault();
		if (displayName !== userObj.displayName) {
			await userObj.updateProfile({
				displayName
			});
			refreshUser();
		}
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="Display Name"
					value={displayName}
					onChange={onChange}
				/>
				<input type="submit" placeholder="Update Profile" />
			</form>
			<button onClick={onLogOutClick}>Log out</button>
		</>
	);
}

export default Profile;
