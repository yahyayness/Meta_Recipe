interface TableColumns {
    label:stirng,
    value:string,
    isHidden?: boolean,
    extra?:Object,
    component?: ReactNode
}

interface TaleRow{}


interface TableHeaderProps{
    columns:Array<TableColumns>,
    actions?:Array<TableActionType>

}
interface TableActionType {
    component?:ReactNode
}

type TableRowProps  = Merge<TableHeaderProps , { rows:Array<TableRow> , actions?:Array<TableActionType>}>
type TableTypeProps = Merge<TableRowProps, {pagination?:PaginationType , setSelectedIds:(id:number)=>void}>

interface TableActionProps {
    onClick: (vars:any)=> any,
    data?: any
}

type DeleteActionProps = typeof TableActionProps;
type EditActionProps = typeof TableActionProps;

type PaginationPropsType  = Merge<PaginationType , {}>

interface PaginationType {
    count:number,
    num_pages:number | undefined,
    links : {
        next:stirng,
        previous?:string
    }
}
