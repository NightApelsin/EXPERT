const db = require("../Database/db");
const User = require("../Models/User.model.js")
class Order {
    async getAllOrders(req, res) {
        console.log(req)
        try {
            let user = await User.getUser(req)
            
            console.log(user)
            let orders = await db.query('select * from orders where orders.user_id = $1', [user[0].id])
            console.log(orders.rows)
            res.status(200).send(orders.rows)

        } catch (e) {   
            console.log(e)
            res.status(502).send('something went wrong')
        }
    }
}

module.exports = new Order