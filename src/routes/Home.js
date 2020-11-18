import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'firebaseInstance';
import { v4 as uuidv4 } from 'uuid';

import Tweet from 'components/Tweet';
import TweetFactory from 'components/TweetFactory';

function Home({ userObj }) {
	const [tweet, setTweet] = useState('');
	const [tweets, setTweets] = useState([]);
	const [attachment, setAttachment] = useState('');

	useEffect(() => {
		dbService.collection('tweets').onSnapshot(snapshot => {
			const tweetArray = snapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id
			}));
			setTweets(tweetArray);
		});
	}, []);

	const onSubmit = async e => {
		e.preventDefault();
		let attachmentUrl = '';

		if (attachment !== '') {
			const attachmentRef = storageService
				.ref()
				.child(`${userObj.uid}/${uuidv4()}`);
			const response = await attachmentRef.putString(attachment, 'data_url');
			attachmentUrl = await response.ref.getDownloadURL();
		}

		const tweetObj = {
			text: tweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentUrl
		};

		try {
			await dbService.collection('tweets').add(tweetObj);

			setTweet('');
			setAttachment('');
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

	const onFileChange = e => {
		const {
			target: { files }
		} = e;
		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = function (finishedEvent) {
			const {
				currentTarget: { result }
			} = finishedEvent;
			setAttachment(result);
		};
		reader.readAsDataURL(theFile);
	};

	const onClearAttachment = () => setAttachment(null);

	const handleDeleteClick = async (id, url) => {
		try {
			await dbService.doc(`tweets/${id}`).delete();
			await storageService.refFromURL(url).delete(); // image path
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

	const data = {
		tweet,
		attachment
	};

	const actions = {
		onSubmit,
		onChange,
		onFileChange,
		onClearAttachment
	};

	return (
		<div>
			<TweetFactory data={data} actions={actions} />
			<div>
				{tweets.map(tweet => (
					<Tweet
						key={tweet.id}
						tweetObj={tweet}
						isOwner={tweet.creatorId === userObj.uid}
						onDeleteClick={url => handleDeleteClick(tweet.id, url)}
						onSubmitClick={newTweet => handleSubmitClick(tweet.id, newTweet)}
					/>
				))}
			</div>
		</div>
	);
}

export default Home;
