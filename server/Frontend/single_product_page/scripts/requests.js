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