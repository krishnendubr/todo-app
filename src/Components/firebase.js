// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAwfvNyaldPeE9kIgWKe9TiJeWRwGaEVpA",
    authDomain: "todo-4f642.firebaseapp.com",
    projectId: "todo-4f642",
    storageBucket: "todo-4f642.firebasestorage.app",
    messagingSenderId: "324945367088",
    appId: "1:324945367088:web:e9b60d980f18b53d889df5"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the initialized Firestore instance
export { db };


npm install firebase@latest
npm install react-router-dom 
npm install react-tooltip
npm install react-icons
npm install gh-pages --save-dev 

git commit -m 'minor structure changes'