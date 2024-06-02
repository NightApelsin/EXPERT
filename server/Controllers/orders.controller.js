const db = require('../Database/db.js')
const sessionDb = require('../Database/db_sessionStorage.js')
class OrdersController{
    

    static async getUser(req, res) {
        let notModSess = req.cookies['connect.sid']
        let matchSessionSid = new RegExp('s:([\\s\\S]*)\\.[\\s\\S]').exec(notModSess)
        try {
            let session = await sessionDb.query('select * from sessions where sid = $1', [matchSessionSid[1]])
            let result = await db.query('select * from users where email = $1', [session.rows[0].sess.userEmail]) 
            return result.rows[0]
        } catch (e) {
            res.status(502).send('some error')
        }
    }
    
    async createOrder(req,res){
        let orderedProducts = req.body
        try{
            let user = await OrdersController.getUser(req, res)
            
            try {
                await db.query('insert into orders (user_id, ordered_products, time_of_creation, total_price)  values ($1,$2, $3, $4)',
                    [user.id, {"orderedProducts":orderedProducts.addedProducts}, new Date(Date.now()), orderedProducts.totalPrice])
            }catch (e){
                console.log(e)
            }
            res.send(200)
        }catch(e){
            console.log(e)
            res.status(403).send(e)
        }
    }
    
    async getAllOrders(req,res){
        let user = await OrdersController.getUser(req,res);
        try{
            let orders = await db.query('select * from orders where orders.user_id = $1', [user.id])
            
            res.send(orders.rows)
            
        }catch (e){
            res.status(502).send('something went wrong')
        }
    }
    
}

module.exports = new OrdersController()