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


async function addFetch(){
    if(document.querySelector(`input[placeholder='Телефон']`).classList.contains('error')){
        return 0
    }else{
        let formData = {phoneNumber:document.querySelector(`input[placeholder='Телефон']`).value}
        console.log(formData)
        try {
            let response = await fetch('/api/addPersonOnConsultQueue/', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                console.log('something failed')
            }else {
                document.querySelector('#complete').classList.add('enabled')
                document.querySelector('.ui-resizable-handle.ui-resizable-s').classList.add('width-0');
                setTimeout(() => {
                    document.querySelector('#complete').classList.remove('enabled')
                    document.querySelector('.ui-resizable-handle.ui-resizable-s').classList.remove('width-0');
                    $('#myModal').dialog('close')
                }, 5000)
            }

        }catch (e){
            console.error('There has been a problem with your fetch operation:', e);
        }
        // }).then(data=>{
        //
        //     document.querySelector('#complete').classList.add('enabled')
        //     document.querySelector('.ui-resizable-handle.ui-resizable-s').classList.add('width-0');
        //     setTimeout(()=>{
        //         document.querySelector('#complete').classList.remove('enabled')
        //         document.querySelector('.ui-resizable-handle.ui-resizable-s').classList.remove('width-0');
        //         $('#myModal').dialog('close')
        //     }, 5000)
        // }).then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.json();
        // }).catch(error => {
        //     console.error('There has been a problem with your fetch operation:', error);
        // })

    }
}














































