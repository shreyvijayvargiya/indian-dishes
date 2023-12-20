import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/analytics";
import "firebase/functions";
import "firebase/firestore";

const config = {
	apiKey: "AIzaSyAz-hjGhuQ4wczQMYOAMI9vR2gT7Sw9L6E",
	authDomain: "ihatereading-4ba52.firebaseapp.com",
	databaseURL: "https://ihatereading-4ba52-default-rtdb.firebaseio.com/",
	projectId: "ihatereading-4ba52",
	storageBucket: "ihatereading-4ba52.appspot.com",
	measurementId: "G-NDZCNG6Z5X",
	appId: "1:229243106222:web:fbda9e2ce9f7bb61234e3f",
};
let app;

if (!firebase.apps.length) {
	app = firebase.initializeApp(config);
}

export default app;
