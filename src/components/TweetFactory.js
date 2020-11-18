import React from 'react';

function TweetFactory({ data, actions }) {
	const { tweet, attachment } = data;
	const { onSubmit, onChange, onFileChange, onClearAttachment } = actions;

	return (
		<form onSubmit={onSubmit}>
			<input
				type="text"
				placeholder="무슨 일이 일어나고 있나요?"
				maxLength={120}
				onChange={onChange}
				value={tweet}
			/>
			<input type="file" accept="image/*" onChange={onFileChange} />
			<input type="submit" value="Tweet" />
			{attachment && (
				<div>
					<img src={attachment} alt="attachment" width="50px" height="50px" />
					<button onClick={onClearAttachment}>Clear</button>
				</div>
			)}
		</form>
	);
}

export default TweetFactory;
