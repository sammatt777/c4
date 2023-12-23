'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HttpAxios } from '@/lib/HttpAxios';
import { toast } from 'react-toastify';

const Singup = () => {
    
    const router = useRouter()

    
  const [obj, setObj] = useState({});

  const objHandler = (e:any) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };
console.log(obj);




const submitHandler = async (e:any) => {
  e.preventDefault();

  try {
  const respBack= await HttpAxios.post('/api/registerUser',obj)
  console.log(respBack);
  
  toast.success('User is Registred',{position:"top-center"})

  if(respBack.data){
    router.push('/Login')
  }
  
  } catch (error) {
  toast.success('User is not  Registred',{position:"top-center"})

    }
  };
  

  return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full text-[#b7d837] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 border-[#b7d837]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
              Create an account
            </h1>
            <form onSubmit={submitHandler} className="space-y-4 md:space-y-6" action="submit">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium ">
                  Your name
                </label>
                <input
                  onChange={objHandler}
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your good name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium ">
                  Your email
                </label>
                <input
                  onChange={objHandler}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium ">
                  Password
                </label>
                <input
                  onChange={objHandler}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
               
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="w-full rounded py-2 text-[#b7d837] bg-gray-600">
                Sign Up
              </button>
              <p className="text-sm">
                Do you have an account?{' '}
                <Link href="/Login" className="font-medium text-primary-600 underline dark:text-primary-500">
                  Login In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Singup;
