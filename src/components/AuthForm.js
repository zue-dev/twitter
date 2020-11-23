import React from 'react';
import styled from 'styled-components';

function AuthForm({ data, actions }) {
	const { email, password, error, newAccount } = data;
	const { onSubmit, onChange, toggleAccount } = actions;

	return (
		<>
			<Form onSubmit={onSubmit}>
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
			</Form>
			<Error>{error}</Error>
			<Toggle onClick={toggleAccount}>
				{newAccount ? 'Sign In' : 'Create Account'}
			</Toggle>
		</>
	);
}

export default AuthForm;

const Toggle = styled.span`
	display: block;
	width: 200px;
	height: 40px;
	margin: 0 auto;
	border-radius: 20px;
	color: #eeeeee;
	text-align: center;
	background: #686d76;
	line-height: 40px;
`;

const Error = styled.div`
	margin: 16px 0 32px;
	text-align: center;
	color: #ff414d;
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;

	input {
		margin-bottom: 16px;
		&:last-child {
			margin-bottom: 0;
		}
	}
`;
