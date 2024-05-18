document.addEventListener('DOMContentLoaded',() =>{
    
    document.querySelector('#signUpInfo').addEventListener('submit', async (event)=>{
        event.preventDefault();
        let formFromId = document.querySelector('#signUpInfo');
        
        let formData = new FormData(formFromId);

        let data = {}
        // Проверяем содержимое formData
        for (let [key, value] of formData.entries()) {
            data[key] = value
        }
        try {
            let response = await fetch('/api/signUp',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok){
                document.querySelector('#main-info-page').classList.remove('open');
                document.querySelector('#creation-failed').classList.add('open');
            }else{
                document.querySelector('#main-info-page').classList.remove('open');
                document.querySelector('#email-verification').classList.add('open');
                
            }
        }catch (error){
            
        }
        
    })
    
})
    
