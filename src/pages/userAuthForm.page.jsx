import React, { useContext, useRef } from 'react'
import InputBox from '../components/input.component';
import googleIcon from "../imgs/google.png"
import { Link, Navigate } from 'react-router-dom';
import AnimationWrapper from '../common/page-animation';
import { Toaster,toast } from 'react-hot-toast'
import axios from 'axios';
import { storeInsession } from '../common/session';
import { usercontext } from '../App';
import { authWithGoogle } from '../common/firebase';

// ##jab bhi usestate me kuch set hoga wo reload nhi karega jhut mutka balki jaha jaha uska effect hogausko change karega and jab lagega componnt ko rerender karna hoga karega magar jab hum khud se karemge reload tab w hoga and phir useeffect chalega 



const UserAuthForm = ({type}) => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
    
let {userauth:{access_token},setuserauth} = useContext(usercontext)

const userAuththroughserver = (serverRoute,formData)=>{
axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute,
    formData)
    .then(({data})=>{
        storeInsession("user",JSON.stringify(data))
      
       setuserauth(data)
    })
    .catch(({response})=>{
        toast.error(response.data.error)
    })

}


    const handlesubmit=(e) =>{
        e.preventDefault();
        let serverRoute = type == "sign-in"? "/signin" : "/signup";
//form data
let form = new FormData(formelement);

let formData = {};
for(let [key,value] of form.entries()){
    formData[key] = value;
}
//form validation
let {fullname,email,password} = formData;
if(fullname){
if(fullname.length<3){
    return toast.error( "fullname must be atleast 3 letters long")

   }}
if(!email.length){
    return toast.error("enter email")
    // here not used response 

    }
    
    if(!emailRegex.test(email)){
     
        return toast.error( "email is invalid")
    }
    if(!passwordRegex.test(password)){
    return toast.error( "password should be 6 to 20 characters long with a numeric,1 lowercase and uppercase letters")
    }
    
    userAuththroughserver(serverRoute,formData);
    }

const handleGoogleAuth = (e) =>{
    e.preventDefault();
    authWithGoogle().then(user =>{
        let serverRoute = "/google-auth"
        let formdata ={
            access_token : user.accessToken
            

        }
        userAuththroughserver(serverRoute,formdata)
    }).catch(err=>{
        toast.error('trouble with login through google');
        return console.log(err)
    })
}

  return (

    
access_token ?
<Navigate to="/" />
:
    <AnimationWrapper keyvalue={type}>

    <section className="h-cover flex items-center justify-center">
        <Toaster />
<form id='formelement' className='w-[80%] max-w-[400px]'>
    <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>

        {type == "sign-in" ? "welcome back" : "join us today"}
    </h1>

{
    type != "sign-in" ?
    <InputBox 
    name="fullname"
    type="text"
    placeholder="fullname"  
    icon ="fi-rr-user"
    />
  : ""
}
<InputBox 
    name="email"
    type="email"
    placeholder="email"  
    icon ="fi-rr-envelope"
    />
<InputBox 
    name="password"
    type="password"
    placeholder="password"  
    icon ="fi-rr-key"
    />

<button
className='btn-dark center mt-14'
type='submit'
onClick={handlesubmit}
>
{type.replace("-"," ")}
</button>

<div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
    <hr className='w-1/2 border-black'/>
<p>or</p>
    <hr className='w-1/2 border-black'/>
    </div>
<button className='btn-dark flex items-center justify-center gap-4 w-[90%] center'
onClick={handleGoogleAuth}
>
    <img src={googleIcon} alt="" className='w-5'/>
    continue with google
</button>

{
    type == "sign-in" ? 
<p className='mt-6 text-dark-grey text-xl text-center '>
    dont have an account ? 
    <Link to="/signup" className="underline text-black text-xl ml-1">
    join us today
    </Link>
</p>
:
<p className='mt-6 text-dark-grey text-xl text-center '>
    Already a member ? 
    <Link to="/signin" className="underline text-black text-xl ml-1">
    sign in here.
    </Link>
</p>
}


</form>

    </section>
    </AnimationWrapper>
  )
}

export default UserAuthForm;