import {addCartItem} from "../components/cartItem.component.js";
import {logOut} from "../components/logOut.js";
import {openOrderModal} from "../components/orderModal.component.js";
import {createOrderItem} from "../components/order.component.js";



let priceCounter = 0
document.addEventListener('DOMContentLoaded',async () => {
    
    let isAuth = await fetch('/api/isRemember',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if(!isAuth.ok) {
        window.location.replace('/')
    }
    
    
    document.querySelector('#total-price').textContent = priceCounter+'₽'
    document.querySelector('#ring').addEventListener('click', () =>{
        window.location.replace('/catalog')
    })
    let cartMenu = document.querySelector('#cart')
    let cartMenuHolder = document.querySelector('#cart-holder')
    let ordersMenu = document.querySelector('#orders')
    let commentsMenu = document.querySelector('#comments')
    let reportsMenu = document.querySelector('#reports')
    
    let avatar = document.querySelector('#avatar')
    let profileNickname = document.querySelector('#profile-nickname span')
    
    try{
        let userFromDB = await (await fetch('/api/getUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })).json()
        avatar.src = `https://api.multiavatar.com/${encodeURIComponent(userFromDB[0].name+" "+userFromDB[0].surname)}.svg`
        profileNickname.textContent = userFromDB[0].name+" "+userFromDB[0].surname
        document.title += userFromDB[0].name+" "+userFromDB[0].surname
    }catch (e){
        console.log(e)
    }
    
    //tab switching
    let topBtns = document.querySelectorAll('.top-btns div')
    let menuDisplay = document.querySelectorAll('.menu-display div')
    topBtns.forEach((e) => {
        e.addEventListener('click', (event) => {
            menuDisplay.forEach((j) => {
                e.classList.remove('open')
                if (e.classList.contains(j.id)) {
                    j.classList.add('open')
                } else {
                    j.classList.remove('open')
                }
            })
            topBtns.forEach((j) => {
                j.classList.remove('open')
            })
            e.classList.add('open')

        })
    })

    //adding the cart item
    try {
        let cartCookie = JSON.parse(getCookie('productsCart'))
        
        if (cartIsEmpty()){
            console.log('Корзина пуста')
        }else {

            document.querySelector('.cart-is-empty').classList.remove('empty')
            for (let i = 0; i < cartCookie.doorsId.length; i++) {
                await addCartItem(cartCookie.doorsId[i]).then(r => cartMenuHolder.append(r))
            }
            let deleteBtns = document.getElementsByClassName('delete-btn');
            for (let i = 0; i < deleteBtns.length; i++) {
                deleteBtns[i].addEventListener('click', (event) => {
                    const target = event.target.closest('.cart-item-container');
                    
                    if (target) {
                        
                        let removeIndex = JSON.parse(getCookie('productsCart'))
                            .doorsId.indexOf(parseInt(event.target.closest('.delete-btn').classList[1]))
                        let {doorsId, optionalProducts} = JSON.parse(getCookie('productsCart'))
                        
                        doorsId.splice(doorsId.indexOf(parseInt(removeIndex)), 1)
                        console.log(event.target.closest('.cart-item-container').querySelector('.to-order-checkbox').checked)
                        if(event.target.closest('.cart-item-container').querySelector('.to-order-checkbox').checked) {
                            
                            priceCounter -= parseInt(event.target.closest('.cart-item-container')
                                .querySelector('.cart-price .current-price').textContent.split('₽')[0])
                            
                        }
                        document.querySelector('#total-price').textContent = priceCounter+'₽'
                        
                        document.cookie = 'productsCart='+JSON.stringify({doorsId, optionalProducts})+
                            `;expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}`+';path=/'
                        target.remove();
                        if(cartIsEmpty()){
                            document.querySelector('.cart-is-empty').classList.add('empty')
                        }
                        
                    }
                    
                });
            }
        }
    }
    catch (e) {
        console.log('ERROR:Корзина отсутствует')
    }
    
    //adding orders 
    
    try{
        let orders = await (await fetch('/api/getAllOrders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })).json()
        
        for (const e of orders) {
           await createOrderItem(e).then(r => ordersMenu.append(r))
        }

    }
    catch (e){
        console.log(e)
    }
    document.querySelector('#log-out').addEventListener('click', async () => {
        await logOut()
    })
    document.querySelectorAll('.to-order-checkbox').forEach(e=> {
        e.addEventListener('change', async (event) => {
            let price = parseInt(event.target.closest('.cart-product-information')
                .querySelector('.cart-price .current-price').textContent.split('₽')[0])
            if(event.target.checked === true) {
                priceCounter += price
                document.querySelector('#total-price').textContent = priceCounter+'₽'
            }else{
                priceCounter -= price
                document.querySelector('#total-price').textContent = priceCounter+'₽'
            }
        })
    })
    document.querySelector('#order-btn').addEventListener('click',async ()=>{
        await createOrder()
    })
})

//cookies parsing
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function cartIsEmpty(){
    return JSON.parse(getCookie('productsCart')).doorsId.length <= 0;
}


//orders mechanism

async function createOrder(){
    let addedProducts = []
    let cartList = document.querySelectorAll('.cart-item-container')
    cartList.forEach(e=>{
        if(e.querySelector('.cart-product-information .to-order-checkbox').checked){
            addedProducts.push(parseInt(e.querySelector('.buttons-holder .delete-btn').classList[1]))
        }
    })
    if(addedProducts.length===0){
        openOrderModal('error')
    }
    else {
        let creationOrderResult = await fetch('/api/createOrder', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({addedProducts: addedProducts, totalPrice:priceCounter})
        })
        if (creationOrderResult.ok) {
            openOrderModal('success',)
        } else {
            openOrderModal('error')
        }
    }
}

