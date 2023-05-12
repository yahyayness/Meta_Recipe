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