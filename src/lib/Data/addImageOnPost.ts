import { writable, type Writable } from "svelte/store";

export const defineNullDatasImage = () =>{
    imageURL.set(null);
    file_image.set(null);
}

export const imageURL: Writable<string | null> = writable(null);

export const file_image : Writable<File | null> = writable(null);



// export const  uploading =  (file : File) =>{

//     file_type.set(file.type);
    
//     const storageRef = ref(storage, `posts/${file.name.replace(/ /g,"_")}`);
    
//     const uploadTask =  uploadBytesResumable(storageRef, file);
    
//     // Register three observers:
//     // 1. 'state_changed' observer, called any time the state changes
//     // 2. Error observer, called on failure
//     // 3. Completion observer, called on successful completion
//     uploadTask.on('state_changed', 
//       (snapshot) => {
//         // Observe state change events such as progress, pause, and resume
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         progressEvolve.set(progress);
//         console.log('Upload is ' + progress + '% done');
        
//         // ceci permet de gerer l'etat du telechargement c'est à dire de savoir s'il est en pause continue ou est arreté 
//         // switch (snapshot.state) {
//         //   case 'paused':
//         //     console.log('Upload is paused');
//         //     break;
//         //   case 'running':
//         //     console.log('Upload is running');
//         //     break;
//         // }
//       }, 
//       (error) => {
//         // Handle unsuccessful uploads
//       }, 
//       () => {
//         // Handle successful uploads on complete
//         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//         getDownloadURL(uploadTask.snapshot.ref).then( (downloadURL) => {
//              downloadUrlImage.set(downloadURL);
//           console.log('File available at', downloadURL);
//         });
//       }
//     );
// }