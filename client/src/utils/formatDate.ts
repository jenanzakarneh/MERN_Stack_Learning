export const formateDate=(stringDate : string):string=>{

    return new Date(stringDate).toLocaleString('en-US',{
        year:'numeric',
        month:'long',
        day:'2-digit',
        hour:'2-digit',
        minute:'2-digit'
    })
}