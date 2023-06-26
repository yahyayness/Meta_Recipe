
export const actions = (navigator:any, onDelete: any )=> [
    {
        label: 'Create new',
        extra: {
            onClick : ()=>{
                navigator("/users/create");
            }
        }
    },
    {
        label: 'Delete',
        extra: {
            onClick : ()=>  onDelete()
        }
    },

] as Array<StackActionsType>