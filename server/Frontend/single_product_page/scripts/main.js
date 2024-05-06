import {getSingleProduct} from "./requests.js";
import {insertParameters} from "../components/insertParameters.js";
import {soHardMenuBuilder} from "../components/soHardMenuBuilder.js";

document.addEventListener('DOMContentLoaded',async () => {
    await createInterface()
    
    const response = await fetch('/api/cookie/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({path: new Array(window.location.pathname.toString())})
        }
    )
    const result = await response.text();
    console.log(result)
    
})

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