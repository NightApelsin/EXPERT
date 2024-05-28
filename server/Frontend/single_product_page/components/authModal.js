

export async function openAuthModal() {
    $('#auth-modal').dialog({
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
        }
    })

    $('#login-btn').click(async () => {

        const emailPlaceholder = document.querySelector('#email-placeholder')
        const passwordPlaceholder = document.querySelector('#password-placeholder')

        if (emailPlaceholder.value !== '' && emailPlaceholder.value.includes('@') && passwordPlaceholder.value.length > 6) {
            try {
                let getCode = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        'userEmail': emailPlaceholder.value,
                        'userPassword': passwordPlaceholder.value,

                    }),
                })
                if (!getCode.ok) {
                    document.querySelector('#auth-modal .content').classList.remove('open')
                    document.querySelector('#auth-modal .access-denied').classList.add('open')
                } else {
                    document.querySelector('#auth-modal .content').classList.remove('open')
                    document.querySelector('#auth-modal .auth-access-pin').classList.add('open')
                    try {
                        await fetch('/api/SMTP/getVerificationCode', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({email: emailPlaceholder.value, state: 'login'})
                        })
                    } catch (e) {
                        console.error(e)
                    }
                }
            } catch (e) {
                document.querySelector('#auth-modal .content').classList.remove('open')
                document.querySelector('#auth-modal .access-denied').classList.add('open')
                document.querySelector('#auth-modal .access-denied .title span:last-child').textContent = e.message
            }
        }
    })
    $('#accessBtn').click(async () => {
        const isRemember = document.querySelector('#remember-me-placeholder')
        let verifyFetch = await fetch('/api/verifyAccess', {
            method: 'POST',
            body: JSON.stringify({
                code: document.querySelector('#pin-placeholder').value,
                hash: getCookie('sha'),
                isRemember: !!(isRemember.checked)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (verifyFetch.ok) {
            document.querySelector('.auth-access-pin').classList.remove('open')
            document.querySelector('.access-granted').classList.add('open')
        } else {
            document.querySelector('.auth-access-pin').classList.remove('open')
            document.querySelector('.access-denied').classList.add('open')
        }
    })
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}