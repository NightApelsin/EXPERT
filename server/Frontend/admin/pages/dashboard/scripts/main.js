﻿import {createProfileComponent} from "../components/profile.component.js";
import {createProductComponent} from "../components/product.component.js";

document.addEventListener('DOMContentLoaded', async ()=> {
    let isVerified = await fetch('/api/admin/isVerified', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    if (!isVerified.ok) {
        window.location.replace('/')
    }
    let topBtns = document.querySelectorAll('.menu div')
    let menuDisplay = document.querySelectorAll('.main-container div')
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

    try {
        let users = await fetch('/api/admin/getUsers', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })
        let usersJson = await users.json()
        for (const user of usersJson) {
            createProfileComponent(user).then(r => document.querySelector('#users').append(r))
        }


        let products = await fetch('/api/admin/getProducts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })
        let productsJson = await products.json()
        for (const product of productsJson) {

            await createProductComponent(product).then(r => document.querySelector('#products').append(r))
        }
    } catch (error) {
        console.log(error)
    }
    let imageTextHolders = document.querySelectorAll('.filter-name.image')
    
    for(let item of imageTextHolders){
        let addImageBtn = document.createElement('label')
        if(item.textContent==='mainImage') {
            addImageBtn.classList.add('edit-main-image')
            let btn = document.createElement('button')
            btn.textContent = 'Edit main image'
            addImageBtn.append(btn)
        }else{
            addImageBtn.classList.add('add-source-image')
            
            let btn = document.createElement('button')
            btn.textContent = 'Add source image'
            addImageBtn.append(btn)
        }
        console.log(item)
       item.closest('.hiden-container').append(addImageBtn)
        
    }
    
})