const crypto = require('crypto');
const db = require('../Database/db.js')
class AccessVerification{
    verifyEmailCode(req, res){
        let code = req.body.code;
        let hash = req.body.hash;
        let hashedCode = crypto.createHash('sha256').update(code).digest('hex');
        if(hashedCode===hash){
            res.sendStatus(200)
        }
        else{
            res.sendStatus(403)
        }
    }
    login(req,res){
        try{
            let {userEmail, userPassword} = req.body
            try {
                const user = db.query("SELECT * FROM users WHERE email = ($1)", [userEmail])
                let hashedPassword = crypto.createHash('sha256').update(userPassword).digest('hex');
                if (hashedPassword === user.password) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(403)
                }
            } catch (err){
                res.sendStatus(520)
            }
            
        } catch(err){
            res.sendStatus(400)
        }
    }
    createUser(req,res) {
        
    }
}

module.exports = new AccessVerification()