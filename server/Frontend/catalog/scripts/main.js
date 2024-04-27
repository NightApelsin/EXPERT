import {CreateCatalogItem} from "../components/item.js";
import {getAllProducts} from "./requests.js";



document.addEventListener('DOMContentLoaded', async () => {

    const res = await getProducts()
    
    let ASCDESCFilters = document.querySelectorAll('input[name="filter-radio"]')
    console.log(ASCDESCFilters)
    ASCDESCFilters.forEach((elem)=>{
        elem.addEventListener('change', () => {
            console.log(elem)
        })
    })
    
})
    
async function getProducts() {  
    const doorsProducts = await getAllProducts()
    const mainContainer = $('#catalog')
    doorsProducts.forEach(element=>{
        
        let createdItem = CreateCatalogItem(element.name, element.filters.material, element.price, 
            element.image, element.filters.sale)
        mainContainer.append(createdItem)
        createdItem.addEventListener('click',(target)=>{
            window.location.replace('/catalog/'+element.id)
        })
    })
    return doorsProducts
}
