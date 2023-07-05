import React, { FormEvent, useState } from 'react'
import signInPhoto from '../assets/keys_to_house.jpg'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  function onChange($event: { target: HTMLInputElement; }){
    setEmail($event.target.value);
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src={signInPhoto} alt="Keys to House" className='w-full rounded-2xl' />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form>
            <input className='form_input_styles mb-6' 
              placeholder='Email address' type='email' id='email' value={email} onChange={onChange} 
            />
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't have an account?
                <Link to="/sign-up" className='ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out'>Register</Link>
              </p>
              <p className=''>
                <Link to="/sign-in" className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out'>Sign in Instead</Link>
              </p>
            </div>

            <div>
            <button type='submit' className='bg-blue-700 transition duration-150 hover:shadow-lg active:bg-blue-800 ease-in-out btn-full px-7 py-3 hover:bg-blue-600'>send reset password</button>
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

export default ForgotPassword;
