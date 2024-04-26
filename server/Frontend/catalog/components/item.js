export function CreateCatalogItem(name, description, price, img, filters) {
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('catalog-item');

    const textAndImageContainer = document.createElement('div');
    textAndImageContainer.classList.add('catalog-text-info');

    const priceInfo = document.createElement('div');
    priceInfo.classList.add('catalog-price-info');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;
    const nameContainer = document.createElement('div');
    nameContainer.classList.add('catalog-item-name');
    nameContainer.appendChild(nameSpan);

    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = description;
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('catalog-item-description');
    descriptionContainer.appendChild(descriptionSpan);

    const imgElement = document.createElement('img');
    imgElement.src = img;
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('catalog-item-image');
    imgContainer.appendChild(imgElement);

    const priceSpan = document.createElement('span');
    priceSpan.textContent = `${price}₽`;
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('catalog-item-price');
    priceContainer.appendChild(priceSpan);

    textAndImageContainer.append(nameContainer, descriptionContainer, imgContainer);
    priceInfo.appendChild(priceContainer);

    if (filters) {
        const saleSpan = document.createElement('span');
        saleSpan.textContent = `${price - ((filters / 100) * price)}₽`;
        const saleContainer = document.createElement('div');
        saleContainer.classList.add('catalog-item-sale');
        priceContainer.classList.add('sale')
        saleContainer.appendChild(saleSpan);
        priceInfo.appendChild(saleContainer);
        
        const saleCountMark = document.createElement('span');
        saleCountMark.textContent = `-${filters}%`
        saleCountMark.classList.add('sale-count-mark')
        mainContainer.append(saleCountMark)
    }

    mainContainer.append(textAndImageContainer, priceInfo);
    return mainContainer;
}