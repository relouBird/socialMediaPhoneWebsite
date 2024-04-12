import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { database } from "./firebaseInit"
import type { userDataProps } from "$lib/types/userType"

// initialisation des differents chemins
let post_collection = "posts"
let users_collection = "users"

export const getAllUsers = async () =>{
    let allUsers : userDataProps[]= [];
    const docSnap = await getDocs(collection(database, users_collection))
    if(docSnap){
        docSnap.forEach((doc)=>{
            allUsers.push(doc.data() as userDataProps)
        })
        console.log(allUsers)
        return allUsers;
    } else {
        console.log("no such document")
    }
    return []
}