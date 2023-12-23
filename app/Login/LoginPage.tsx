'use client'
import React, {  useState } from 'react';
import { useRouter} from 'next/navigation';
import Link from 'next/link';
import { HttpAxios } from '@/lib/HttpAxios';
import { toast } from 'react-toastify';

const Login = () => {
  
  const Router = useRouter();
  const [obj, setObj] = useState({});
  
  const objHandler = (e:any) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };


    const submitHandler = async (e: any) => {
    e.preventDefault();
  
    try {

    const resp= await HttpAxios.post('/api/loginUser',obj)
      console.log(resp);
      if(resp.data=="email"){
        toast.error('email not found')
      }else if(resp.data=="password"){
        toast.error('password not found')
      }else{
        toast.success('logined successfully')
          Router.push('/home')
      }
      

    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  



 

  return (
    // <section className="bg-gray-50 text-white dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
        <div className="w-full  text-[#b7d837] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 border-[#b7d837]  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight  md:text-2xl">
              Login to Start
            </h1>
            <form onSubmit={submitHandler} className="space-y-4 md:space-y-6" action="submit">
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
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="w-full rounded py-2 text-[#b7d837] bg-gray-600">
                Sign in
              </button>
              <p className="text-sm">
                Don’t have an account yet?{' '}
                <Link href="/Register" className=" font-medium text-primary-600 underline dark:text-primary-500">
                  Register 
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    // </section>
  );
};

export default Login;
