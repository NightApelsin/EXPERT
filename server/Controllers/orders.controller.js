const db = require('../Database/db.js')
const sessionDb = require('../Database/db_sessionStorage.js')
class OrdersController{
    
    async createOrder(req,res){
        let orderedProducts = req.body
        let notModSess = req.cookies['connect.sid']
        let matchSessionSid = new RegExp('s:([\\s\\S]*)\\.[\\s\\S]').exec(notModSess)
        
        try{
            let session = await sessionDb.query('select * from sessions where sid = $1',[matchSessionSid[1]])
            let user = await db.query('select * from users where email = $1',[session.rows[0].sess.userEmail])
            await db.query('insert into orders (user_id, ordered_products)  values ($1,$2)',[user.rows[0].id, orderedProducts])
            res.send(200)
        }catch(e){
            res.send(e.message)
        }
    }
    
}

module.exports = new OrdersController()