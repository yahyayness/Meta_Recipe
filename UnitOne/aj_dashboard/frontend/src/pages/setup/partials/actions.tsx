
export const actions = (navigator:any, onDelete: any )=> [
    {
        label: 'Create new',
        extra: {
            onClick : ()=>{
                navigator("/setup/create");
            }
        }
    },
     

] as Array<StackActionsType>