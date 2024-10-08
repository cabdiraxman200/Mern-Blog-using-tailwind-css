import React, { useState } from 'react';
import {Link ,useNavigate} from 'react-router-dom';
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import { data } from 'autoprefixer';
import { useDispatch ,useSelector} from 'react-redux';
import { signInStart,signInSucess,signInFailure } from '../redux/user/userSlice';


const SignIn = () => {
  const [FormData,setFormData]= useState({});
  // const [errorMessage,setErrorMessage]=useState(null)
  // const [loading,setLoading]=useState(false);
  // -> kan ku badal
  const {loading,error:errorMessage} =useSelector(state=>state.user);
  const dispatch= useDispatch();
  
  const navigate=useNavigate();
  const handleChange =(e)=>{
    setFormData({...FormData,[e.target.id]:e.target.value.trim()});
  }
  const handleSubmit=   async (e)=>{
    e.preventDefault();
    if(!FormData.email || !FormData.password){
      // return setErrorMessage("pleas fill out all fields");
         // change-> below
     return dispatch(signInFailure("pleas fill out all fields"));


    }
    try{
      // setLoading(true);
      // setErrorMessage(null);
          //chang to distch
          dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(FormData)
      })
      const data= await res.json();
      if(data.success===false){
        // return setErrorMessage(data.message);``
        // change-> below
        dispatch(signInFailure(data.errorMessage));
      }
      if(res.ok){
        dispatch(signInSucess(data));
        navigate('/')
      }
      setLoading(false);
      
    }
    catch(error){
      // return setErrorMessage(error.message);
         // ku badal dispatch
         dispatch(signInFailure(error.errorMessage));
    }
    setLoading(false);
  }
  return (
    <div className='min-h-screen mt-20'>
    <div className="flex  p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-2">
      {/* left side */}
      <div className='flex-1'>
      <Link to='/' className=' font-bold  dark:text-white text-4xl'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
      rounded-lg text-white'> 
        Abdirahman's
      </span>
        Blog
      </Link>
      <p className='text-sm mt-5 '>this demo project  you can Signin  with your email and password or with google</p>
      </div > 
      {/* right side */}
      <div className='flex-1  p-5 bg-slate-100'>
        {
          errorMessage &&(
            <Alert color='failure'>
              {errorMessage}
            </Alert>
          )
        }
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value ="Your email"/>
            <TextInput
            type='text'
            placeholder='enter your email'
            id='email'
            onChange={handleChange}
            />
          </div>
          <div>
            <Label value ="Your password"/>
            <TextInput
            type='password'
            placeholder='*******'
            id='password'
            onChange={handleChange}
            />
          </div>
          <Button gradientDuoTone="purpleToPink" type='submit' disabled={loading}>
             {
              loading ?(
                <>
                   <Spinner size='sm'/>
                   <span className='pl-3'>loading...</span>
                
                </>
             
              ):'Sign in'
             }
          
            </Button>
        </form>
        <div className='flex  gap-2 text-sm mt-5'>
          <span>Don't Have an account ?</span>
          <Link to='/sign-up' className='text-blue-500'>
          Sign up
          
          </Link>


        </div>

      </div>



    </div>
    
    </div>
  )
}

export default SignIn 