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
function subHardMenuSwitcher(event, tabId){
    let tablinks = document.getElementsByClassName("param-category-link");

    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    event.target.classList.toggle('active')

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