import React, { useState } from 'react';
import { authService, firebaseInstance } from 'firebaseInstance';
import AuthForm from 'components/AuthForm';
import styled from 'styled-components';

function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState('');

	function onChange(e) {
		const {
			target: { name, value }
		} = e;
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	}

	async function onSubmit(e) {
		e.preventDefault();
		try {
			if (newAccount) {
				// create account
				await authService.createUserWithEmailAndPassword(email, password);
			} else {
				await authService.signInWithEmailAndPassword(email, password);
			}
		} catch (err) {
			setError(err.message);
		}
	}

	const toggleAccount = () => setNewAccount(prev => !prev);

	const onSocialClick = async e => {
		const {
			target: { name }
		} = e;
		let provider;
		if (name === 'google') {
			provider = new firebaseInstance.auth.GoogleAuthProvider();
		} else if (name === 'github') {
			provider = new firebaseInstance.auth.GithubAuthProvider();
		}
		await authService.signInWithPopup(provider);
	};

	const authData = { email, password, error, newAccount };
	const authActions = { onSubmit, onChange, toggleAccount };

	return (
		<div>
			<AuthForm data={authData} actions={authActions} />
			<Buttons>
				<button name="google" onClick={onSocialClick}>
					Continue with Google
				</button>
				<button name="github" onClick={onSocialClick}>
					Continue with Github
				</button>
			</Buttons>
		</div>
	);
}

export default Auth;

const Buttons = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	button {
		margin-top: 8px;
	}
`;
