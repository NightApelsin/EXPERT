import {getSingleProduct} from "./requests.js";

document.addEventListener('DOMContentLoaded',()=>{
     createInterface()
  
    
})

async function createInterface() {
    let productID = window.location.pathname.split('/');
    productID.pop();
    let prodFromBack = await getSingleProduct(productID.pop())
    document.title = `EXPERT - ${prodFromBack[0].name}`
    
    
}