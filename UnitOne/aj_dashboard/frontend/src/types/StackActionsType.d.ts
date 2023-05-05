interface StackActionsType {
    label?:string,
    action?: (...any) => any,
    extra? : any,
    component?: ReactNode
}

interface StackActionsProps {
    actions:Array<StackActionsType>
}