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
type TableTypeProps = Merge<TableRowProps, {}>

interface TableActionProps {
    onClick: (vars:any)=> any,
    data?: any
}

type DeleteActionProps = typeof TableActionProps;
type EditActionProps = typeof TableActionProps;
