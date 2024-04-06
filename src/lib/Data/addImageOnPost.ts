import { writable, type Writable } from "svelte/store";

export const imageURL: Writable<string | null> = writable(null);


