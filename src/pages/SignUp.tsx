import React, { FormEvent, useState } from 'react'
import signInPhoto from '../assets/keys_to_house.jpg'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { firebaseApp } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile, User } from "firebase/auth";
import { updateDoc, serverTimestamp, FieldValue, setDoc, doc, getFirestore } from "firebase/firestore";
import { toast } from 'react-toastify';


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const {name, email, password} = formData;
  const navigate = useNavigate();
  const toastId = React.useRef(null);

  function onChange($event: { target: HTMLInputElement; }){
    setFormData((prevState) => ({
      ...prevState,
      [$event.target.id] : $event.target.value
    }))
  }

  async function onSubmit(event: any){
    event.preventDefault();
    try {
      const auth = getAuth(firebaseApp);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser: User = auth.currentUser as User;
      updateProfile(currentUser, {displayName: name});
      const user = userCredential.user;
      const formDataCopy: {name: string, email: string, timestamp: FieldValue} = {name, email, timestamp:  serverTimestamp()}
      const db = getFirestore(firebaseApp);

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong the registration");
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src={signInPhoto} alt="Keys to House" className='w-full rounded-2xl' />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input className='form_input_styles mb-6' 
              placeholder='Full Name' type='name' id='name' value={name} onChange={onChange} 
            />
            <input className='form_input_styles mb-6' 
              placeholder='Email address' type='email' id='email' value={email} onChange={onChange} 
            />
            <div className='relative mb-6'>
              <input className='form_input_styles' placeholder='Password' type={showPassword ? 'text' : 'password'} 
                id='password' value={password} onChange={onChange} 
              />
              { (showPassword) ? 
                <AiFillEyeInvisible className='password_icon'onClick={() => setShowPassword((prevState) => !prevState)} /> : 
                <AiFillEye className='password_icon' onClick={() => setShowPassword((prevState) => !prevState)} /> 
              } 
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Have an account?
                <Link to="/sign-in" className='ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out'>Sign in</Link>
              </p>
              <p className=''>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out'>Forgot Password?</Link>
              </p>
            </div>

            <div>
            <button type='submit' className='bg-blue-700 transition duration-150 hover:shadow-lg active:bg-blue-800 ease-in-out btn-full px-7 py-3 hover:bg-blue-600'>sign up</button>
          </div>
          <div className='my-4 items-center flex before:border-t before:flex-1 after:border-gray-300 after:border-t after:flex-1 before:border-gray-300'>
            <p className='text-center font-semibold text-sm mx-4'>OR</p>
          </div>
          <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp;
