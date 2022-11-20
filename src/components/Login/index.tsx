import React, { useState } from 'react'
import styles from './style.module.scss';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";

function Login() {
    const [loading, setLoading] = useState(false);
    const authWithGoogle = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        await signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
        setLoading(false);
    }

    return (
        <div className={styles.wrapper} >
            <h6>
                Sign in Todo App
            </h6>
            <img width='50%' src='/assets/login.svg' />
            <h4 />
            <button
                disabled={loading}
                onClick={authWithGoogle}
            >
                {
                    loading
                        ?
                        'Waiting...'
                        :
                        <span><i className='bi bi-google' /> Sign in with Google</span>
                }
            </button>
        </div>
    )
}

export default Login;