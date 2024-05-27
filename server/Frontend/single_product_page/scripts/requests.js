export async function getSingleProduct(id){
    try{
        const response = await fetch(`/api/catalog/${id}`,{
            method: 'GET'
        })
        if(!response.ok){
            throw new Error("Network ERROR" + response.status)
        }
        const result = await response.json();
        console.log(result)
        return result
    }catch (error){
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function createHistoryCookie(){
    const response = await fetch('/api/cookie/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({path: new Array(window.location.pathname.toString())})
        }
    )
    const result = await response.text();
    console.log(result)
}

export function addToCart(product){
    if(getCookie('productsCart')){
        let cart = JSON.parse(getCookie('productsCart'));
        cart.doorsId.push(product.id)
        console.log(cart)
        document.cookie = `productsCart=${JSON.stringify(cart)};path=/;expires='${new Date(Date.now() + 30 * 24* 60 * 60 * 1000)}';`
    }else {

        document.cookie = `productsCart={"doorsId":[${product.id}],"optionalProducts":{"locks":[],"videoSecurity":[],"handles":[],"armorShield":[]}};path=/; expires='${new Date(Date.now() + 30 * 24* 60 * 60 * 1000)}';`
        let cartIcon = document.querySelector('#cart-indicator')
        cartIcon.classList.add('full')
    }
}

export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}