import { Note } from "../models/note";
import { User } from "../models/user";


const fetchData=async(input:RequestInfo,init?:RequestInit)=>{
const response = await fetch(input,init);
if(response.ok)
return response;
else{
    const errorBody =await response.json();
    const errMessage =errorBody.error;
    throw Error(errMessage);
}
}

export interface SignUpCredentials{
    username:string,
    email:string,
    password:string
}
export const signUp=async(credentials:SignUpCredentials):Promise<User>=>{
    const response=await fetch('/api/users/signup',{
        method:'POST',
        body:JSON.stringify(credentials),
        headers:{
            'Content-Type':'application/json'
        },
    });
    return response.json();
}

export interface LoginCredentials{
    username:string,
    password:string
}
export const login=async(credentials:LoginCredentials)=>{
    const response=await fetch('/api/users/signin',{
        method:'POST',
        body:JSON.stringify(credentials),
        headers:{
            'Content-Type':'application/json'
        },
    });
    return response.json();
}
const createAuthHeader=()=>{
    const token = localStorage.getItem('token');
    return token ? token : "No token";
}
export const  fetchNotes= async():Promise<Note[]> => {
    const response= await fetchData("/api/notes",{method:'GET',
    headers:{
        'Authorization':createAuthHeader(),
    }
});
    return response.json();
}

export interface NoteInput{
    title:string, text?:string
}
export const createNote=async(note:NoteInput):Promise<Note>=>{
const response =await fetchData('/api/notes',{
    method:'POST',
    headers:{
        'Content-Type':'application/json',
        'Authorization':createAuthHeader(),
    },
    body:JSON.stringify(note)
})
return response.json();
}

export const updateNote=async(noteId : string , note:NoteInput):Promise<Note>=>{
    const response =await fetchData('/api/notes/'+noteId,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Authorization':createAuthHeader(),
        },
        body:JSON.stringify(note)
    })
    return response.json();
    }

export const deleteNote=async(noteId:string)=>{
    await fetchData('/api/notes/'+noteId,{method:'DELETE',
headers:{
    'Authorization':createAuthHeader(),
}
})
}