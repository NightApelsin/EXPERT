/**
 * Создаёт визуальный элемент фильтра
 * под списком фильтров 
 * 
 * @param {string} filter_name
 * @param {Element} endpointBox
 * @param {Object} inputElement
 * 
 **/
function DynamicFiltersController(filter_name, endpointBox, inputElement){
    
    if(endpointBox.querySelector(`[id="${filter_name}"]`)) {
        endpointBox.querySelector(`[id="${filter_name}"]`).remove();
        
    }
    else{
        let item = document.createElement('div');
        item.id = filter_name;
        item.classList.add('dynamic-filter-holder')
        

        let filterName = document.createElement('div');
        filterName.classList.add('dynamic-filter-name')
        
        
        let clearIcon = document.createElement('div');
        clearIcon.addEventListener('click', () => {
            inputElement.checked = false;
            var event = new Event('change');
            inputElement.dispatchEvent(event);
            item.remove()
        })

        filterName.innerText = filter_name;
        clearIcon.innerHTML = '<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '  <g clip-path="url(#clip0_744_14336)">\n' +
            '    <path d="M6.66295 6.4995L11.8627 11.6993C12.0458 11.8824 12.0458 12.1792 11.8627 12.3622C11.6796 12.5453 11.3828 12.5453 11.1998 12.3622L5.99999 7.16242L0.800231 12.3622C0.617161 12.5453 0.320349 12.5453 0.137302 12.3622C-0.0457441 12.1791 -0.0457675 11.8823 0.137302 11.6993L5.33707 6.49952L0.137302 1.29973C-0.0457675 1.11666 -0.0457675 0.81985 0.137302 0.636804C0.228826 0.54528 0.348802 0.499531 0.468778 0.499531C0.588755 0.499531 0.708708 0.54528 0.800254 0.636804L5.99999 5.83657L11.1998 0.636804C11.2913 0.54528 11.4113 0.499531 11.5312 0.499531C11.6512 0.499531 11.7712 0.54528 11.8627 0.636804C12.0458 0.819874 12.0458 1.11669 11.8627 1.29973L6.66295 6.4995Z" fill="#727272" />\n' +
            '  </g>\n' +
            '  <defs>\n' +
            '    <clipPath id="clip0_744_14336">\n' +
            '      <rect width="12" height="12" fill="white" transform="matrix(1 0 0 -1 0 12.5)" />\n' +
            '    </clipPath>\n' +
            '  </defs>\n' +
            '</svg>'

        item.append(filterName, clearIcon)
        endpointBox.prepend(item)
        console.log(filterName)
    }
    
}
/**
 * Создаёт визуальный элемент фильтра
 * под списком фильтров
 *
 * @param {string} filter_name
 * @param {Element} endpointBox
 * @param {Object} inputElement
 * @param {NodeList} inputCheckboxes
 *
 **/
export function creationFiltersElements(filter_name, endpointBox, inputElement, inputCheckboxes) {
    if (!endpointBox.hasChildNodes()) {
        
        let deleteItem = document.createElement('div')

        deleteItem.id = "delete";
        deleteItem.classList.add('delete-all-filters')


        let filterName = document.createElement('div');
        filterName.classList.add('dynamic-filter-name')


        let clearIcon = document.createElement('div');
        
        
        clearIcon.addEventListener('click', () => {
            for (let i = 0; i <inputCheckboxes.length; i++){
                 inputCheckboxes[i].checked = false;
                var event = new Event('change');
                inputElement.dispatchEvent(event);
            }
            endpointBox.innerHTML = '';
            deleteItem.remove()
        })

        filterName.innerText = 'Убрать все фильтры';
        clearIcon.innerHTML = '<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '  <g clip-path="url(#clip0_744_14336)">\n' +
            '    <path d="M6.66295 6.4995L11.8627 11.6993C12.0458 11.8824 12.0458 12.1792 11.8627 12.3622C11.6796 12.5453 11.3828 12.5453 11.1998 12.3622L5.99999 7.16242L0.800231 12.3622C0.617161 12.5453 0.320349 12.5453 0.137302 12.3622C-0.0457441 12.1791 -0.0457675 11.8823 0.137302 11.6993L5.33707 6.49952L0.137302 1.29973C-0.0457675 1.11666 -0.0457675 0.81985 0.137302 0.636804C0.228826 0.54528 0.348802 0.499531 0.468778 0.499531C0.588755 0.499531 0.708708 0.54528 0.800254 0.636804L5.99999 5.83657L11.1998 0.636804C11.2913 0.54528 11.4113 0.499531 11.5312 0.499531C11.6512 0.499531 11.7712 0.54528 11.8627 0.636804C12.0458 0.819874 12.0458 1.11669 11.8627 1.29973L6.66295 6.4995Z" fill="#727272" />\n' +
            '  </g>\n' +
            '  <defs>\n' +
            '    <clipPath id="clip0_744_14336">\n' +
            '      <rect width="12" height="12" fill="white" transform="matrix(1 0 0 -1 0 12.5)" />\n' +
            '    </clipPath>\n' +
            '  </defs>\n' +
            '</svg>'

        deleteItem.append(filterName, clearIcon)
        endpointBox.append(deleteItem)
        DynamicFiltersController(filter_name, endpointBox, inputElement)
    }
    else {
        DynamicFiltersController(filter_name, endpointBox, inputElement)
    }
}