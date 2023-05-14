import {ResponseType} from "./HttpTypes";

interface Product<TaleRow>{
    id:number,
    name:string,
    date:string,
    [key:string] : [value:any]
}

interface AuthType {
    refresh:string,
    access:string
}

interface UserType extends ResponseType {
    id:number,
    first_name:string,
    last_name:string,
    username:string,
    email:string,
    password?:string
}

type ListType<T> = Merge<{ results: Array<T>} , PaginationType>
