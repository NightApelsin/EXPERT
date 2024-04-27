import {getSingleProduct} from "./requests.js";

document.addEventListener('DOMContentLoaded',()=>{
     createInterface()
  
    
})

async function createInterface() {
    let productID = window.location.pathname.split('/');
    productID.pop()
    let a = productID.pop()
    console.log(a)
    let prodFromBack = await getSingleProduct(a)
    document.title = `EXPERT - ${prodFromBack[0].name}`
}