import React, {useEffect, useState} from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {backendURL, token, setToken} = useContext(AppContextContext);
  const navigate = useNavigate()
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const onSubmitHandler = async (event) =>{
    eventpreventDefault()
    try{
      if (state=== 'Sign up') {
        const {data} = await axios.post(backendURL + '/api/users/register' , {name, email, password});
        if(data.success){
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
       else {
        toast.error(data.message)
      }

    } else{
      const {data} = await axios.post(backendURL + '/api/users/login' , {email, password});
        if(data.success){
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
       else {
        toast.error(data.message)
      }
    }
  }
  catch(error){
    toast.error(error.message)

  }
  }
  useEffect(()=>{
    if(token){
      navigate('/')

    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler}>
    <div>
      <p>{state === 'Sign Up' ? "Create Account": "Login"} </p>
      <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>
      {state === "Sign Up" && <div>
        <p>Full Name</p>
        <input type="text" onChange={(e)=> setName(e.target.value)} value={name} required/>
         </div> }
         <div>
      
         <p>FeMail</p>
        <input type="email" onChange={(e)=> setName(e.target.value)} value={email} required/>
         </div><div>
         <p>Password</p>
        <input type="password" onChange={(e)=> setName(e.target.value)} value={password} required/>
         </div>
         <button type='submit'>{state === 'Sign Up' ? "Create Account": "Login"}</button>
         {
          state === "Sign Up"
          ? <p >Already have an account? <span onClick={()=> setState('Login')}>Login here</span></p>
          : <p>Create an account<span onClick={() => setState('Sign up')}> New User</span></p>
         }

    </div>
    </form>
  )
}

export default Login