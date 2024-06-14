export async function deleteUser(id){
    try {
        let result = await fetch('/api/admin/deleteUser',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id}),
        })
    }catch (e){
        console.error(e)
    }
}