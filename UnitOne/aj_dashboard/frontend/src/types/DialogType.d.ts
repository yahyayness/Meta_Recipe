interface DialogProps {
    message:string,
    title:string,
    open:boolean,
    setOpen: (status:boolean)=>void,
    ok?: ()=>void,
    close?:()=>void
}