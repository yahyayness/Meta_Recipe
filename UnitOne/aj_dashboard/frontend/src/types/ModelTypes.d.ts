import {ResponseType} from "./HttpTypes";

interface Product<TaleRow> {
    id: number,
    name: string,
    date: string,

    [key: string]: [value: any]
}

interface AuthType {
    refresh: string,
    access: string
}

interface UserType extends ResponseType {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password?: string
}

interface ProjectType extends ResponseType{
    id: number,
    name: string,
    description:string,
    [key:string] : [value : string | File]
}

interface ProtocolType extends ResponseType {
    [key: stirng]: [value: any]
}

interface IngredientType {
    name: string,
    amount: string,

    [key: string]: string
}

type ListType<T> = Merge<{ results: Array<T> }, PaginationType>
