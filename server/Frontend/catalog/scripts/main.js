import {CreateCatalogItem} from "../components/item.js";
import {getAllProducts} from "./requests.js";



function FilterProduct(products){
    const colors = Array.from(document.querySelectorAll('.color-filter:checked')).map(checkbox => checkbox.value);
    const materials = Array.from(document.querySelectorAll('.material-filter:checked')).map(checkbox => checkbox.value);
    const priceRange = Array.from(document.querySelectorAll('.price-filter:checked')).map(checkbox => checkbox.value);
    const specialParam = Array.from(document.querySelectorAll('.special-filter:checked')).map(checkbox => checkbox.value);
    
   
    let filteredProduct = products.filter(product =>{
        if (colors.length > 0 && !colors.includes(product.filters.filters.color)){
            return false
        }
        if (materials.length > 0 && !materials.includes(product.filters.filters.material)) return false;
        if (priceRange.length > 0 && !priceRange.includes(product.filters.filters.priceRange)) return false;
        if (specialParam.length > 0 && !specialParam.includes(product.filters.filters.specialParam)) return false;
        
        return true;
    })
    
    let mainContainer = document.getElementById('catalog')
    mainContainer.innerHTML = ''
    console.log(filteredProduct)
    filteredProduct.forEach(element=>{

        let createdItem = CreateCatalogItem(element.name, element.filters.material, element.price,
            element.image.mainImage, element.filters.sale)
        mainContainer.append(createdItem)
        createdItem.addEventListener('click',(target)=>{
            window.location.replace('/catalog/'+element.id)
        })
    })
    
}

document.addEventListener('DOMContentLoaded', async () => {

    const products = getProducts(await getAllProducts())
    
    
    document.querySelectorAll('input.color-filter').forEach(elem=>{
        elem.addEventListener('change', ()=>{
            FilterProduct(products)
        })
    })
    document.querySelectorAll('input.material-filter').forEach(elem=>{
        elem.addEventListener('change', ()=>{FilterProduct(products)})
    })
    document.querySelectorAll('input.price-filter').forEach(elem=>{
        elem.addEventListener('change', ()=>{FilterProduct(products)})
    })
    document.querySelectorAll('.special-filter').forEach(elem=>{
        elem.addEventListener('change', ()=>{FilterProduct(products)})
    })

    
    
    
})
function getProducts(func) {  
    const doorsProducts = func
    const mainContainer = document.querySelector('#catalog')
    doorsProducts.forEach(element=>{
        
        let createdItem = CreateCatalogItem(element.name, element.filters.material, element.price, 
            element.image.mainImage, element.filters.sale)
        mainContainer.append(createdItem)
        createdItem.addEventListener('click',(target)=>{
            window.location.replace('/catalog/'+element.id)
        })
    })
    return doorsProducts
}
