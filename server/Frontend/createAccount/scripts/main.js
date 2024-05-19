document.addEventListener('DOMContentLoaded',() =>{
    
    document.querySelector('#signUpInfo').addEventListener('submit', async (event)=>{
        event.preventDefault();
        let data = getFormData('#signUpInfo')
        try {
            let response = await fetch('/api/SMTP/getVerificationCode',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:data.email, state:'creation'})
            })
            if(response.status === 200) {
                document.querySelector('#main-info-page').classList.remove('open');
                document.querySelector('#email-verification').classList.add('open');
            }else {
                document.querySelector('#creation-failed').classList.add('open');
                document.querySelector('#main-info-page').classList.remove('open');
            }
        }catch (error){
            document.querySelector('#main-info-page').classList.remove('open');
            document.querySelector('#creation-failed').classList.add('open');
            console.error(error)
        }
        
    })
    document.querySelector('#emailCodeVerification').addEventListener('submit', async (event) => {
        event.preventDefault()

        let data = getFormData('#emailCodeVerification')
        
        console.log(getCookie('sha'))
        let verStatus = await fetch('/api/verifyAccess', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code: data.verifyCode, hash: getCookie('sha')})
        })
        if(!verStatus.ok){
            document.querySelector('#main-info-page').classList.remove('open');
            document.querySelector('#creation-failed').classList.add('open');
        }else{
            let accountData = getFormData('#signUpInfo')
            try {
                let createrdAccount = await fetch('/api/signUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: accountData.email,
                        password: accountData.password,
                        name: accountData.name,
                        surname: accountData.surname
                    })
                })
            } catch (error){
                document.querySelector('#main-info-page').classList.remove('open');
                document.querySelector('#creation-failed').classList.add('open');
                console.error(error);
            }
        }
    })
    
})
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;


}
function getFormData(name) {
    let formFromId = document.querySelector(name);

    let formData = new FormData(formFromId);

    let data = {}
    // Проверяем содержимое formData
    for (let [key, value] of formData.entries()) {
        data[key] = value
    }
    return data;
}