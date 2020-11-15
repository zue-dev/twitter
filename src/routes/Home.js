import React, { useState, useEffect } from 'react';
import { dbService } from 'firebaseInstance';
import Tweet from 'components/Tweet';

function Home({ userObj }) {
	const [tweet, setTweet] = useState('');
	const [tweets, setTweets] = useState([]);

	useEffect(() => {
		dbService.collection('tweets').onSnapshot(snapshot => {
			const tweetArray = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setTweets(tweetArray);
		});
	}, []);

	const onSubmit = async e => {
		e.preventDefault();
		try {
			await dbService
				.collection('tweets')
				.add({ text: tweet, createdAt: Date.now(), creatorId: userObj.uid });
			setTweet('');
		} catch (err) {
			console.log(err);
		}
	};

	const onChange = e => {
		const {
			target: { value }
		} = e;
		setTweet(value);
	};

	const handleDeleteClick = async id => {
		try {
			await dbService.doc(`tweets/${id}`).delete();
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmitClick = async (id, newTweet) => {
		try {
			await dbService.doc(`tweets/${id}`).update({
				text: newTweet
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="무슨 일이 일어나고 있나요?"
					maxLength={120}
					onChange={onChange}
					value={tweet}
				/>
				<input type="submit" value="Tweet" />
			</form>
			<div>
				{tweets.map(tweet => (
					<Tweet
						key={tweet.id}
						tweetObj={tweet}
						isOwner={tweet.creatorId === userObj.uid}
						onDeleteClick={() => handleDeleteClick(tweet.id)}
						onSubmitClick={newTweet => handleSubmitClick(tweet.id, newTweet)}
					/>
				))}
			</div>
		</div>
	);
}

export default Home;
