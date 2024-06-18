

export async function createProductComponent(product){
   let mainContainer 
    
    let fetchResult = await getParameters(product)
    
    
    mainContainer = document.createElement('div')
    let visibleContent = document.createElement('div')
    visibleContent.classList.add('visible-product-content')
    let hidenContent = document.createElement('div')
    hidenContent.classList.add('hiden-product-content')
    
    let mainImageHolder = document.createElement('div')
    mainImageHolder.classList.add('main-image-holder')
    let mainImage = document.createElement('img')
    mainImage.src = product.image.mainImage
    mainImageHolder.append(mainImage)
    visibleContent.append(mainImageHolder)
    
    let productName = document.createElement('span')
    productName.classList.add('product-name')
    productName.textContent = product.name
    visibleContent.append(productName)
    
    let arrow = document.createElement('div')
    arrow.classList.add('open-product-arrow')
    
    
    
    for(let productParameter in product){
        if(!productParameter.includes('_id')) {
            if(productParameter === 'filters'){
                console.log(product[productParameter])
            }
            let inputHolder = document.createElement('div')
            inputHolder.classList.add('input-holder')

            let parameterName = document.createElement('span')
            parameterName.classList.add(productParameter)
            parameterName.classList.add('parameter')
            parameterName.textContent = productParameter


            let parameterInput = document.createElement('input')
            parameterInput.type = 'text'
            parameterInput.classList.add(productParameter)
            parameterInput.classList.add('input')
            parameterInput.value = product[productParameter]

            inputHolder.append(parameterName, parameterInput)
        }
        else{
            console.log(productParameter)
        }
    }
    
    
    for(let category in fetchResult){
        let categoryContainer = document.createElement('div')
        for(let param in fetchResult[category]){
            
            for(let id in fetchResult[category][param]){
                
                let item = fetchResult[category][param][id]
                
                
                
            }
            
        }
    }
   return mainContainer
}


async function getParameters(product){

    try{
        let fetchingParam = await fetch('/api/admin/getProductsParameters',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({id:product.id})
        })
        return await fetchingParam.json()

    }catch (e){
        console.log(e)
    }
}