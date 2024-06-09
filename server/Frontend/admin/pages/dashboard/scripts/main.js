document.addEventListener('DOMContentLoaded', async ()=>{
    let isVerified = await fetch('/api/admin/isVerified',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    if(!isVerified.ok){
        window.location.replace('/')
    }
})