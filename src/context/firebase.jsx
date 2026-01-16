import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import {
    getFirestore,
    addDoc,
    collection,
    serverTimestamp,
    getDoc,
    getDocs,
    doc,
    query,
    where,
} from "firebase/firestore";
const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyBNpJz8mGr91V1oBQV_NCMT_x0vNjKHSo4",
    authDomain: "bookes-6672e.firebaseapp.com",
    projectId: "bookes-6672e",
    storageBucket: "bookes-6672e.firebasestorage.app",
    messagingSenderId: "853236806982",
    appId: "1:853236806982:web:c0d3ba2a2d6c5294786147"
};

export const useFirebase = () => useContext(FirebaseContext);
//instance of firebase app
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();


export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);

    const signupUserWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password);
    }
    const loginUserWithEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password);
    }
    const signInWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleAuthProvider);
    }
    const handleCreateNewListing = async (
        name,
        isbnnumber,
        price,
        coverPicURL
    ) => {
        return await addDoc(collection(firestore, "books"), {
            name,
            isbnnumber,
            price,
            coverPic: coverPicURL,   // URL stored
            createdAt: serverTimestamp(),
            userId: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        });
    };

    const listAllBooks = () => {
        return getDocs(collection(firestore, "books"));
    };

    const getBookById = async (id) => {
        const docRef = doc(firestore, "books", id);
        const result = await getDoc(docRef);
        return result;
    };

    const placeOrder = async (bookId, qty) => {
        const collectionRef = collection(firestore, "books", bookId, "orders");
        const result = await addDoc(collectionRef, {
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty: Number(qty)
        });
        return result;
    };

    const fetchMyOrders = async (userId) => {
        const collectionRef = collection(firestore, "books");
        const q = query(collectionRef, where("userId", "==", userId));
        const result = await getDocs(q);
        return result;
    }

    const getOrders = async (bookId) => {
        const collectionRef = collection(firestore, "books", bookId, "orders");
        const result = await getDocs(collectionRef);
        return result;
    };


    const isLoggedIn = user ? true : false;


    return (
        <FirebaseContext.Provider value={{
            signupUserWithEmailAndPassword,
            loginUserWithEmailAndPassword,
            signInWithGoogle,
            isLoggedIn,
            handleCreateNewListing,
            listAllBooks,
            getBookById,
            placeOrder,
            fetchMyOrders,
            getOrders,
            user
        }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseContext;//........
