export async function logOut(){
    try {
        let logOutStatus = await fetch('/api/logOut', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })
        if(logOutStatus.ok){
            window.location.replace('/')
            
        }
    }catch (e){
        window.location.replace('/errors/404.html')
    }
}