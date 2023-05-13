
export const actions = (navigator:any)=> [
    {
        label: 'Create new',
        extra: {
            onClick : ()=>{
                navigator("/users/create");
            }
        }
    },

] as Array<StackActionsType>