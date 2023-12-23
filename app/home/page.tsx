'use client'
import React, { useEffect, useState } from 'react'
import Profile from '../../component/Profile'
import { HttpAxios } from '@/lib/HttpAxios';
import { MdAddCircle } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { toast } from 'react-toastify';


const HomeScreen = () => {


  const [obj, setObj]: any = useState({})
  const onChanging = (e: any) => {
    setObj({ ...obj, [e.target.name]: e.target.value })
  };





  const [getPassiveIncomesData, setgetPassiveIncomesData] = useState([]);
  const getPassiveIncome = async () => {
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
  const AssetsData = async () => {
    const resp = await HttpAxios.get('/api/PassiveAssets')
    // console.log(resp);
    if (resp.data) {
      setgetAssetsData(resp.data)
    }
  }
  const PAs = getAssetsData && getAssetsData.map((item: any) => {
    return item.amount
  });
  const TPAs = PAs && PAs.reduce((acc: any, arr: any) => {
    return acc + arr
  }, 0)



  const [getPassiveExpensesData, setgetPassiveExpensesData] = useState([]);
  const PassiveExpensesData = async () => {
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



  const [earnedIncomeData, setearnedIncomeData] = useState([]);
  const getEarnedIncome = async () => {
    const resp = await HttpAxios.get('/api/EarnedIncome')
    // console.log(resp);
    if (resp.data) {
      setearnedIncomeData(resp.data)
    }
  }

  const EI = earnedIncomeData && earnedIncomeData.map((item: any) => {
    return item.amount
  });
  const TEI = EI && EI.reduce((acc: any, arr: any) => {
    return acc + arr
  }, 0)



  const [liabilitiesData, setliabilitiesData] = useState([]);
  const getEarnedLiabilities = async () => {
    const resp = await HttpAxios.get('/api/EarnedLiabilities')
    // console.log(resp);
    if (resp.data) {
      setliabilitiesData(resp.data)
    }
  }

  const ELiab = liabilitiesData && liabilitiesData.map((item: any) => {
    return item.amount
  });
  const TELiab = ELiab && ELiab.reduce((acc: any, arr: any) => {
    return acc + arr
  }, 0)



  const [EarnedExpensesData, setEarnedExpensesData] = useState([]);
  const getEarnedExpenses = async () => {
    const resp = await HttpAxios.get('/api/EarnedExpenses')
    // console.log(resp);
    if (resp.data) {
      setEarnedExpensesData(resp.data)
    }
  }

  const EE = EarnedExpensesData && EarnedExpensesData.map((item: any) => {
    return item.amount
  });
  const TEE = EE && EE.reduce((acc: any, arr: any) => {
    return acc + arr
  }, 0)

  useEffect(() => {
    getPassiveIncome()
    AssetsData()
    PassiveExpensesData()

    getEarnedIncome()
    getEarnedLiabilities()
    getEarnedExpenses()
  }, [])





  const [passiveIncomeBoolean, setpassiveIncomeBoolean]: any = useState(false)
  const [AssetsBoolean, setAssetsBoolean]: any = useState(false)
  const [passiveExpensesBoolean, setpassiveExpensesBoolean]: any = useState(false)


  const [earnedIncomeBoolean, setearnedIncomeBoolean]: any = useState(false)
  const [liabilitiesBoolean, setliabilitiesBoolean]: any = useState(false)
  const [earnedExpensesBoolean, setearnedExpensesBoolean]: any = useState(false)


  const subtmihandle = async (e: any) => {

    if (obj.value && obj.amount) {

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


      // earned income
      else if (e == 'earnedIncome') {
        const resp: any = await HttpAxios.post('/api/EarnedIncome', obj)
        setearnedIncomeBoolean(false)
        console.log(resp);

        if (resp.data) {
          location.reload()
        }
        setObj({})
      }

      else if (e == 'liabilities') {
        console.log(obj);
        const resp = await HttpAxios.post('/api/EarnedLiabilities', obj)
        setliabilitiesBoolean(false)
        if (resp.data) {
          location.reload()
        }
        setObj({})
        console.log(resp);
      }
      else if (e == 'earnedExpenses') {
        console.log(obj);
        setearnedExpensesBoolean(false)
        const resp = await HttpAxios.post('/api/EarnedExpenses', obj)
        console.log(resp);
        if (resp.data) {
          location.reload()
        }
        setObj({})
      }

    } else { toast.warning('Fill value & Amount to submit') }


  }// submit Handle



  const moveDownHandle = async (e: any) => {
    const { val, id } = e;


    if (val == 'earnedIncome') {
      console.log(val, id, earnedIncomeData)
      if(earnedIncomeData[id+1]) {

        const updatedEarnedIncomeData: any = [...earnedIncomeData]; // Create a copy of the array
        const temp = updatedEarnedIncomeData[id];
        updatedEarnedIncomeData[id] = updatedEarnedIncomeData[id + 1];
        updatedEarnedIncomeData[id + 1] = temp;
        // console.log(updatedEarnedIncomeData);

        const url = 'api/EarnedIncome';
        const config = {
          data: updatedEarnedIncomeData, // Include your data here
        };
        const resp = await HttpAxios.delete(url, config);
        console.log(resp);

        if (resp.data) {
          location.reload()
        }

      }
    }


    
  else if (val == 'liabilities') {
    console.log(  val, id  )
    if (liabilitiesData[id+1]) {
const updatedliabilitiesData = [...liabilitiesData]; // Create a copy of the array
const temp = updatedliabilitiesData[id];
updatedliabilitiesData[id] = updatedliabilitiesData[id + 1];
updatedliabilitiesData[id + 1] = temp;
// console.log(updatedliabilitiesData);

const url = 'api/EarnedLiabilities';
const config = {
  data: updatedliabilitiesData, // Include your data here
};
const resp = await HttpAxios.delete(url, config);
console.log(resp);

if (resp.data) {
  location.reload()
}
  // const resp=await  updateEarnedIncome({id,updatedliabilitiesData});
// console.log(resp);
    }
  }


  else if (val == 'earnedExpenses') {
    console.log(  val, id  )
    if (EarnedExpensesData[id+1]) {
const updatedEarnedExpensesData = [...EarnedExpensesData]; // Create a copy of the array
const temp = updatedEarnedExpensesData[id];
updatedEarnedExpensesData[id] = updatedEarnedExpensesData[id + 1];
updatedEarnedExpensesData[id + 1] = temp;
// console.log(updatedEarnedExpensesData);

const url = 'api/EarnedExpenses';
const config = {
  data: updatedEarnedExpensesData, // Include your data here
};
const resp = await HttpAxios.delete(url, config);
console.log(resp);
if (resp.data) {
  location.reload()
}
}
  } // else if

  else if (val == 'passiveIncome') {
    console.log(  val, id  )
    if (getPassiveIncomesData[id+1]) {
const updatedgetPassiveIncomesData = [...getPassiveIncomesData]; // Create a copy of the array
const temp = updatedgetPassiveIncomesData[id];
updatedgetPassiveIncomesData[id] = updatedgetPassiveIncomesData[id + 1];
updatedgetPassiveIncomesData[id + 1] = temp;
// console.log(updatedgetPassiveIncomesData);

const url = 'api/PassiveIncome';
const config = {
  data: updatedgetPassiveIncomesData, // Include your data here
};
const resp = await HttpAxios.delete(url, config);
console.log(resp);
console.log(resp);
if (resp.data) {
  location.reload()
}
}
  } // ELSE if


  
  else if (val == 'Assets') {
    console.log(  val, id  )
    if (getAssetsData[id+1]) {
const updatedgetAssetsData = [...getAssetsData]; // Create a copy of the array
const temp = updatedgetAssetsData[id];
updatedgetAssetsData[id] = updatedgetAssetsData[id + 1];
updatedgetAssetsData[id + 1] = temp;
// console.log(updatedgetAssetsData);

const url = 'api/PassiveAssets';
const config = {
  data: updatedgetAssetsData, // Include your data here
};
const resp = await HttpAxios.delete(url, config);
console.log(resp);

if (resp.data) {
  location.reload()
}

}
  } // if




  else if (val == 'passiveExpenses') {
    console.log(  val, id  )
    if (getPassiveExpensesData[id+1]) {
const updatedgetPassiveExpensesData = [...getPassiveExpensesData]; // Create a copy of the array
const temp = updatedgetPassiveExpensesData[id];
updatedgetPassiveExpensesData[id] = updatedgetPassiveExpensesData[id + 1];
updatedgetPassiveExpensesData[id + 1] = temp;
// console.log(updatedgetPassiveExpensesData);

const url = 'api/PassiveExpenses';
const config = {
  data: updatedgetPassiveExpensesData, // Include your data here
};
const resp = await HttpAxios.delete(url, config);
console.log(resp);

if (resp.data) {
  location.reload()
}
    
}
  } // if else


  }// moveDownHandle


  const moveUpHandle = async (e: any) => {
    const { val, id } = e;


    if (val == 'earnedIncome') {
      console.log(val, id, earnedIncomeData)
      if (id > 0) {
        const updatedEarnedIncomeData: any = [...earnedIncomeData]; // Create a copy of the array
        const temp = updatedEarnedIncomeData[id];
        updatedEarnedIncomeData[id] = updatedEarnedIncomeData[id - 1];
        updatedEarnedIncomeData[id - 1] = temp;
        // console.log(updatedEarnedIncomeData);

        const url = 'api/EarnedIncome';
        const config = {
          data: updatedEarnedIncomeData, // Include your data here
        };
        const resp = await HttpAxios.delete(url, config);
        console.log(resp);

        if (resp.data) {
          location.reload()
        }

      }
    }


    
  else if (val == 'liabilities') {
    console.log(  val, id  )
    if (id > 0) {
const updatedliabilitiesData = [...liabilitiesData]; // Create a copy of the array
const temp = updatedliabilitiesData[id];
updatedliabilitiesData[id] = updatedliabilitiesData[id - 1];
updatedliabilitiesData[id - 1] = temp;
// console.log(updatedliabilitiesData);

const url = 'api/EarnedLiabilities';
const config = {
  data: updatedliabilitiesData, // Include your data here
};
const resp = await HttpAxios.delete(url, config);
console.log(resp);

if (resp.data) {
  location.reload()
}
  // const resp=await  updateEarnedIncome({id,updatedliabilitiesData});
// console.log(resp);
    }
  }


  else if (val == 'earnedExpenses') {
    console.log(  val, id  )
    if (id > 0) {
const updatedEarnedExpensesData = [...EarnedExpensesData]; // Create a copy of the array
const temp = updatedEarnedExpensesData[id];
updatedEarnedExpensesData[id] = updatedEarnedExpensesData[id - 1];
updatedEarnedExpensesData[id - 1] = temp;
// console.log(updatedEarnedExpensesData);

const url = 'api/EarnedExpenses';
const config = {
  data: updatedEarnedExpensesData, // Include your data here
};
const resp = await HttpAxios.delete(url, config);
console.log(resp);
if (resp.data) {
  location.reload()
}
}
  } // else if

  else if (val == 'passiveIncome') {
    console.log(  val, id  )
    if (id > 0) {
const updatedgetPassiveIncomesData = [...getPassiveIncomesData]; // Create a copy of the array
const temp = updatedgetPassiveIncomesData[id];
updatedgetPassiveIncomesData[id] = updatedgetPassiveIncomesData[id - 1];
updatedgetPassiveIncomesData[id - 1] = temp;
// console.log(updatedgetPassiveIncomesData);

const url = 'api/PassiveIncome';
const config = {
  data: updatedgetPassiveIncomesData, // Include your data here
};
const resp = await HttpAxios.delete(url, config);
console.log(resp);
console.log(resp);
if (resp.data) {
  location.reload()
}
}
  } // ELSE if


  
  else if (val == 'Assets') {
    console.log(  val, id  )
    if (id > 0) {
const updatedgetAssetsData = [...getAssetsData]; // Create a copy of the array
const temp = updatedgetAssetsData[id];
updatedgetAssetsData[id] = updatedgetAssetsData[id - 1];
updatedgetAssetsData[id - 1] = temp;
// console.log(updatedgetAssetsData);

const url = 'api/PassiveAssets';
const config = {
  data: updatedgetAssetsData, // Include your data here
};
const resp = await HttpAxios.delete(url, config);
console.log(resp);

if (resp.data) {
  location.reload()
}

}
  } // if




  else if (val == 'passiveExpenses') {
    console.log(  val, id  )
    if (id > 0) {
const updatedgetPassiveExpensesData = [...getPassiveExpensesData]; // Create a copy of the array
const temp = updatedgetPassiveExpensesData[id];
updatedgetPassiveExpensesData[id] = updatedgetPassiveExpensesData[id - 1];
updatedgetPassiveExpensesData[id - 1] = temp;
// console.log(updatedgetPassiveExpensesData);

const url = 'api/PassiveExpenses';
const config = {
  data: updatedgetPassiveExpensesData, // Include your data here
};
const resp = await HttpAxios.delete(url, config);
console.log(resp);

if (resp.data) {
  location.reload()
}
    
}
  } // if else




  } // moveUpHandle



  const deleteHandel = async (e: any) => {
    const { val, id } = e;

    if (val == 'earnedIncome') {
      console.log(val, id);


      const resp = await HttpAxios.put('/api/EarnedIncome', e)
      console.log(resp && resp);
      if (resp.data) {
        location.reload()
      }
    }

    else if (val == 'liabilities') {

      console.log(val, id);
      const resp = await HttpAxios.put('/api/EarnedLiabilities', e)
      console.log(resp && resp);
      if (resp.data) {
        location.reload()
      }
    }

    else if (val == 'earnedExpenses') {

      console.log(val, id);
      const resp = await HttpAxios.put('/api/EarnedExpenses', e)
      console.log(resp && resp);
      if (resp.data) {
        location.reload()
      }
    }
    else if (val == 'passiveIncome') {
      console.log(val, id);

      const resp = await HttpAxios.put('/api/PassiveIncome', e)
      console.log(resp && resp);
      if (resp.data) {
        location.reload()
      }

    }
    else if (val == 'Assets') {
      console.log(val, id);

      const resp = await HttpAxios.put('/api/PassiveAssets', e)

      console.log(resp && resp);
      if (resp.data) {
        location.reload()
      }

    }
    else if (val == 'passiveExpenses') {
      console.log(val, id);

      const resp = await HttpAxios.put('/api/PassiveExpenses', e)
      console.log(resp && resp);
      if (resp.data) {
        location.reload()
      }

    }

  };// deleteHandel




  return (
    <>
      <div className='my-4 '>
        <Profile />

        <p className='text-[#b7d837] font-bold tracking-[4px]  lg:text-3xl md:text-3xl sm:text-3xl text-2xl text-center'>CashFlow Statemnt</p>
        <p className='text-[#b7d837] font-bold tracking-[0px] m-4 lg:text-md md:text-md sm:text-md text-sm text-center'>Increase Passive Income,

          Equal to Earned Income,
          You will get out of Rat Race</p>

        <div className='relative bp bg-[rgb(245,245,220)] p-5 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3 h-[86vh]  overflow-y-scroll '>



          {/* Earned income Column */}
          <section className='  flex flex-col gap-2 lg:mb-0 md:mb-0 sm:mb-0 mb-14'>
            <div className='my-1 border-b-2 border-[#40183e] h-[150px] overflow-y-scroll '>

              <p onClick={() => { setearnedIncomeBoolean(true) }} className='cursor-pointer flex justify-between items-center py-1 px-3 text-[#b7d837] rounded-b-sm text-lg font-bold tracking-[3px] bg-[#40183e] aa'> Earned Income  <MdAddCircle className='text-xl ss' />   </p>

              <ul className='  tracking-[2px] px-4'>
                <li className='flex justify-between gap-4 my-1  border-black border-b border-dashed  '>  <p></p>   <p>Cash Flow</p> </li>

                {earnedIncomeData && earnedIncomeData.map((item: any, idx: any) => {
                  return (
                    <li key={idx} className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >
                      <p>{item.value}:</p>
                      <FaArrowCircleDown onClick={() => moveDownHandle({ val: 'earnedIncome', id: idx })} className=' cursor-pointer group-hover:flex hidden' />
                      <AiFillDelete onClick={() => deleteHandel({ val: 'earnedIncome', id: item._id })} className=' cursor-pointer group-hover:flex hidden' />
                      <FaArrowCircleUp onClick={() => moveUpHandle({ val: 'earnedIncome', id: idx })} className=' cursor-pointer group-hover:flex hidden' />
                      <p>£{item.amount.toLocaleString()}</p>
                    </li>
                  )
                })}


                {earnedIncomeBoolean &&
                  <li className='flex justify-between items-center  my-1 border-b border-black  border-dashed font-bold '>
                    <input onChange={onChanging} className=' w-[45%] outline-none  border-dashed border border-b-0 border-black  bg-transparent ps-1' placeholder='Type...' type="text" name='value' />
                    <input onChange={onChanging} name='amount' className=' w-[45%] outline-none  border-dashed border border-b-0 border-black  bg-transparent ps-1' placeholder='£777' type="number" />
                    <MdAddCircle onClick={() => subtmihandle('earnedIncome')} className='  text-2xl cursor-pointer text-[#b7d837] ' />
                  </li>}

              </ul>

            </div>


            {/* Liabilities Column */}
            <div className='my-1 border-b-2 border-[#40183e] h-[180px] overflow-y-scroll '>
              <p onClick={() => { setliabilitiesBoolean(true) }} className='cursor-pointer flex justify-between items-center py-1 px-3 text-[#b7d837] rounded-b-sm text-lg font-bold tracking-[3px] bg-[#40183e] aa'> Liabilities  <MdAddCircle className='text-xl ss' />   </p>
              <ul className='  tracking-[2px] px-4 '>

                {liabilitiesData && liabilitiesData.map((item: any, idx: any) => {
                  return (
                    <li key={idx} className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >
                      <p>{item.value}:</p>
                      <FaArrowCircleDown onClick={() => moveDownHandle({ val: 'liabilities', id: idx })} className=' cursor-pointer group-hover:flex hidden' />
                      <AiFillDelete onClick={() => deleteHandel({ val: 'liabilities', id: item._id })} className=' cursor-pointer group-hover:flex hehe hidden' />
                      <FaArrowCircleUp onClick={() => moveUpHandle({ val: 'liabilities', id: idx })} className=' cursor-pointer group-hover:flex hidden' />
                      <p>£{item.amount.toLocaleString()}</p>
                    </li>
                  )
                })}


                {liabilitiesBoolean &&
                  <li className='flex justify-between items-center  my-1 border-b border-black  border-dashed font-bold '>
                    <input onChange={onChanging} className=' w-[45%] outline-none  border-dashed border border-b-0 border-black  bg-transparent ps-1' placeholder='Type...' type="text" name='value' />
                    <input onChange={onChanging} name='amount' className=' w-[45%] outline-none  border-dashed border border-b-0 border-black  bg-transparent ps-1' placeholder='£777' type="number" />
                    <MdAddCircle onClick={() => subtmihandle('liabilities')} className='  text-2xl cursor-pointer text-[#b7d837] ' />
                  </li>}




              </ul>
            </div>


            {/* earned expenses Column */}
            <div className='my-1 border-b-2 border-[#40183e] h-[180px] overflow-y-scroll '>
              <p onClick={() => { setearnedExpensesBoolean(true) }} className='cursor-pointer flex justify-between items-center py-1 px-3 text-[#b7d837] rounded-b-sm text-lg font-bold tracking-[3px] bg-[#40183e] aa'> Earned Expenses  <MdAddCircle className='text-xl ss' />   </p>
              <ul className='  tracking-[2px] px-4  '>

                {EarnedExpensesData && EarnedExpensesData.map((item: any, idx: any) => {
                  return (
                    <li key={idx} className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >
                      <p>{item.value}:</p>
                      <FaArrowCircleDown onClick={() => moveDownHandle({ val: 'earnedExpenses', id: idx })} className=' cursor-pointer group-hover:flex hidden' />
                      <AiFillDelete onClick={() => deleteHandel({ val: 'earnedExpenses', id: item._id })} className=' cursor-pointer group-hover:flex hehe hidden' />
                      <FaArrowCircleUp onClick={() => moveUpHandle({ val: 'earnedExpenses', id: idx })} className=' cursor-pointer group-hover:flex hidden' />
                      <p>£{item.amount.toLocaleString()}</p>
                    </li>
                  )
                })}


                {earnedExpensesBoolean &&
                  <li className='flex justify-between items-center  my-1 border-b border-black  border-dashed font-bold '>
                    <input onChange={onChanging} className=' w-[45%] outline-none  border-dashed border border-b-0 border-black  bg-transparent ps-1' placeholder='Type...' type="text" name='value' />
                    <input onChange={onChanging} name='amount' className=' w-[45%] outline-none  border-dashed border border-b-0 border-black  bg-transparent ps-1' placeholder='£777' type="number" />
                    <MdAddCircle onClick={() => subtmihandle('earnedExpenses')} className='  text-2xl cursor-pointer text-[#b7d837] ' />
                  </li>}


              </ul>
            </div>



            {/*total earned expenses Column */}
            <div className='my-1 border-b-2 border-[#40183e] h-[180px] overflow-y-scroll  '>
              <p className='cursor-pointer flex justify-between items-center py-1 px-3 text-[#b7d837] rounded-b-sm text-lg font-bold tracking-[3px] bg-[#40183e] aa'>  Increase Passive Income       </p>
              <ul className='  tracking-[2px] px-4'>

                <li className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >  <p>Total Earned Income:</p>   <p>£{TEI && TEI.toLocaleString()}</p> </li>
                <li className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >  <p>Total Earned Expenses:</p>   <p>£{TEE && TEE.toLocaleString()}</p> </li>
                <li className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >  <p>Total Earned Savings:</p>   <p>£{(TEI - TEE).toLocaleString()}</p> </li>
                <li className='flex justify-between gap-4 mt-6 border-b border-black  border-dashed font-bold group  '  >  <p>Total Liabilities:</p>   <p>£{TELiab && TELiab.toLocaleString()}</p> </li>

              </ul>
            </div>

          </section>
          {/* Earned income Column */}





          {/* Passive income Column */}
          <section className=' flex flex-col gap-2 '>

            <div className='my-1 border-b-2 border-[rgb(64,24,62)] h-[150px] overflow-y-scroll '>
              <p onClick={() => { setpassiveIncomeBoolean(true) }} className='cursor-pointer flex justify-between items-center py-1 px-3 text-[#b7d837] rounded-b-sm text-lg font-bold tracking-[3px] bg-[#40183e] aa'>   Passive Income    <MdAddCircle className='text-xl ss' />   </p>
              <ul className='  tracking-[2px] px-4'>
                <li className='flex justify-between gap-4 my-1  border-black border-b border-dashed  '>  <p></p>   <p>Cash Flow</p> </li>

                {getPassiveIncomesData && getPassiveIncomesData.map((item: any, idx: any) => {
                  return (
                    <li key={idx} className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >
                      <p>{item.value}:</p>
                      <FaArrowCircleDown onClick={() => moveDownHandle({ val: 'passiveIncome', id: idx })} className=' cursor-pointer group-hover:flex hidden' />
                      <AiFillDelete onClick={() => deleteHandel({ val: 'passiveIncome', id: item._id })} className=' cursor-pointer group-hover:flex hehe hidden' />
                      <FaArrowCircleUp onClick={() => moveUpHandle({ val: 'passiveIncome', id: idx })} className=' cursor-pointer group-hover:flex hidden' />
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
                      <FaArrowCircleDown onClick={() => moveDownHandle({ val: 'Assets', id: idx })} className=' cursor-pointer group-hover:flex hidden' />
                      <AiFillDelete onClick={() => deleteHandel({ val: 'Assets', id: item._id })} className=' cursor-pointer group-hover:flex hehe hidden' />
                      <FaArrowCircleUp onClick={() => moveUpHandle({ val: 'Assets', id: idx })} className=' cursor-pointer group-hover:flex hidden' />
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
                      <FaArrowCircleDown onClick={() => moveDownHandle({ val: 'passiveExpenses', id: idx })} className=' cursor-pointer group-hover:flex hidden' />
                      <AiFillDelete onClick={() => deleteHandel({ val: 'passiveExpenses', id: item._id })} className=' cursor-pointer group-hover:flex hehe hidden' />
                      <FaArrowCircleUp onClick={() => moveUpHandle({ val: 'passiveExpenses', id: idx })} className=' cursor-pointer group-hover:flex hidden' />
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
              <p className='cursor-pointer flex justify-between items-center py-1 px-3 text-[#b7d837] rounded-b-sm text-lg font-bold tracking-[3px] bg-[#40183e] aa'>   To get out of Rat Race      </p>

              <ul className='tracking-[2px] px-4'>

                <li className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >  <p>Total Passive Income:</p>   <p>£{TPI && TPI.toLocaleString()}</p> </li>
                <li className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >  <p>Total Passive Expenses:</p>   <p>£{TPE && TPE.toLocaleString()}</p> </li>
                <li className='flex justify-between items-center gap-4 my-1 border-b border-black  border-dashed font-bold group  '  >  <p>Total Passive Savings:</p>   <p>£{(TPI - TPE).toLocaleString()}</p> </li>
                <li className='flex justify-between gap-4 mt-6 border-b border-black  border-dashed font-bold group  '  >  <p>Total Assets:</p>   <p>£{TPAs && TPAs.toLocaleString()}</p> </li>

              </ul>
            </div>


          </section>
          {/* Passive income Column */}





        </div>


      </div>


    </>

  )
}

export default HomeScreen