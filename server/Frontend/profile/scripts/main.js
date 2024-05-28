import {addCartItem} from "../components/cartItem.component.js";
import {logOut} from "../components/logOut.js";

document.addEventListener('DOMContentLoaded',async () => {
    document.querySelector('.cart-is-empty').addEventListener('click', () =>{
        window.location.replace('/catalog')
    })
    let cartMenu = document.querySelector('#cart')
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
                await addCartItem(cartCookie.doorsId[i]).then(r => cartMenu.append(r))
            }
            let deleteBtns = document.getElementsByClassName('delete-btn');
            for (let i = 0; i < deleteBtns.length; i++) {
                deleteBtns[i].addEventListener('click', (event) => {
                    const target = event.target.closest('.cart-item-container');
                    
                    if (target) {
                        
                        let removeIndex = JSON.parse(getCookie('productsCart')).doorsId.indexOf(parseInt(event.target.closest('.delete-btn').classList[1]))
                        let {doorsId, optionalProducts} = JSON.parse(getCookie('productsCart'))
                        
                        console.log(doorsId)
                        doorsId.splice(doorsId.indexOf(parseInt(removeIndex)), 1)
                        console.log(doorsId)
                        
                        document.cookie = 'productsCart='+JSON.stringify({doorsId, optionalProducts})+`;expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}`+';path=/'
                        target.remove();
                        if(cartIsEmpty()){
                            document.querySelector('.cart-is-empty').classList.add('empty')
                        }
                        
                    }
                    
                });
            }
        }
    }catch (e) {
        console.log('ERROR:Корзина отсутствует')
    }
    document.querySelector('#log-out').addEventListener('click', async () => {
        await logOut()
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
    console.log(JSON.parse(getCookie('productsCart')).doorsId.length)
    return JSON.parse(getCookie('productsCart')).doorsId.length <= 0;
}