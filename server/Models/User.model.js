const db = require("../Database/db");

class User{
    async getUser(req,res){
        console.log(req)
        try{
            let notModSess = req.cookies['connect.sid']
            let matchSessionSid = new RegExp('s:([\\s\\S]*)\\.[\\s\\S]').exec(notModSess)
            let user = await db.query('SELECT * from users where session = $1',[matchSessionSid[1]])
            try {
                res.send(user.rows)
            } catch (e) {
                return user.rows
            }
        }catch (err){
            console.log(err)
            res.send(err.message)
        }
        
    }
    async getUserById(req,res){
        console.log(req)
        try {
            let userId = req.body.id
            let user = await db.query("SELECT * FROM users WHERE id = $1", [userId])
            res.send(user.rows[0])
        }catch (err){
            res.status(500).send(err.message)
        }
    }
    
    async findUser(email){
        
        let user = await db.query('SELECT email from users where email = $1',[email])
        return user.rows.length > 0
    }
    
}
module.exports = new User




