type RouteType = {
    path: string,
    component: ComponentType,
    children?: RouteType[],
    state?: any,
    name?:string,
    label?:string
}