﻿
document.addEventListener('DOMContentLoaded',function() {
    //modal window
    console.log(document.querySelectorAll('.openModalBtn'))
    document.querySelectorAll(".openModalBtn").forEach(e=>{
        console.log(e)
        e.addEventListener('click',function() {
        console.log('a')
        $("#myModal").dialog({
            modal: true,
            height: 340,
            width: 600,
            reliable: false,
            draggable: false,
            beforeClose: function( event, ui ) {
                document.querySelector('body').style.overflow = 'scroll'
            },
            open: function( event, ui ) {
                document.querySelector('body').style.overflow = 'hidden';
            }
        });

        
        })
    });
    //auth modal
    $('#auth-modal').dialog({
        modal: true,
        height: 540,
        width: 600,
        reliable: false,
        draggable: false,
        beforeClose: function( event, ui){
            document.querySelector('body').style.overflow = 'scroll'
        },
        open: function( event, ui ) {
            document.querySelector('body').style.overflow = 'hidden';
        }
    })
    
    $('#login-btn').click(async () => {
        const emailPlaceholder = document.querySelector('#email-placeholder')
        const passwordPlaceholder = document.querySelector('#password-placeholder')
        if (emailPlaceholder.value !== '' && emailPlaceholder.value.includes('@') && passwordPlaceholder.value.length > 6) {
            try {
                let getCode = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({'userEmail': emailPlaceholder.value, 'userPassword': passwordPlaceholder.value}),
                })
                if(!getCode.ok){
                    document.querySelector('#auth-modal .content').classList.remove('open')
                    document.querySelector('#auth-modal .access-denied').classList.add('open')
                }
                else {
                    document.querySelector('#auth-modal .content').classList.remove('open')
                    document.querySelector('#auth-modal .auth-access-pin').classList.add('open')
                }
            }catch (e){
                document.querySelector('#auth-modal .content').classList.remove('open')
                document.querySelector('#auth-modal .access-denied').classList.add('open')
                document.querySelector('#auth-modal .access-denied .title span:last-child').textContent = e.message
            }
        }
    })
    $('#accessBtn').click(async ()=>{
        
        let verifyFetch = await fetch('/api/verifyAccess',{
            method: 'POST',
            body: JSON.stringify({code:document.querySelector('#pin-placeholder').value,
                                        hash:getCookie('sha')}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(verifyFetch.ok){
            document.querySelector('.auth-access-pin').classList.remove('open')
            document.querySelector('.access-granted').classList.add('open')
        }
        else{
            document.querySelector('.auth-access-pin').classList.remove('open')
            document.querySelector('.access-denied').classList.add('open')
        }
    })

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    //nav-bar menu
    $('.burger-button').click(function(event) {
        $('.burger-button, .burger-list-container').toggleClass('active');
    })
    $('.burger-list-container .close').click(function(event) {
        $('.burger-list-container, .burger-button').removeClass('active');
    })
    $('#burger-menu-show-btn').click((event)=>{
        $('.accordion-list-items').toggleClass('active');
    })
    //accordion description
    
    $("#accordion-description").accordion({
        heightStyle: "content",
        icons: { "activeHeader": ".accordion-item-title:after.active" }
    });
    
    $('#anti-srez-sb').click((event)=>{
        $('.anti-srez .text-content').toggleClass("active");
    })
    
    $('#anti-thief-sb').click((event)=>{
        $('.anti-thief .text-content').toggleClass("active");
    })
    $('#more-security-sb').click((event)=>{
        $('.more-security .text-content').toggleClass("active");
    })
    
    
    //РАБОТА С СЕРВЕРОМ
    
})


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
                        document.querySelector("#order-text").textContent="Мы получили вашу заявку и перезвоним в близжайшее время"
                    }

                } catch (e) {
                    console.error('There has been a problem with your fetch operation:', e);
                }


            }
            break;
    }
}














































