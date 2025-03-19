import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png"
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png"
import toast from "react-hot-toast";
import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs"
import App, { usercontext } from "../App";
import { tools } from "./tools.component";

const BlogEditor = () =>{

let blogbannerref = useRef();
let {blog,blog:{title,banner,content,tags,des},setBlog,textEditor,settextEditor,setEditorState} = useContext(EditorContext)

let {userauth : {access_token}} = useContext(usercontext)

let navigate = useNavigate();

//useeffect
useEffect(()=>{
if(!textEditor.isReady){

    settextEditor( new EditorJS({
        holderId:"textEditor",
        // data:'',
        data:content,
        
        tools:tools,
    
        placeholder:"lets write an awesome story"
    }))
}

},[])

const handlebannerupload =async(e) =>{

    let img = e.target.files[0];
if(!img){
    return toast.error("not uploaded")
}
let loadingToast = toast.loading("uploading...")

const formdata = new FormData();
formdata.append("image",img);
    axios.post(import.meta.env.VITE_SERVER_DOMAIN +'/get-upload',formdata
   
    )
    .then(({data})=>{
        const imageurl = data.url;
        toast.dismiss(loadingToast);
        toast.success("uploaded....");
         setBlog({...blog,banner:imageurl})
    })
    .catch((err)=>{
        toast.dismiss(loadingToast)
        return toast.error(err)
    })
}

const handletitlekeydown = (e) =>{
  if(e.keyCode == 13){
    e.preventDefault();
   
}

}


const handleTitlechange = (e) =>{
    let input = e.target;
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + "px";

setBlog({...blog,title:input.value})

}


const handleerror = (e) =>{
    let img = e.target;
    // console(img);
    img.src = defaultBanner;

}

const handlePublishEvent = () =>{
if(!banner.length){
    //means no url here 
    return toast.error("upload a blog banner to publish it")
}
if(!title.length){
    return toast.error("write blog title to publish it")
}

if(textEditor.isReady){

textEditor.save().then(data=>{
      if(data.blocks.length){
        setBlog({...blog,content : data});
        
setEditorState("publish")
    }else{
        return toast.error("write something in your blog to publish it")
    }
})
.catch((err)=>{
    console.log(err);
})
}
}

const handleSaveDraft = (e) =>{

    if(e.target.className.includes("disable")){
        return;
           }
               if(!title.length){
               return toast.error("write blog title before before saving it as a draft")
           }
       
          
       // now we will send data to backend here 
       
       let loadingToast = toast.loading("saveing draft.....");
       
       e.target.classList.add('disable');

       if(textEditor.isReady){
        textEditor.save().then(content=>{
            let blogObj = {
                title,banner,des,content,tags,draft: true
             //    ab yaha draft true hoga 
            }
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog",blogObj,{
                headers :{
            
                    'Authorization' : `Bearer ${access_token}`
                }
            
                
            })
            
            .then(()=>{
                e.target.classList.remove("disable")
                toast.dismiss(loadingToast);
                toast.success("saved");
            
                setTimeout(()=>{
            navigate("/");
                },500);
                 
            })
            .catch(({response})=>{
                e.target.classList.remove("disable")
                toast.dismiss(loadingToast);
                
                return toast.error(response.data.error)
            })
            
            
        })
       }
     
       
}





    return(
        <>
         <nav className="navbar">
        <Link to="/" className="flex-none w-10">
        <img src ={logo} />
        </Link>
      <p className="max-md:hidden text-black line-clamp-1 w-full">{title.length ? title : "new blog"} </p>

<div className = "flex gap-4 ml-auto">
<button className="btn-dark py-2"
onClick={handlePublishEvent}
>
    Publish
</button>
<button className="btn-light py-2"
onClick={handleSaveDraft}
>
    Save Draft
</button>
</div>

    </nav>
<Toaster />
<AnimationWrapper>
<section>
<div className="mx-auto max-w-[900px] w-full">

<div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">

<label htmlFor="uploadbanner">
    <img 
    // ref={blogbannerref}
    src={banner}
    className="z-20"
    onError={handleerror}
    />
<input 
id="uploadbanner"
type="file"
accept=".png,.jpg,.jpeg"
hidden
onChange={handlebannerupload}

/>

</label>

</div>

<textarea 
defaultValue={title}

placeholder="Blog Title"
className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
onKeyDown={handletitlekeydown}
onChange={handleTitlechange}
>
</textarea>

<hr className="w-full opacity-10 my-5"/>

<div id="textEditor" className="font-gelasio"></div>





</div>
</section>
</AnimationWrapper>
</>
       
    )
}

export default BlogEditor;