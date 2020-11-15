import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID
};

firebase.default.initializeApp(firebaseConfig);

export const firebaseInstance = firebase.default;
export const authService = firebaseInstance.auth();
export const dbService = firebaseInstance.firestore();
