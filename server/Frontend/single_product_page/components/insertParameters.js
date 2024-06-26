﻿/**
 *   вставляет все значения из БД в интерфейс сайта
 * @param {Promise} promise
 * @param {Element} previewContainer
 *
 ***/
export function insertParameters(promise, previewContainer) {
    
    // внесение основной справочной информации названия, цены скидки и т.д.
    
    const name = previewContainer.querySelector('#name')
    const material = previewContainer.querySelector('#material')
    const price = previewContainer.querySelector('#price')
    const sale = previewContainer.querySelector('#sale')
    const salePriceCount = previewContainer.querySelector('#sale-price-count')
    const timeLeft = previewContainer.querySelector('#time-left')
    const salePrivileges = document.querySelector('.privileges-item:nth-child(2)') 
    
    
    name.textContent = promise[0].name
    material.textContent = promise[0].filters.material
    price.textContent = `${promise[0].price}₽`
    
    if(promise[0].filters.sale) {
        sale.textContent = `${Math.ceil(promise[0].price - ((promise[0].filters.sale / 100) * promise[0].price))}₽`
        price.classList.add('sale')
        salePriceCount.textContent = `Вы сэкономите ${Math.ceil((promise[0].filters.sale / 100) * promise[0].price)}₽`
        timeLeft.textContent = "* Срок действия акции до 20.06"
        let salePrivilege = document.querySelector('#sale-privileges')
        salePrivilege.textContent = `Вы сэкономите ${promise[0].filters.sale}%`
    }
    else{
        salePrivileges.style.display = "none";
        previewContainer.querySelector('.sale-banner').style.display = "none"
    }

    const imageCarousel = document.querySelector("#image-carousel-container");

    let imageCarouselHolder = document.createElement('div');
    imageCarouselHolder.id = 'image-carousel-holder';
    

    let mainImageHolder = document.createElement('div');
    mainImageHolder.id = 'main-image';

    let sourceImagesHolder = document.createElement('div');
    sourceImagesHolder.id = 'source-images';


    let mainImage = document.createElement('img');
    mainImage.src = promise[0].image.mainImage;
    mainImage.alt = 'main-image';

    promise[0].image.sourceImage.forEach(elem => {
        let sourceImageHolder = document.createElement('div');
        sourceImageHolder.className = 'source-image-holder';
        let sourceImage = document.createElement('img');
        sourceImage.src = elem;
        sourceImage.alt = 'source-image';
        sourceImage.className = 'source-image';
        sourceImageHolder.appendChild(sourceImage);
        sourceImagesHolder.appendChild(sourceImageHolder);
    });

    mainImageHolder.appendChild(mainImage);
    imageCarouselHolder.appendChild(mainImageHolder);
    imageCarouselHolder.appendChild(sourceImagesHolder);
    imageCarousel.appendChild(imageCarouselHolder);
    
}
export function imagePreviewSwitcher(mainContainer, sourceImagesContainer){
    console.log(mainContainer)
    
    sourceImagesContainer.forEach((elem)=>{
        console.log(elem.querySelector('img'))
        elem.addEventListener('click', (target)=>{
            let buffer = mainContainer.src
            mainContainer.src = elem.querySelector('img').src;
            elem.querySelector('img').src = buffer
        })
    })
}