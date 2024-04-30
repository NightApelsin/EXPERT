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