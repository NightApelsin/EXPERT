async function addFetch(param){
    console.log(window.sessionStorage.getItem('isAuth'))
    switch (param) {
        case 'modal':
            if
            (document.querySelector(`input[placeholder='Телефон']`).classList.contains('error') ||
                document.querySelector(`input[placeholder='Телефон']`).value.length !== 12)
            {
                console.log('wrong argument')
            }
            else
            {

                let formData = {phoneNumber: document.querySelector(`input[placeholder='Телефон']`).value}
                console.log(formData)
                try {
                    let response = await fetch('/api/addPersonOnConsultQueue/', {
                        method: 'POST',
                        body: JSON.stringify(formData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    if (!response.ok) {
                        console.log('something failed')
                    } else {
                        document.querySelector('#complete').classList.add('enabled')
                        document.querySelector('.ui-resizable-handle.ui-resizable-s').classList.add('width-0');
                        setTimeout(() => {
                            document.querySelector('#complete').classList.remove('enabled')
                            document.querySelector('.ui-resizable-handle.ui-resizable-s').classList.remove('width-0');
                            $('#myModal').dialog('close')
                        }, 5000)
                    }

                } catch (e) {
                    console.error('There has been a problem with your fetch operation:', e);
                }
                return

            }
            break;
        case 'view':

            if (document.querySelector(`input[placeholder='Номер телефона']`).classList.contains('error') ||
                document.querySelector(`input[placeholder='Номер телефона']`).value.length !== 12) {
                console.log('wrong argument')
                console.log(document.querySelector(`input[placeholder='Номер телефона']`).value)
                console.log(document.querySelector(`input[placeholder='Номер телефона']`).classList.contains('error'),
                    document.querySelector(`input[placeholder='Номер телефона']`).value !== 12)
            } else {

                let formData = {phoneNumber: document.querySelector(`input[placeholder='Номер телефона']`).value}
                console.log(formData)
                try {
                    let response = await fetch('/api/addPersonOnConsultQueue/', {
                        method: 'POST',
                        body: JSON.stringify(formData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    if (!response.ok) {
                        console.log('something failed')
                    } else {
                        document.querySelector('#order-content').classList.add('complete')
                        document.querySelector(`input[placeholder='Номер телефона']`).readOnly = true
                        document.querySelector("#orderSendBtn").onclick = ()=>{}
                        document.querySelector("#order-title").textContent="Спасибо за обращение!"
                        document.querySelector("#order-text").textContent="Мы получили вашу заявку и перезвоним в ближайшее время"
                    }

                } catch (e) {
                    console.error('There has been a problem with your fetch operation:', e);
                }


            }
            break;
    }
}