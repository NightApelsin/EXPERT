import {getCookie, openAuthModal} from "./main.js";

document.addEventListener('DOMContentLoaded',async function () {
    document.querySelector('#profile').addEventListener('click',async ()=>{
        let isRemember = await fetch('/api/isRemember',{
            method: 'POST',
            headers:{
                'content-type': 'application/json',
            }
        })
        if(isRemember.ok){
            window.location.replace('/profile')
        }else{
            await openAuthModal()
        }
    })
    if(getCookie('productsCart')){
        let cartIcon = document.querySelector('#cart-indicator')
        cartIcon.classList.add('full')
    }
    //modal window
    console.log(document.querySelectorAll('.openModalBtn'))
    document.querySelectorAll(".openModalBtn").forEach(e => {
        console.log(e)
        e.addEventListener('click', function () {
            console.log('a')
            $("#myModal").dialog({
                modal: true,
                height: 340,
                width: 600,
                resizeable: false,
                draggable: false,
                beforeClose: function (event, ui) {
                    document.querySelector('body').style.overflow = 'scroll'
                },
                open: function (event, ui) {
                    document.querySelector('body').style.overflow = 'hidden';
                }
            });
        })
    });
    //auth modal
    let isRemember = await fetch('/api/isRemember',{
        method: 'POST',
        headers:{
            'content-type': 'application/json',
        }
    })
    
    

    //nav-bar menu
    $('.burger-button').click(function (event) {
        $('.burger-button, .burger-list-container').toggleClass('active');
    })
    $('.burger-list-container .close').click(function (event) {
        $('.burger-list-container, .burger-button').removeClass('active');
    })
    $('#burger-menu-show-btn').click((event) => {
        $('.accordion-list-items').toggleClass('active');
    })
    //accordion description

    $("#accordion-description").accordion({
        heightStyle: "content",
        icons: {"activeHeader": ".accordion-item-title:after.active"}
    });

    $('#anti-srez-sb').click((event) => {
        $('.anti-srez .text-content').toggleClass("active");
    })

    $('#anti-thief-sb').click((event) => {
        $('.anti-thief .text-content').toggleClass("active");
    })
    $('#more-security-sb').click((event) => {
        $('.more-security .text-content').toggleClass("active");
    })


    if(isRemember.ok){
        return
    }
    else {
        await openAuthModal()
    }
    //РАБОТА С СЕРВЕРОМ

})


