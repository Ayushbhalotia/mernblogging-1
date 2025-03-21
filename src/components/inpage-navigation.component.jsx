import { useEffect, useRef, useState } from "react";

const InPageNavigation = ({routes,defaultHidden=[],defaultActiveIndex=0,children}) =>{

let activeTagLineRef = useRef();
let activeTabRef = useRef();
let [inPageNavIndex,setinPageNavIndex] = useState(defaultActiveIndex);

const changePageState = (btn,i) => {
 

let { offsetWidth,offsetLeft} = btn;

activeTagLineRef.current.style.width = offsetWidth + "px";
activeTagLineRef.current.style.left = offsetLeft + "px";

setinPageNavIndex(i);

}                          

useEffect(()=>{
    changePageState(activeTabRef.current,defaultActiveIndex)
},[])


return(
        <>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">

{
    routes.map((route,i) =>{
        return (
            <button
            ref={i== defaultActiveIndex ? activeTabRef : null}
            key={i} className={"p-4 px-5 capitalize " + (inPageNavIndex ==i ? "text-black" : "text-dark-grey ") + (defaultHidden.includes(route) ? " md:hidden " : " ")}
            onClick={(e)=>{changePageState(e.target,i)}}
            >
               { route}
            </button>
 

        )
    })
}

<hr ref={activeTagLineRef} className="absolute bottom-0 duration-300"/>

      </div>
            

{Array.isArray(children) ? children[inPageNavIndex] : children}



            </>
        
    )
}

export default InPageNavigation;