import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
	apiKey: "AIzaSyA3hyi3CDwLsC6j5UKBPhVYd3EkieSSVCU",
	authDomain: "auth-71ae4.firebaseapp.com",
	projectId: "auth-71ae4",
	storageBucket: "auth-71ae4.appspot.com",
	messagingSenderId: "843284437282",
	appId: "1:843284437282:web:8b51c86da229ded492ed7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
