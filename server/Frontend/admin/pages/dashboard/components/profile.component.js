import {updateUser} from "../../../requests/updateUser.request.js";
import {deleteUser} from "../../../requests/deleteUser.request.js";

export async function createProfileComponent(obj){
    let mainContainer = document.createElement('div');
    mainContainer.classList.add('user-container');
    
    let visibleContainer = document.createElement('div');
    visibleContainer.classList.add('user-visible-container')
    
    let hidenContainer = document.createElement('div');
    hidenContainer.classList.add('user-hiden-container')
    
    let avatarHolder = document.createElement('div');
    avatarHolder.classList.add('avatar-holder');
    let avatarImg = document.createElement('img');
    avatarImg.src = `https://api.multiavatar.com/${encodeURIComponent(obj.name+' '+obj.surname)}.svg`
    
    avatarHolder.append(avatarImg)
    visibleContainer.append(avatarHolder)
    
    let userName = document.createElement('span')
    userName.classList.add('user-name-span')
    userName.textContent =`${obj.name} ${obj.surname}`
    visibleContainer.append(userName)
    
    let buttonsHolder = document.createElement('div')
    buttonsHolder.classList.add('button-holder')
    
    let deleteBtn = document.createElement('div')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerHTML = '<?xml version="1.0" encoding="utf-8"?>\n' +
        '\n' +
        '<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\n' +
        '<svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" \n' +
        '\t viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\n' +
        '<path d="M42.7,469.3c0,23.5,19.1,42.7,42.7,42.7h341.3c23.5,0,42.7-19.1,42.7-42.7V192H42.7V469.3z M362.7,256h42.7v192h-42.7V256z\n' +
        '\t M234.7,256h42.7v192h-42.7V256z M106.7,256h42.7v192h-42.7V256z M490.7,85.3h-128V42.7C362.7,19.1,343.5,0,320,0H192\n' +
        '\tc-23.5,0-42.7,19.1-42.7,42.7v42.7h-128C9.5,85.3,0,94.9,0,106.7V128c0,11.8,9.5,21.3,21.3,21.3h469.3c11.8,0,21.3-9.5,21.3-21.3\n' +
        '\tv-21.3C512,94.9,502.5,85.3,490.7,85.3z M320,85.3H192V42.7h128V85.3z"/>\n' +
        '</svg>'
    deleteBtn.classList.add(obj.id)
    
    buttonsHolder.append(deleteBtn)
    visibleContainer.append(buttonsHolder)
    mainContainer.append(visibleContainer)
    
   visibleContainer.addEventListener('click', (event)=>{
       mainContainer.classList.toggle('redact')
   })
    
    let id = document.createElement('span')
    id.classList.add('user-id')
    id.textContent = obj.id
    
    let userNameHolder = document.createElement('div')
    let userNameLabel = document.createElement('span')
    userNameLabel.textContent = 'Имя: '
    let userNameInput = document.createElement('input')
    userNameInput.type = 'text'
    userNameInput.classList.add('user-name-input')
    userNameInput.value = obj.name
    
    userNameHolder.append(userNameLabel, userNameInput)

    let userSurnameHolder = document.createElement('div')
    let userSurnameLabel = document.createElement('span')
    userSurnameLabel.textContent = 'Фамилия: '
    let userSurnameInput = document.createElement('input')
    userSurnameInput.type = 'text'
    userSurnameInput.classList.add('user-surname-input')
    userSurnameInput.value = obj.surname
    
    userSurnameHolder.append(userSurnameLabel, userSurnameInput)
    
    
    let userEmailHolder = document.createElement('div')
    let userEmailLabel = document.createElement('span')
    userEmailLabel.textContent = 'Почта: '
    let emailInput = document.createElement('input')
    emailInput.type = 'text'
    emailInput.classList.add('user-email-input')
    emailInput.value = obj.email
    
    userEmailHolder.append(userEmailLabel, emailInput)
    
    let userSession = document.createElement('span')
    userSession.classList.add('user-session')
    userSession.textContent = 'id сессии: ' + obj.session
    
    let userPassword = document.createElement('span')
    userPassword.classList.add('user-password')
    userPassword.textContent = 'Пароль: '+ obj.password
    console.log(id, userNameHolder, userSurnameHolder, userEmailHolder, userPassword, userSession)
    
    hidenContainer.append(id, userNameHolder, userSurnameHolder, userEmailHolder, userPassword, userSession)
    
    let updateButton = document.createElement('div')
    updateButton.classList.add('update-btn')
    updateButton.textContent = 'Сохранить'
    updateButton.addEventListener('click', ()=>{
        updateUser({id:id.textContent, userName: userNameInput.value, userSurname: userSurnameInput.value, userEmail: emailInput.value})
    })
    hidenContainer.append(updateButton)
    mainContainer.append(hidenContainer)
    deleteBtn.addEventListener('click', (event)=>{
        deleteUser(id.textContent)
        event.target.closest('.user-container').remove()
    })
    return mainContainer
}