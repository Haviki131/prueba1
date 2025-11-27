// To use Firebase:
// 1. Run: npm install firebase
// 2. Create a project in Firebase Console
// 3. Add your config below
// 4. Change USE_REMOTE to true in notesService.js


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAJ9GuiAvsPGrr3toLSLv0cQvKn5M3snI",
    authDomain: "regalo-3-meses.firebaseapp.com",
    projectId: "regalo-3-meses",
    storageBucket: "regalo-3-meses.firebasestorage.app",
    messagingSenderId: "585525460622",
    appId: "1:585525460622:web:550cc2479930b9b93a53df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const getNotes = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "notes"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error getting notes:", error);
        return [];
    }
};

export const addNote = async (note) => {
    try {
        const docRef = await addDoc(collection(db, "notes"), note);
        return { id: docRef.id, ...note };
    } catch (error) {
        console.error("Error adding note:", error);
        throw error;
    }
};

export const deleteNote = async (id) => {
    try {
        await deleteDoc(doc(db, "notes", id));
    } catch (error) {
        console.error("Error deleting note:", error);
        throw error;
    }
};
