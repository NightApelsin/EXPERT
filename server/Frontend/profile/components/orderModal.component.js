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
                document.querySelector('#add-order-modal .information.success').classList.add('open');
                document.querySelector('.ui-resizable-handle.ui-resizable-s').classList.add('open');
            }
            else{
                document.querySelector('#add-order-modal .information.failed').classList.add('open');
                document.querySelector('.ui-resizable-handle.ui-resizable-s').classList.add('open');
            }
        }
    })
    
    setTimeout(()=> {
        $('#add-order-modal').dialog('close')
        document.querySelector('#add-order-modal .information.failed').classList.remove('open');
        document.querySelector('#add-order-modal .information.success').classList.remove('open');
        document.querySelector('.ui-resizable-handle.ui-resizable-s').classList.remove('open');
    }, 3000)
}