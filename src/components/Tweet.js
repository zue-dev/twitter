import React, { useState } from 'react';

function Tweet({ tweetObj, isOwner, onDeleteClick, onSubmitClick }) {
	const [isEditable, setEditable] = useState(false);
	const [newTweet, setNewTweet] = useState(tweetObj.text);

	const handleDeleteClick = () => {
		const ok = window.confirm('Are you sure?');
		if (ok) {
			onDeleteClick();
		} else {
			return null;
		}
	};

	const handleToggleClick = () => setEditable(prev => !prev);

	const onSubmit = e => {
		e.preventDefault();
		onSubmitClick(newTweet);
		handleToggleClick();
	};

	const onChange = e => {
		const {
			target: { value }
		} = e;
		setNewTweet(value);
	};

	return (
		<>
			{isEditable ? (
				<>
					<form onSubmit={onSubmit}>
						<input
							type="text"
							value={newTweet}
							onChange={onChange}
							placeholder="new tweet"
						/>
						<input type="submit" value="Update Tweet" />
					</form>
					<button onClick={handleToggleClick}>Cancel</button>
				</>
			) : (
				<div>
					<h4>{tweetObj.text}</h4>
					{isOwner && (
						<>
							<button onClick={handleDeleteClick}>Delete</button>
							<button onClick={handleToggleClick}>Edit</button>
						</>
					)}
				</div>
			)}
		</>
	);
}

export default Tweet;
