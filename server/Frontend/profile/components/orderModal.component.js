export function openOrderModal(type){
    $('#add-order-modal').dialog({
        modal: true,
        height: 540,
        width: 600,
        reliable: false,
        draggable: false,
        beforeClose: function (event, ui) {
            document.querySelector('body').style.overflow = 'scroll'
        },
        open: function (event, ui) {
            document.querySelector('body').style.overflow = 'hidden';
            if (type === 'success'){
                document.querySelector('#add-order-modal .information').classList.add('open');
            }
            else{
                document.querySelector('#add-order-modal .information-failed').classList.add('open');
            }
        }
    })
    
    setTimeout(()=> {
        $('#add-order-modal').dialog('close')
    }, 3000)
}