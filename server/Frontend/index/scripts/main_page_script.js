$(document).ready(function() {
    //nav-bar menu
    $('.burger-button').click(function(event) {
        $('.burger-button, .burger-list-container').toggleClass('active');
    })
    $('.burger-list-container .close').click(function(event) {
        $('.burger-list-container, .burger-button').removeClass('active');
    })
    $('#burger-menu-show-btn').click((event)=>{
        $('.accordion-list-items').toggleClass('active');
    })
    //accordion description
    
    $("#accordion-description").accordion({
        heightStyle: "content",
        icons: { "activeHeader": ".accordion-item-title:after.active" }
    });
    
    $('#anti-srez-sb').click((event)=>{
        $('.anti-srez .text-content').toggleClass("active");
    })
    
    $('#anti-thief-sb').click((event)=>{
        $('.anti-thief .text-content').toggleClass("active");
    })
    $('#more-security-sb').click((event)=>{
        $('.more-security .text-content').toggleClass("active");
    })
    
    
    //РАБОТА С СЕРВЕРОМ
    
})

















































