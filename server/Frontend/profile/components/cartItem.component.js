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
    content.style.display = 'flex';
    content.style.flexDirection = 'row'
    content.style.justifyContent = 'space-between'
    content.style.alignItems = 'center'
    
    //product information
    let productInformation = document.createElement('div')
    productInformation.style.display = 'flex'
    productInformation.style.flexDirection = 'row'
    productInformation.style.alignItems = 'center'
    productInformation.style.columnGap = '30px'
    
    //image holder
    let imageHolder = document.createElement('div')
    imageHolder.style.width = '150px'
    imageHolder.style.height = '150px'
    imageHolder.style.overflow = 'hidden'
    
    //image
    let image = document.createElement('img')
    image.src = regularProduct.image.mainImage
    imageHolder.append(image)
    productInformation.append(imageHolder)
    
    //text information holder
    let productNameHolder = document.createElement('div')
    
}