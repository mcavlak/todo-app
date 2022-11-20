import React, { useState } from 'react';
import { createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const Context = createContext();

export default function FirebaseProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const firebaseConfig = {
        apiKey: "AIzaSyBXD2Bx0bQvJ0GUFNDsEXrtbz-ntFV5wpw",
        authDomain: "todo-app-4e7fc.firebaseapp.com",
        databaseURL: "https://todo-app-4e7fc-default-rtdb.firebaseio.com",
        projectId: "todo-app-4e7fc",
        storageBucket: "todo-app-4e7fc.appspot.com",
        messagingSenderId: "646492195933",
        appId: "1:646492195933:web:74af54f168f167fef151b4",
        measurementId: "G-KS2SR5DBN4"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    getAuth().onAuthStateChanged(user => {
        if (user) {
            setCurrentUser(user)
        } else {
            setCurrentUser(null)
        }
    });

    const data = {
        app,
        db,
        firebaseConfig,
        currentUser,
    }
    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}

export const useFirebase = () => useContext(Context)