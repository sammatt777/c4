'use client'
import { HttpAxios } from '@/lib/HttpAxios';
import React, { useEffect, useState } from 'react'
import { MdAddCircle } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { toast } from 'react-toastify';



const PassiveColumn = () => {

  


  const [obj, setObj]: any = useState({})
  const onChanging = (e: any) => {
    setObj({ ...obj, [e.target.name]: e.target.value })
  };




  
  const [getPassiveIncomesData, setgetPassiveIncomesData] = useState([]);
  const getPassiveIncome= async () => {
    const resp = await HttpAxios.get('/api/PassiveIncome')
    // console.log(resp);
    if (resp.data) {
      setgetPassiveIncomesData(resp.data)
    }
  }

  const PI = getPassiveIncomesData && getPassiveIncomesData.map((item: any) => {
    return item.amount
  });
  const TPI = PI && PI.reduce((acc: any, arr: any) => {
    return acc + arr
  }, 0)

  
  const [getAssetsData, setgetAssetsData] = useState([]);
  const AssetsData= async () => {
    const resp = await HttpAxios.get('/api/PassiveAssets')
    // console.log(resp);
    if (resp.data) {
      setgetAssetsData(resp.data)
    }
  }
  const PAs = getAssetsData && getAssetsData.map((item:any) => {
    return item.amount
  });
  const TPAs = PAs && PAs.reduce((acc:any, arr:any) => {
    return acc + arr
  }, 0)



  const [getPassiveExpensesData, setgetPassiveExpensesData] = useState([]);
  const PassiveExpensesData= async () => {
    const resp = await HttpAxios.get('/api/PassiveExpenses')
    // console.log(resp);
    if (resp.data) {
      setgetPassiveExpensesData(resp.data)
    }
  }

  const PE = getPassiveExpensesData && getPassiveExpensesData.map((item: any) => {
    return item.amount
  });
  const TPE = PE && PE.reduce((acc: any, arr: any) => {
    return acc + arr
  }, 0)


  
  useEffect(() => {
    getPassiveIncome()
    AssetsData()
    PassiveExpensesData()
  }, [])

  



  const [passiveIncomeBoolean, setpassiveIncomeBoolean]: any = useState(false)
  const [AssetsBoolean, setAssetsBoolean]: any = useState(false)
  const [passiveExpensesBoolean, setpassiveExpensesBoolean]: any = useState(false)

  const subtmihandle = async (e: any) => {

    if(obj.value&&obj.amount){

      toast.success('Added Successfully')
  
// passiveIncome
     if (e == 'passiveIncome') {
        console.log(obj);
        setpassiveIncomeBoolean(false)
        const resp = await HttpAxios.post('/api/PassiveIncome', obj)
          console.log(resp);
          if (resp.data) {
            location.reload()
          }
          setObj({})
    }

    else if (e == 'Assets') {
      console.log(obj);
      setAssetsBoolean(false)
      const resp = await HttpAxios.post('/api/PassiveAssets', obj)
      if (resp.data) {
        location.reload()
      }
      setObj({})
    }

    else if (e == 'passiveExpenses') {
      console.log(obj);
      setpassiveExpensesBoolean(false)
      const resp = await HttpAxios.post('/api/PassiveExpenses', obj)
      if (resp.data) {
        location.reload()
      }
      setObj({})
    }
  
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


          {/* Passive income Column */}
          <section className=' flex flex-col gap-2 '>

            <div className='my-1 border-b-2 border-[rgb(64,24,62)] h-[150px] overflow-y-scroll '>
            <p onClick={() => { setpassiveIncomeBoolean(true) }} className='cursor-pointer flex justify-between items-center py-1 px-3 text-[#b7d837] rounded-b-sm text-lg font-bold tracking-[3px] bg-[#40183e] aa'>   Passive Income    <MdAddCircle className='text-xl ss' />   </p>
              <ul className='  tracking-[2px] px-4'>
                <li className='flex justify-between gap-4 my-1  border-black border-b border-dashed  '>  <p></p>   <p>Cash Flow</p> </li>

                {getPassiveIncomesData && getPassiveIncomesData.map((item:any, idx:any) => {
                return (
                  <li key={idx} className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  > 
                  <p>{item.value}:</p>  
                  <FaArrowCircleDown onClick={() => moveDownHandle({ val:'passiveIncome', id:idx })} className=' cursor-pointer group-hover:flex hidden' />
                  <AiFillDelete onClick={() => deleteHandel({ val: 'passiveIncome', id: item._id })} className=' cursor-pointer group-hover:flex hehe hidden' />      
                  <FaArrowCircleUp onClick={() => moveUpHandle({ val:'passiveIncome', id:idx })} className=' cursor-pointer group-hover:flex hidden'/>    
                  <p>£{item.amount.toLocaleString()}</p> 
                  </li>
                )
              })}



                {passiveIncomeBoolean &&
                <li className='flex justify-between items-center  my-1 border-b border-black  border-dashed font-bold '>
                  <input onChange={onChanging} className=' w-[45%] outline-none  border-dashed border border-b-0 border-black  bg-transparent ps-1' placeholder='Type...' type="text" name='value' />
                  <input onChange={onChanging} name='amount' className=' w-[45%] outline-none  border-dashed border border-b-0 border-black  bg-transparent ps-1' placeholder='£777' type="number" />
                  <MdAddCircle onClick={() => subtmihandle('passiveIncome')} className='  text-2xl cursor-pointer text-[#b7d837] ' />
                </li>}


              </ul>
            </div>

            {/* Assets Column */}
            <div className='my-1 border-b-2 border-[#40183e] h-[180px] overflow-y-scroll  '>
            <p onClick={() => { setAssetsBoolean(true) }} className='cursor-pointer flex justify-between items-center py-1 px-3 text-[#b7d837] rounded-b-sm text-lg font-bold tracking-[3px] bg-[#40183e] aa'>  Assets   <MdAddCircle className='text-xl ss' />   </p>
              <ul className='  tracking-[2px] px-4'>

              {getAssetsData && getAssetsData.map((item: any, idx: any) => {
                return (
                  <li key={idx} className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >  
                  <p>{item.value}:</p>   
                  <FaArrowCircleDown onClick={() => moveDownHandle({ val:'Assets', id:idx })} className=' cursor-pointer group-hover:flex hidden' />    
                  <AiFillDelete onClick={() => deleteHandel({ val: 'Assets', id: item._id })} className=' cursor-pointer group-hover:flex hehe hidden' />     
                  <FaArrowCircleUp onClick={() => moveUpHandle({ val:'Assets', id:idx })} className=' cursor-pointer group-hover:flex hidden'/>   
                  <p>£{item.amount.toLocaleString()}</p> 
                  </li>
                )
              })}


              {AssetsBoolean &&
                <li className='flex justify-between items-center  my-1 border-b border-black  border-dashed font-bold '>
                  <input onChange={onChanging} className=' w-[45%] outline-none  border-dashed border border-b-0 border-black  bg-transparent ps-1' placeholder='Type...' type="text" name='value' />
                  <input onChange={onChanging} name='amount' className=' w-[45%] outline-none  border-dashed border border-b-0 border-black  bg-transparent ps-1' placeholder='£777' type="number" />
                  <MdAddCircle onClick={() => subtmihandle('Assets')} className='  text-2xl cursor-pointer text-[#b7d837] ' />

                </li>}


              </ul>
            </div>

            {/* Passive Expenses Column */}
            <div className='my-1 border-b-2 border-[#40183e] h-[180px] overflow-y-scroll  '>
            <p onClick={() => { setpassiveExpensesBoolean(true) }} className='cursor-pointer flex justify-between items-center py-1 px-3 text-[#b7d837] rounded-b-sm text-lg font-bold tracking-[3px] bg-[#40183e] aa'>  Passive Expenses    <MdAddCircle className='text-xl ss' />   </p>
           
              <ul className='  tracking-[2px] px-4'>

              {getPassiveExpensesData && getPassiveExpensesData.map((item: any, idx: any) => {
                return (
                  <li key={idx} className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >  
                  <p>{item.value}:</p>     
                  <FaArrowCircleDown onClick={() => moveDownHandle({ val:'passiveExpenses', id:idx })}  className=' cursor-pointer group-hover:flex hidden' />     
                  <AiFillDelete onClick={() => deleteHandel({ val: 'passiveExpenses', id: item._id })} className=' cursor-pointer group-hover:flex hehe hidden' />     
                  <FaArrowCircleUp onClick={() => moveUpHandle({ val:'passiveExpenses', id:idx })}  className=' cursor-pointer group-hover:flex hidden'/>    
                  <p>£{item.amount.toLocaleString()}</p> 
                  </li>
                )
              })}

              {passiveExpensesBoolean &&
                <li className='flex justify-between items-center  my-1 border-b border-black  border-dashed font-bold '>
                  <input onChange={onChanging} className=' w-[45%] outline-none  border-dashed border border-b-0 border-black  bg-transparent ps-1' placeholder='Type...' type="text" name='value' />
                  <input onChange={onChanging} name='amount' className=' w-[45%] outline-none  border-dashed border border-b-0 border-black  bg-transparent ps-1' placeholder='£777' type="number" />
                  <MdAddCircle onClick={() => subtmihandle('passiveExpenses')} className='  text-2xl cursor-pointer text-[#b7d837] ' />

                </li>}


              </ul>
            </div>



            <div className='my-1 border-b-2 border-[#40183e] h-[180px] overflow-y-scroll  '>
              <p className='cursor-pointer flex justify-between items-center py-1 px-3 text-[#b7d837] rounded-b-sm text-lg font-bold tracking-[3px] bg-[#40183e] aa'>   To get out of Rat Race   <MdAddCircle className='text-xl ss' />   </p>

              <ul className='tracking-[2px] px-4'>

               
              <li className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >  <p>Total Passive Income:</p>   <p>£{TPI&&TPI.toLocaleString()}</p> </li>
              <li className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >  <p>Total Passive Expenses:</p>   <p>£{TPE&&TPE.toLocaleString()}</p> </li>
              <li className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >  <p>Total Passive Savings:</p>   <p>£{(TPI - TPE).toLocaleString()}</p> </li>
              <li className='flex justify-between gap-4 mt-6 border-b border-black  border-dashed font-bold group  '  >  <p>Total Assets:</p>   <p>£{TPAs&&TPAs.toLocaleString()}</p> </li>

              </ul>
            </div>


          </section>




    </>
  )
}

export default PassiveColumn