// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCl0yJwomuSswcyK63bStHlXR0m_U7bpCk",
    authDomain: "todo-4ecf1.firebaseapp.com",
    projectId: "todo-4ecf1",
    storageBucket: "todo-4ecf1.firebasestorage.app",
    messagingSenderId: "200355548828",
    appId: "1:200355548828:web:706059633ae27c5081a759"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the initialized Firestore instance
export { db };


// npm install firebase@latest
// npm install react-router-dom 
// npm install react-tooltip
// npm install react-icons
// npm install gh-pages --save-dev 

// git commit -m 'minor structure changes'
