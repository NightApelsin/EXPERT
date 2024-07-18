import {creationFiltersElements,} from "../components/filter-item.js";

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
    $('#filters-accordion').accordion({
        heightStyle: 'content',
        active: true,
        collapsible: true,
    })
    
    $('.filter-drop-down-btn-holder').click((event)=>{
        let a = document.getElementsByClassName('filter-drop-down')[0]
        console.log(a)
        a.style.top = '0';
        this.display = 'none'
    })
    $('#filter-close-icon').click((event)=>{
        let a = document.getElementsByClassName('filter-drop-down')[0];
        a.style.top = '-250vw'
    })
    $('#for-home').click((event)=>{
        $('#for-home').addClass('active')
        $('#for-flat').removeClass('active')
        document.getElementById('bread-str').innerText = 'Двери в Дом'
    })
    $('#for-flat').click((event)=>{
        $('#for-flat').addClass('active')
        $('#for-home').removeClass('active')
        document.getElementById('bread-str').innerText = 'Двери в Квартиру'
    })

    replaceAccordion()
    
    let FilterHoldersItemList = document.querySelectorAll('#filters-accordion .ui-accordion .container')
    let activityFiltersHolder = document.querySelector('#activity-filters')
    let allCheckboxes = document.querySelectorAll('#filters-accordion .ui-accordion .container label input[type="checkbox"]')
    
    for (let i= 0; i < FilterHoldersItemList.length; i++){
        let FilterItemListNames = FilterHoldersItemList.item(i).querySelectorAll('.filter.info')
        let FilterItemInputs = FilterHoldersItemList.item(i).querySelectorAll('label input')
        
        
        
        
        for (let j= 0; j < FilterItemInputs.length; j++) {
            FilterItemInputs.item(j).addEventListener('click', ()=>{
                creationFiltersElements(FilterItemListNames.item(j).innerText, activityFiltersHolder, FilterItemInputs.item(j), allCheckboxes)
            })
        }
    }
    
    if(window.matchMedia('screen and (min-width:769px)').matches){
        document.getElementsByClassName('')
    }
    
    
})

function replaceAccordion(){
    let accordion = document.getElementById('filters-accordion')
    let text = accordion.innerHTML
    
    const pattern = /<h3/g;

    let matches;
    
    let indexes = []

    while (matches = pattern.exec(text)) {

        indexes.push(matches.index)

    }
    let output = text.slice(0, indexes[0]-1)+'<div id="hi-width-block">'+text.slice(indexes[0], indexes[1]-1)+
    '</div><div id="hi-width-block">'+text.slice(indexes[1], indexes[2]-1)+'</div><div id="hi-width-block">'+
        text.slice(indexes[2], indexes[text.length-1]) + '</div>'
    
    accordion.innerHTML = ""
       accordion.innerHTML = output
    let blocks = document.querySelectorAll('#hi-width-block')
    blocks.forEach((elem)=>{
        $(elem).accordion({
            heightStyle: 'content',
            active: true,
            collapsible: true
        })
    })
}
