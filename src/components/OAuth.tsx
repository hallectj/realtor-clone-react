import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick(){
    try {
      //const db = getFirestore(firebaseApp);
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({'login_hint': 'user@example.com'});
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        });
      }

      navigate("/");

    } catch (error) {
      toast.error("Could not authenticate with Google");
      console.log(error);
    }
  }

  return (
    <button type='button' onClick={onGoogleClick} className='btn-full flex items-center justify-center px-7 py-3 bg-red-700 active:bg-red-900 shadow-md active:shadow-lg transition duration-150 ease-in-out rounded'>
      <FcGoogle className='text-2xl bg-white rounded-full mr-2' /> 
      Continue with Google
    </button>
  )
}
