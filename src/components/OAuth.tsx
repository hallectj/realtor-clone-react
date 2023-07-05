import React from 'react'
import { FcGoogle } from "react-icons/fc"

export default function OAuth() {
  return (
    <button className='btn-full flex items-center justify-center px-7 py-3 bg-red-700 active:bg-red-900 shadow-md active:shadow-lg transition duration-150 ease-in-out rounded'>
      <FcGoogle className='text-2xl bg-white rounded-full mr-2' /> 
      Continue with Google
    </button>
  )
}
