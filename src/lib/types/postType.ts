export interface postCreationDataProps{
    uid : string;
    id: string;
    text : string;
    url: string;
    fileType: string;
    like: string[];
    dislike: string[];
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