import {createHistoryCookie, getSingleProduct} from "./requests.js";
import {insertParameters, imagePreviewSwitcher} from "../components/insertParameters.js";



document.addEventListener('DOMContentLoaded',async () => {
    await createInterface()
    await createHistoryCookie()
    imagePreviewSwitcher(document.querySelector('#image-carousel-holder #main-image img'), document.querySelectorAll('#image-carousel-holder #source-images .source-image-holder'))
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
    console.log(prodFromBack)
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