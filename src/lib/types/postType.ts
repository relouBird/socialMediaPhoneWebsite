export interface postCreationDataProps{
    uid : string;
    nameUser: string;
    faceUrl: string;
    text : string;
    url: string;
    fileType: string;
    like: number;
    dislike: number;
    comment: string[];
    date: string;
}

export interface profileDataProps{
    id : string;
    name: string;
    work: string;
    bio: string;
    faceUrl: string;
    coverUrl: string;
}