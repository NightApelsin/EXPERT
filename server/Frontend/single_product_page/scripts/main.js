import {getSingleProduct} from "./requests.js";

document.addEventListener('DOMContentLoaded',()=>{
    createInterface()
})

function createInterface(){
    let productID = window.location.pathname.split('/');
    productID.pop();
    //console.log(productID.pop())
    
    let prodFromBack = getSingleProduct(productID.pop())
    console.log(prodFromBack)
}