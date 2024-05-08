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
