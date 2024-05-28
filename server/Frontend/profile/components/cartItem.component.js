/*
* <br><h1>CSS classes:</h1>
* <br><h3>cart-item-container</h3> - main container and ${regularProduct.id}-product - main container id
*   <br><h3>cart-product-information</h3> - container for full product information
*   <br><h3>cart-image-holder</h3> - image holder and "img" tag inside
*       <br><h3>cart-product-text-info</h3> - container for text product information and:
*           <br><h3>title</h3> - product title name
*           <br><h3>description</h3> - product description
*       <br><h3>cart-price</h3> - product price and tag "span" inside
*   <br><h3>buttons-holder</h3> - holder for buttons
*      <br><h3>delete-btn</h3> - delete cart item
* 
* */
export async function addCartItem(index){

    //fetching db
    
    let fetchProdFromDB = await fetch(`/api/catalog/${index}`,{
        method: "GET"
    })
    let productJSON = await fetchProdFromDB.json()
    let regularProduct = productJSON[0]
    
    //create DOM element
    
    //main container
    
    let content = document.createElement('div')
    content.classList.add('cart-item-container')
    
    //product information
    
    let productInformation = document.createElement('div')
    productInformation.classList.add('cart-product-information')
    
    //image holder
    
    let imageHolder = document.createElement('div')
    imageHolder.classList.add('cart-image-holder')
    
    //image
    
    let image = document.createElement('img')
    image.src = regularProduct.image.mainImage
    imageHolder.append(image)
    productInformation.append(imageHolder)
    
    //text information holder
    
    let productNameHolder = document.createElement('div')
    productNameHolder.classList.add('cart-product-text-info')
    
    //main name and description parsing
    
    let mainName = document.createElement('span')
    mainName.classList.add('title')
    mainName.textContent = regularProduct.name
    let mainDescription = document.createElement('span')
    mainDescription.classList.add('description')
    mainDescription.textContent = regularProduct.description
    
    //adding description and main name to information holder
    
    productNameHolder.append(mainName,mainDescription)
    productInformation.append(productNameHolder)
    
    //price parsing and adding to product information
    
    let priceHolder = document.createElement('div')
    priceHolder.classList.add('cart-price')
    if(regularProduct.filters.sale) {
        let priceSale = document.createElement('span')
        priceSale.classList.add('sale')
        priceSale.textContent = regularProduct.price + '₽'
        let price = document.createElement('span')
        price.textContent = Math.floor(regularProduct.price-(regularProduct.price*(regularProduct.filters.sale/100)))+'₽'
        priceHolder.append(priceSale,price)
    }else{
        let price = document.createElement('span')
        price.textContent = regularProduct.price + '₽'
        priceHolder.append(price)
    }
        productInformation.append(priceHolder)
        content.append(productInformation)
    
    //create option buttons 
    
    let buttonsHolder = document.createElement('div')
    buttonsHolder.classList.add('buttons-holder')
    
    let deleteBtn = document.createElement('div')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerHTML = '<?xml version="1.0" encoding="utf-8"?>\n' +
        '\n' +
        '<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\n' +
        '<svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" \n' +
        '\t viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\n' +
        '<path d="M42.7,469.3c0,23.5,19.1,42.7,42.7,42.7h341.3c23.5,0,42.7-19.1,42.7-42.7V192H42.7V469.3z M362.7,256h42.7v192h-42.7V256z\n' +
        '\t M234.7,256h42.7v192h-42.7V256z M106.7,256h42.7v192h-42.7V256z M490.7,85.3h-128V42.7C362.7,19.1,343.5,0,320,0H192\n' +
        '\tc-23.5,0-42.7,19.1-42.7,42.7v42.7h-128C9.5,85.3,0,94.9,0,106.7V128c0,11.8,9.5,21.3,21.3,21.3h469.3c11.8,0,21.3-9.5,21.3-21.3\n' +
        '\tv-21.3C512,94.9,502.5,85.3,490.7,85.3z M320,85.3H192V42.7h128V85.3z"/>\n' +
        '</svg>'
    deleteBtn.classList.add(regularProduct.id)
    
    
    buttonsHolder.append(deleteBtn)
    content.append(buttonsHolder)
    
    
    
    return content
    //TODO: ТЕОРИЯ: получится ли удалить позицию из cookie корзины при обращении к массиву позиций визуала корзины а именно индексов основных контейнеров
}
