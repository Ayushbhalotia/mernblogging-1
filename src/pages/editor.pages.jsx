import { useContext, useState } from "react";
import { usercontext } from "../App";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import Publishform from "../components/publish-form.component";
import { createContext } from "react";

 const blogStructure = {
    title: '',
    banner: '',
    content: [],
    tags: [],
    des: '',
    author: {personal_info:{}}
 }

 export const EditorContext = createContext({ });


const Editor = () =>{

const [blog , setBlog] = useState(blogStructure);
const[editorState,setEditorState] = useState("editor");
const[textEditor,settextEditor] = useState({isReady:false});

let {userauth : {access_token}} = useContext(usercontext)


    return (
 <EditorContext.Provider value={{blog,setBlog,editorState,setEditorState,textEditor,settextEditor}}>
{access_token === null ? <Navigate to="/signin" />
        : editorState== "editor" ? <BlogEditor /> : <Publishform />
}
</EditorContext.Provider>
      
    )
}

export default Editor;