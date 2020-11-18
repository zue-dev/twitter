import React from 'react';

function AuthForm({ data, actions }) {
	const { email, password, error, newAccount } = data;
	const { onSubmit, onChange, toggleAccount } = actions;

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					name="email"
					type="email"
					placeholder="Email"
					value={email}
					onChange={onChange}
					required
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={onChange}
					required
				/>
				<input
					type="submit"
					value={newAccount ? 'Create Account' : 'Sign In'}
				/>
			</form>
			<div>{error}</div>
			<span onClick={toggleAccount}>
				{newAccount ? 'Sign In' : 'Create Account'}
			</span>
		</>
	);
}

export default AuthForm;
