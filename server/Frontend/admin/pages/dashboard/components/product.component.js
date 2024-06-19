

export async function createProductComponent(product){
   let mainContainer 
    
    let fetchResult = await getParameters(product)
    
    
    mainContainer = document.createElement('div')
    mainContainer.classList.add('product-category-container')
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
                console.log(productParameter)
                let filterContent = document.createElement('div')
                filterContent.classList.add('input-holder-filter')
               for(let fill in product[productParameter]){
                   let visibleFilterContent = document.createElement('div')
                   visibleFilterContent.classList.add('filter-visible-content')
                   let hidenFilterContent = document.createElement('div')
                   hidenFilterContent.classList.add('filter-hiden-content')
                   if(fill !== 'filters'){
                       let filterName = document.createElement('span')
                       filterName.textContent = fill
                       filterName.classList.add('filter-name')
                       let filterInput = document.createElement('input')
                       filterInput.value = product[productParameter][fill]
                       filterInput.type = 'text'
                       filterInput.classList.add('filter-input')
                       hidenFilterContent.append(filterName, filterInput)
                   }else {
                       createFilterCategory(product[productParameter], visibleFilterContent, hidenFilterContent)
                   }
                   filterContent.append(visibleFilterContent, hidenFilterContent)
                   hidenContent.append(filterContent)
               }
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
            if(productParameter === 'description'){
                parameterInput.type = 'textarea'
            }
            parameterInput.classList.add('input')
            parameterInput.value = product[productParameter]
            if(productParameter==='id'){
                parameterInput.disabled = true
            }
            inputHolder.append(parameterName, parameterInput)
            hidenContent.appendChild(inputHolder)
        }
        else{
           // console.log(productParameter)
        }
    }
    
    //create category container
    createMainCategory(fetchResult, visibleContent, hidenContent)
    mainContainer.append(visibleContent, hidenContent)
    visibleContent.addEventListener('click', (event)=>{
        mainContainer.classList.toggle('redact')
    })
    
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
function createMainCategory(fetchResult, visibleContent,hidenContent){
    for(let category in fetchResult){
        let categoryContainer = document.createElement('div')
        let subCategoryHidenContainer = document.createElement('div')
        for(let param in fetchResult[category]){
            //название категории и создание контейнеров в подкатегории
            categoryContainer.classList.add(param.toString())
            categoryContainer.append(createCategory(param.toString()))
            subCategoryHidenContainer.classList.add('hiden-container')

            for(let id in fetchResult[category][param]){
                subCategoryHidenContainer.append(createInputs(id, fetchResult[category][param][id]))
            }

        }
        categoryContainer.append(subCategoryHidenContainer)
        hidenContent.append(categoryContainer)

    }
}
function createFilterCategory(fetchResult, visibleContent,hidenContent){
    
        console.log(fetchResult)
        // let categoryContainer = document.createElement('div')
        // let subCategoryHidenContainer = document.createElement('div')
        // for(let param in fetchResult){
        //     //название категории и создание контейнеров в подкатегории
        //     categoryContainer.classList.add(param.toString())
        //     categoryContainer.append(createCategory(param.toString()))
        //     subCategoryHidenContainer.classList.add('hiden-container')
        //
        //     for(let id in fetchResult[param]){
        //         subCategoryHidenContainer.append(createInputs(id, fetchResult[param][id]))
        //     }
        //
        // }
        // categoryContainer.append(subCategoryHidenContainer)
        // hidenContent.append(categoryContainer)

    
}
function createCategory(name){
    let infoHolder = document.createElement('div')
    infoHolder.classList.add('visible-content')
    let categoryName = document.createElement('span')
    categoryName.classList.add('category-name')
    categoryName.textContent = name
    let showBtn = document.createElement('div')
    showBtn.classList.add('category-show')
    infoHolder.append(categoryName, showBtn)
    infoHolder.classList.toggle('redact')
    return infoHolder
}
function createInputs(name, value){
    let container = document.createElement('div')
    if(name === 'id'){
        
    }else {
        let paramName = document.createElement('span')
        paramName.textContent = name
        paramName.classList.add('sub-category-parameter-name')
        let paramInput = document.createElement('input')
        paramInput.value = value
        paramInput.classList.add('sub-category-parameter-input')
        
        container.append(paramName, paramInput)
    }
    return container
}