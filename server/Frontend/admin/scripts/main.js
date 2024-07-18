document.addEventListener('DOMContentLoaded', (event)=>{
    document.querySelector('#admin-auth').addEventListener('submit', async (event) => {
        event.preventDefault();
        try {
            let result = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    login: document.querySelector('#login-placeholder').value,
                    password: document.querySelector('#password-placeholder').value
                })
            })
            if(!result.ok){
                window.location.replace('/404')
            }else{
                window.location.replace('/admin/pages/dashboard/index.html')
            }
        }catch (e) {
            console.log(e.message)
        }
    })
})