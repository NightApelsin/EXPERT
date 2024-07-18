/*
* <br><h3 style="text-align:center;">Метод для создания отдельного элемента оформленных заказов</h3>
* */


import {addCartItem} from "./cartItem.component.js";

export async function createOrderItem(order){
    let mainContainer = document.createElement('div');
    mainContainer.classList.add('order-item-container')
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
       
    };
    mainContainer.addEventListener('click',(event)=>{
        event.target.closest('.order-item-container').classList.toggle('open')
    })
    //visible element for main information
    let infoContainer = document.createElement('div');
    infoContainer.classList.add('order-item-visible-info');
    //hidden element for products array
    let hideContainer = document.createElement('div');
    hideContainer.classList.add('order-item-hidden-info')
    
    let idContainer = document.createElement('span');
    idContainer.classList.add('order-item-id')
    idContainer.textContent = '№ ' + order.id 
    infoContainer.append(idContainer);
    
    let dateOfCreation = document.createElement('span');
    dateOfCreation.textContent = new Date(order.time_of_creation).toLocaleString("ru", options)
    dateOfCreation.classList.add('order-item-date')
    infoContainer.append(dateOfCreation);
    
    let totalPrice = document.createElement('span')
    totalPrice.classList.add('order-item-price')
    totalPrice.textContent = order.total_price + '₽'
    infoContainer.append(totalPrice);
    
    let openIcon = document.createElement('div')
    openIcon.classList.add('open-order-icon')
    totalPrice.append(openIcon);
    
    mainContainer.appendChild(infoContainer);
    
    order.ordered_products.forEach(e=>{
        addCartItem(e).then(r=>hideContainer.append(r))
    })
    
   
    
    mainContainer.appendChild(hideContainer)
    
    return mainContainer
}