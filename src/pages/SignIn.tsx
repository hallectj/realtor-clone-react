import React, { FormEvent, useState } from 'react'
import signInPhoto from '../assets/keys_to_house.jpg'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const {email, password} = formData;
  function onChange($event: { target: HTMLInputElement; }){
    setFormData((prevState) => ({
      ...prevState,
      [$event.target.id] : $event.target.value
    }))
  }

  async function onSubmit($event: FormEvent){
    $event.preventDefault();
    try {
      const auth = getAuth();
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      if(credentials.user){
        navigate("/");
      }
      
    } catch (error) {
      toast.error("Bad user credentials")
    }

  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src={signInPhoto} alt="Keys to House" className='w-full rounded-2xl' />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
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
              <p className='mb-6'>Don't have an account?
                <Link to="/sign-up" className='ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out'>Register</Link>
              </p>
              <p className=''>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out'>Forgot Password?</Link>
              </p>
            </div>

            <div>
            <button type='submit' className='bg-blue-700 transition duration-150 hover:shadow-lg active:bg-blue-800 ease-in-out btn-full px-7 py-3 hover:bg-blue-600'>sign in</button>
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

export default SignIn;
