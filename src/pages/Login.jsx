import React, {useState} from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const {backendURL, token, setToken} = useContext(AppContextContext);
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const onSubmitHandler = async (event) =>{
    eventpreventDefault()
    try{
      if (state=== 'Sign up') {
        const {data} = await axios.post(backendURL + /api/users/register , {name, email, password});
        if(data.success){
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
       else {
        toast.error(data.message)
      }

    } else{
      toast.error(data.message)
    }
  }
  catch(error){

  }
  }
  return (
    <form>
    <div>
      <p>{state === 'Sign Up' ? "Create Account": "Login"} </p>
      <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>
      {state === "Sign Up" && <div>
        <p>Full Name</p>
        <input type="text" onChange={(e)=> setName(e.target.value)} value={name} required/>
         </div> }
         <div>
      
         <p>FeMail</p>
        <input type="email" onChange={(e)=> setName(e.target.value)} value={name} required/>
         </div><div>
         <p>Password</p>
        <input type="password" onChange={(e)=> setName(e.target.value)} value={name} required/>
         </div>
         <button>{state === 'Sign Up' ? "Create Account": "Login"}</button>
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