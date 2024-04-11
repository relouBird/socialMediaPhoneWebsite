import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { database } from "./firebaseInit"
import type { postCreationDataProps } from "$lib/types/postType"

// initialisation des differents chemins
let post_collection = "posts"

export const getAllPost = async () =>{
    let allPost : postCreationDataProps[]= [];
    const docSnap = await getDocs(collection(database, post_collection))
    if(docSnap){
        docSnap.forEach((doc)=>{
            allPost.push(doc.data() as postCreationDataProps)
        })
        console.log(allPost)
        return allPost;
    } else {
        console.log("no such document")
    }
    return []
}