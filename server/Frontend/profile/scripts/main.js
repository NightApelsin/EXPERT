import {addCartItem} from "../components/cartItem.component.js";

document.addEventListener('DOMContentLoaded',()=>{
    let cartMenu = document.querySelector('#cart')
    let ordersMenu = document.querySelector('#orders')
    let commentsMenu = document.querySelector('#comments')
    let reportsMenu = document.querySelector('#reports')
    
    //tab switching
    let topBtns = document.querySelectorAll('.top-btns div')
    let menuDisplay = document.querySelectorAll('.menu-display div')
     topBtns.forEach((e)=>{
         e.addEventListener('click', (event)=>{
             menuDisplay.forEach((j)=>{
                 e.classList.remove('open')
                 if(e.classList.contains(j.id)){
                     j.classList.add('open')
                 }else {
                     j.classList.remove('open')
                 }
             })
             topBtns.forEach((j)=>{
                 j.classList.remove('open')
             })
             e.classList.add('open')
             
         })
     })
    
    //adding the cart item
    
    let cartCookie = JSON.parse(getCookie('productsCart'))
    for(let i = 0; i < cartCookie.doorsId.length; i++){
        addCartItem(cartCookie.doorsId[i])
    }
})

//cookies parsing
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}