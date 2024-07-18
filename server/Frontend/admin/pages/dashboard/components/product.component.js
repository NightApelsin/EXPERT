

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
            if (productParameter === 'filters' || productParameter === 'image') {
                let filterContent = document.createElement('div')
                filterContent.classList.add('parameters','input-holder', productParameter)
                let catName = document.createElement('span')
                catName.classList.add('visible-content')
                catName.textContent = productParameter
                catName.addEventListener('click', event=>{
                    event.target.closest(`.${productParameter}`).classList.toggle('redact')
                })
                filterContent.append(catName)
                for (let fill in product[productParameter]) {
                    let filterContainer = document.createElement('div')
                    filterContainer.classList.add('hiden-container')
                    
                    if (fill !== 'filters') {
                        
                        let filterName = document.createElement('span')
                        filterName.textContent = fill
                        filterName.classList.add('filter-name',productParameter)
                        let filterInput = document.createElement('input')
                        filterInput.value = product[productParameter][fill]
                        filterInput.type = 'text'
                        filterInput.classList.add('filter-input',productParameter)
                        filterContainer.append(filterName, filterInput)
                    } else {
                        filterContainer.append(createFilterCategory(product[productParameter]))
                    }
                    filterContent.append(filterContainer)
                }
                    
                    hidenContent.append(filterContent)
            } else {
                let inputHolder = document.createElement('div')
                inputHolder.classList.add('input-holder')

                let parameterName = document.createElement('span')
                parameterName.classList.add(productParameter)
                parameterName.classList.add('parameter')
                parameterName.textContent = productParameter


                let parameterInput = document.createElement('input')
                parameterInput.type = 'text'
                parameterInput.classList.add(productParameter)
                if (productParameter === 'description') {
                    parameterInput = document.createElement('textarea')
                    parameterInput.classList.add(productParameter)
                }
                parameterInput.classList.add('input')
                parameterInput.value = product[productParameter]
                if (productParameter === 'id') {
                    parameterInput.disabled = true
                }
                inputHolder.append(parameterName, parameterInput)
                hidenContent.appendChild(inputHolder)
            }
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
            categoryContainer.classList.add('parameters',param.toString())
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
function createFilterCategory(fetchResult){
    let obj = fetchResult.filters
    console.log(obj)
    let subFilterHolder = document.createElement('div')
    subFilterHolder.classList.add('filters')
    subFilterHolder.append(createCategory('filters'))
    
    for(let parameter in obj){
        
        subFilterHolder.append(createInputs(parameter, obj[parameter]))
        
    }
    
    return subFilterHolder
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
    infoHolder.addEventListener('click',(event)=>{
        event.target.closest(`.${name}`).classList.toggle('redact')
    })
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
        paramInput.classList.add('sub-category-parameter-input', name)
        
        
        container.append(paramName, paramInput)
    }
    return container
}