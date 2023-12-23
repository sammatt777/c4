'use client'
import { HttpAxios } from '@/lib/HttpAxios';
import React, { useEffect, useState } from 'react'
import { MdAddCircle } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { toast } from 'react-toastify';




const EarnedColumn = () => {

  




  useEffect(() => {
  
  }, [])

  



  const [obj, setObj]: any = useState({})
  const onChanging = (e: any) => {
    setObj({ ...obj, [e.target.name]: e.target.value })
  };





  const subtmihandle = async (e: any) => {
    if(obj.value&&obj.amount){

    toast.success('Added Successfully')

  
  }else{ toast.warning('Fill value & Amount to submit')}

  }// submit Handle



  const moveDownHandle = async (e: any) => {
    const { val, id } = e;
  }


  const moveUpHandle = async (e: any) => {
    const { val, id } = e;
  }


  const deleteHandel = async (e: any) => {
    const { val, id } = e;
  }



  return (
    <>

      {/* Earned income Column */}
    


    </>
  )
}

export default EarnedColumn