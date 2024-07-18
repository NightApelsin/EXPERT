const db = require('../Database/db.js')
const User = require('../Models/User.model.js')

class OrdersController{
    
    
    async createOrder(req,res){
        console.log(req)
        let orderedProducts = req.body
        try{
            let user = await User.getUser(req)
            
            try {
                await db.query('insert into orders (user_id, ordered_products, time_of_creation, total_price)  values ($1,$2, $3, $4)',
                    [user[0].id, JSON.stringify(orderedProducts.addedProducts), new Date(Date.now()), orderedProducts.totalPrice])
            }catch (e){
                console.log(e)
            }
            res.send(200)
        }catch(e){
            console.log(e)
            res.status(403).send(e)
        }
    }
    
    
    
}

module.exports = new OrdersController()