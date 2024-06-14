export async function updateUser(userObj){
    try {
        let result = await fetch('/api/admin/updateUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userObj)
        })
    }
    catch (err) {
        console.error(err)
    }
}