const db = require("../Database/db");

class User{
    async getUser(req,res){
        try{
            let notModSess = req.cookies['connect.sid']
            let matchSessionSid = new RegExp('s:([\\s\\S]*)\\.[\\s\\S]').exec(notModSess)
            let user = await db.query('SELECT * from users where session = $1',[matchSessionSid[1]])
            res.send(user.rows)
        }catch (err){
            res.send(err.message)
        }
        
    }
    async findUser(email){
        let user = await db.query('SELECT email from users where email = $1',[email])
        return user.rows.length > 0
    }
}
module.exports = new User