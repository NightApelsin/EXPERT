import {getSingleProduct} from "./requests.js";
import {insertParameters} from "./insertParameters.js";
import {soHardMenuBuilder} from "./soHardMenuBuilder.js";

document.addEventListener('DOMContentLoaded',async () => {
    await createInterface()

})

async function createInterface() {
    let productID = window.location.pathname.split('/');
    productID.pop()
    let prodFromBack = await getSingleProduct(productID.pop())
    document.title = `EXPERT - ${prodFromBack[0].name}`
    document.querySelector('#product-name-for-bread').innerText = prodFromBack[0].name
    
    insertParameters(prodFromBack, document.querySelector('#preview-container', document.querySelector('#so-hard-menu-container')))
    soHardMenuBuilder(prodFromBack[0].parameters)
}