import { createContext, useContext, useState } from "react";


const PostContext = createContext();
export const PostProvider = ({children}) =>{
    const [category, setCategory] = useState(1);
    const [postId, setPostId] = useState(0);

    return (
        <PostContext.Provider
            value={{category, postId, setCategory, setPostId}}>
            {children}
        </PostContext.Provider>
    )
}

export const usePost = () => useContext(PostContext);