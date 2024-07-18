export async function createCommentComponent(obj) {
    let userFetch = await fetch('/api/getUserById',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({id:obj.user_id})
    })
    let user = await userFetch.json()
    let mainContainer = document.createElement('div');
    mainContainer.classList.add('comment-container');

    let userInformation = document.createElement('div');
    userInformation.classList.add('user-info');
    
    let userName = document.createElement('span');
    userName.classList.add('user-name');
    userName.textContent = user.name + ' ' + user.surname;
    
    let userAvatarHolder = document.createElement('div');
    userAvatarHolder.classList.add('comment-avatar-holder')

    let userAvatarImg = document.createElement('img')
    userAvatarImg.src = `https://api.multiavatar.com/${encodeURIComponent(user.name+" "+user.surname)}.svg`
    
    userAvatarHolder.append(userAvatarImg)
    userInformation.append(userAvatarHolder, userName)
    
    let commentText = document.createElement('span')
    commentText.classList.add('comment-text')
    commentText.textContent = obj.comment_text
    
    let commentGrade = document.createElement('span')
    commentGrade.classList.add('comment-grade')
    commentGrade.textContent = obj.grade + " из 10"
    
    mainContainer.append(userInformation, commentText, commentGrade)
    return mainContainer
}

