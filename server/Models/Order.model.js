const db = require("../Database/db");
const User = require("../Models/User.model.js")
class Order {
    async getAllOrders(req, res) {
        let user = await User.getUser(req, res);
        try {
            let orders = await db.query('select * from orders where orders.user_id = $1', [user.id])

            res.send(orders.rows)

        } catch (e) {
            res.status(502).send('something went wrong')
        }
    }
}

module.exports = new Order