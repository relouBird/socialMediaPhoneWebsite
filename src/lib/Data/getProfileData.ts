import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "./firebaseInit";
import type { userDataForPostProps, userDataProps } from "$lib/types/userType";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import type { postCreationDataProps } from "$lib/types/postType";

// creation des noms de collection
let posts_collection = "posts";
let users_collection = "users";

// fonction qui permet de recuperer les données
export const profileDataFetch: (uid: string) => Promise<userDataProps> = async (
  uid
) => {
  let profileData: userDataProps = {
    id: uid,
    username: "",
    work: "",
    bio: "",
    faceUrl: "",
    coverUrl: "",
    Email: "",
    Password: "",
    SignupUpdate: "",
  };
  try {
    const docRef = doc(database, users_collection, `${profileData.id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      profileData = docSnap.data() as userDataProps;
      console.log("Document data:", profileData);
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log("Error getting document:", error);
  }
  return profileData;
};

// permet de recuperer uniquement le nom de l'utilisateur connecté et sa photo de profil
export const getDataUserForPost = async (uid: string) => {
  let profileData: userDataForPostProps = {
    username: "",
    faceUrl: "",
  };
  try {
    const docRef = doc(database, users_collection, `${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      profileData = {
        username: docSnap.data().username,
        faceUrl: docSnap.data().faceUrl,
      };
      console.log("Document data:", profileData);
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log("Error getting document:", error);
  }
  return profileData;
};

// permet de recuperer un post par son id
export const SearchPostByIdLike = async (id: string) => {
  let datas: postCreationDataProps[] = [];
  const queryData = query(
    collection(database, posts_collection),
    where("id", "==", id)
  );

  // Récupérer les données une fois avec getDocs
  const querySnapshot = await getDocs(queryData);

  // Parcourir les documents et ajouter les données au tableau datas
  querySnapshot.forEach((doc) => {
    datas.push(doc.data() as postCreationDataProps);
  });
  console.log(datas);
  return datas[0];
};

// permet de modifier et d'ajuster les likes
export const useLike: (dataPost:postCreationDataProps) => Promise<[boolean,boolean,string[],string[]]> = async (dataPost) => {
  let datas: postCreationDataProps = { ...dataPost };
  const index = datas.like.indexOf(datas.uid);
  const indexDislike = datas.dislike.indexOf(datas.uid);

  const docs = doc(database, posts_collection, `${datas.id}`);

  if (index !== -1) {
    datas.like.splice(index, 1);
    await updateDoc(docs, {
      like: datas.like,
    });
    return [false,false,datas.like,datas.dislike]
  } else {
    if (indexDislike !== -1) {
      datas.dislike.splice(indexDislike, 1);
      datas.like.push(datas.uid);
      await updateDoc(docs, {
        like: datas.like,
        dislike: datas.dislike,
      });
      return [true,false,datas.like,datas.dislike]
    } else {
      datas.like.push(datas.uid);
      await updateDoc(docs, {
        like: datas.like,
      });
      return [true,false,datas.like,datas.dislike]
    }
  }
  return [false,false,datas.like,datas.dislike]
};


// permet de modifier et d'ajuster les unlikes
export const useDislike: (dataPost:postCreationDataProps) => Promise<[boolean,boolean,string[],string[]]> = async (dataPost) => {
    let datas: postCreationDataProps = { ...dataPost };
    const index = datas.like.indexOf(datas.uid);
    const indexDislike = datas.dislike.indexOf(datas.uid);
  
    const docs = doc(database, posts_collection, `${datas.id}`);
  
    if (indexDislike !== -1) {
      datas.dislike.splice(indexDislike, 1);
      await updateDoc(docs, {
        dislike: datas.dislike,
      });
      return [false,false,datas.like,datas.dislike]
    } else {
      if (index !== -1) {
        datas.like.splice(index, 1);
        datas.dislike.push(datas.uid);
        await updateDoc(docs, {
          like: datas.like,
          dislike: datas.dislike,
        });
        return [false,true,datas.like,datas.dislike]
      } else {
        datas.dislike.push(datas.uid);
        await updateDoc(docs, {
          dislike: datas.dislike,
        });
        return [false,true,datas.like,datas.dislike]
      }
    }
    return [false,false,datas.like,datas.dislike]
  };