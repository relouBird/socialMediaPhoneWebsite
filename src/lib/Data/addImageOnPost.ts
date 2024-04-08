import { writable, type Writable } from "svelte/store";

export const defineNullDatasImage = () =>{
    imageURL.set(null);
    file_image.set(null);
}

export const imageURL: Writable<string | null> = writable(null);

export const file_image : Writable<File | null> = writable(null);

