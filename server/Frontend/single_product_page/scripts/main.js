import {createHistoryCookie, getSingleProduct, addToCart, getCookie} from "./requests.js";
import {insertParameters, imagePreviewSwitcher} from "../components/insertParameters.js";
import {openAuthModal} from "../components/authModal.js";



document.addEventListener('DOMContentLoaded',async () => {
    await createInterface()
    await createHistoryCookie()
    
    imagePreviewSwitcher(document.querySelector('#image-carousel-holder #main-image img'), document.querySelectorAll('#image-carousel-holder #source-images .source-image-holder'))
    console.log(document.querySelectorAll('.openModalBtn'))
    document.querySelectorAll(".openModalBtn").forEach(e => {
        console.log(e)
        e.addEventListener('click', function () {
            console.log('a')
            $("#myModal").dialog({
                modal: true,
                height: 340,
                width: 600,
                reliable: false,
                draggable: false,
                beforeClose: function (event, ui) {
                    document.querySelector('body').style.overflow = 'scroll'
                },
                open: function (event, ui) {
                    document.querySelector('body').style.overflow = 'hidden';
                }
            })
        })
    })
    if(getCookie('productsCart')){
        let cartIcon = document.querySelector('#cart-indicator')
        cartIcon.classList.add('full')
    }
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
})
    //TODO: сделать динамичную подборку рекомендуемых на основе cookie и принимаемых параметров из запросов на их основе 
     
async function createInterface() {
    let productID = window.location.pathname.split('/');
    productID.pop()
    let prodFromBack = await getSingleProduct(productID.pop())
    document.title = `EXPERT - ${prodFromBack[0].name}`
    document.querySelector('#product-name-for-bread').innerText = prodFromBack[0].name
    insertParameters(prodFromBack, document.querySelector('#preview-container', 
        document.querySelector('#so-hard-menu-container')))
    soHardMenuInsert(prodFromBack)
    console.log(prodFromBack[0])
    document.querySelector('#add-to-cart').addEventListener('click',()=>{
        addToCart(prodFromBack[0])
    })
}


    //TODO: реализовать систему комментариев и их отображение у конкретного товара 
/**
* @param {Object} prodFromBack 
* */
function soHardMenuInsert(prodFromBack) {
    const parameters = document.querySelectorAll('.param-category-display .item-container')
    parameters.forEach(elem=>{
        
        if(prodFromBack[0][elem.id]===null || prodFromBack[0][elem.id]===false){
            document.querySelector(`#${elem.id} span:nth-child(2)`).textContent = '-'
        }else if(prodFromBack[0][elem.id]===true){
            document.querySelector(`#${elem.id} span:nth-child(2)`).textContent = 'есть'
        }
        else{
            document.querySelector(`#${elem.id} span:nth-child(2)`).textContent = `${prodFromBack[0][elem.id]}`
        }
        
    })
    
}

