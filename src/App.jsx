import { createContext, useEffect, useState } from "react";
import  Navbar from "./components/navbar.component";
import { Routes,Route} from "react-router-dom";
import UserAuthForm from "./pages/userAuthForm.page";
import { lookinsession } from "./common/session";
import Editor from "./pages/editor.pages";
// as exported navbar as default so no {} 
import Homepage from "./pages/home.page";


export const usercontext = createContext({})

const App = () => {
const [userauth,setuserauth] = useState({})

useEffect(()=>{
let userinsession= lookinsession("user")
userinsession ? setuserauth(JSON.parse(userinsession)) : setuserauth({access_token:null})
},[])


    return (
      <usercontext.Provider value={{userauth,setuserauth}}>


<Routes>
 
<Route path="/editor" element={<Editor/>} />

<Route path="/" element={<Navbar />} >
<Route index element ={<Homepage />} />

<Route path="signin" element={<UserAuthForm type="sign-in"/>}/>
<Route path="signup" element={<UserAuthForm type="sign-up"/>}/>

</Route>

</Routes>
</usercontext.Provider>
  )
}

export default App;