import {CreateCatalogItem} from "../components/item.js";
import {getAllProducts} from "./requests.js";



document.addEventListener('DOMContentLoaded', () => {
    
    const res = getProducts()
    
})
    
async function getProducts() {  
    const doorsProducts = await getAllProducts()
    const mainContainer = $('#catalog')
    doorsProducts.forEach(element=>{
        
        let createdItem = CreateCatalogItem(element.name, element.filters.material, element.price, 
            element.image, element.filters.sale)
        mainContainer.append(createdItem)
        createdItem.addEventListener('click',(target)=>{
            window.location.replace(`/catalog/:${element.id}`)
        })
    })
    
}
