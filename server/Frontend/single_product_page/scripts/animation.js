function soHardMenuTopBarSwitch(event, tabId) {
    let tablinks = document.getElementsByClassName("btn-primary");

    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    event.target.classList.toggle('active')

    let tabs = document.getElementsByClassName("hard-item");
    for (let i = 0; i < tabs.length; i++){
        tabs[i].className = tabs[i].className.replace(" hard-active", "");
    }
    document.querySelector(`${tabId}`).classList.toggle('hard-active');
}
function subHardMenuSwitcher(primBtn, tabId){
    let tablinks = document.getElementsByClassName("param-category-link");

    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
        document.querySelector(`#${primBtn}`).classList.toggle('active')

    let tabs = document.getElementsByClassName("param-category-display");
    for (let i = 0; i < tabs.length; i++){
        tabs[i].className = tabs[i].className.replace(" active", "");
    }
    document.querySelector(`#${tabId}`).classList.toggle('active');
}

$(document).ready(()=>{
    $('.burger-button').click(function(event) {
        $('.burger-button, .burger-list-container').toggleClass('active');
        console.log('open')
    })
    $('.burger-list-container .close').click(function(event) {
        $('.burger-list-container, .burger-button').removeClass('active');
    })
    $('#burger-menu-show-btn').click((event)=>{
        $('.accordion-list-items').toggleClass('active');
    })
    
})
async function addFetch(){
    if
    (document.querySelector(`input[placeholder='Телефон']`).classList.contains('error') ||
        document.querySelector(`input[placeholder='Телефон']`).value.length !== 12)
    {
        console.log('wrong argument')
    }
    else
    {

        let formData = {phoneNumber: document.querySelector(`input[placeholder='Телефон']`).value}
        console.log(formData)
        try {
            let response = await fetch('/api/addPersonOnConsultQueue/', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                console.log('something failed')
            } else {
                document.querySelector('#complete').classList.add('enabled')
                document.querySelector('.ui-resizable-handle.ui-resizable-s').classList.add('width-0');
                setTimeout(() => {
                    document.querySelector('#complete').classList.remove('enabled')
                    document.querySelector('.ui-resizable-handle.ui-resizable-s').classList.remove('width-0');
                    $('#myModal').dialog('close')
                }, 5000)
            }

        } catch (e) {
            console.error('There has been a problem with your fetch operation:', e);
        }
        return

    }
}