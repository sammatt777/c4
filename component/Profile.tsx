import { HttpAxios } from '@/lib/HttpAxios';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaClipboardUser } from 'react-icons/fa6';
import { toast } from 'react-toastify';




 const Profile =()=> {
   const router = useRouter();

    const [name,setname]:any=useState();

   const getdata= async()=>{
    const response:any = await axios.get('http://localhost:3000/api/loginUser');
    setname(response.data.name)
  }
  useEffect(()=>{
getdata()
  },[])

  const [boolean,setboolean]:any=useState(false);

  const showHandle =()=>{
    if(boolean){
      setboolean(false)
    }else{
      setboolean(true)
    }
  }


  const logHandle =async()=>{
  
  
    const resp=  await  HttpAxios.post('/api/logoutUser')
    
    if(resp.data=="logOut"){
      console.log(resp.data);
      toast.success('User logged out')
      router.push('/')
    }
  
  }
  

  return (
    <>
        <div className=' relative text-[#b7d837] gap-2 cursor-pointer text-xl font-bold text-center flex items-center justify-center'>
          <FaClipboardUser onClick={showHandle}  />
          <p onClick={showHandle}>{name}</p>
        {boolean&&
          <ul onClick={logHandle}  >
              <li >LogOut</li>
          </ul>}    
        </div>


    </>
  );
};

export default Profile