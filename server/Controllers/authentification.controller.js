const crypto = require('crypto');
const db = require('../Database/db.js')
class AuthentificationController{
    
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
    async login(req,res){
        try{
            let {userEmail, userPassword} = req.body
            try {
                if(!await AuthentificationController.findUser(userEmail)){
                    res.sendStatus(403)
                }
                else {
                    const user = await db.query("SELECT * FROM users WHERE email = ($1)", [userEmail])
                    let hashedPassword = crypto.createHash('sha256').update(userPassword).digest('hex');
                    if (hashedPassword === user.rows[0].password) {
                        req.sessionStorage.isAuthenticated = true
                        res.sendStatus(200)
                    } else {
                        res.sendStatus(403)
                    }
                }
            } catch (err){
                res.sendStatus(520)
                console.log(err)
            }
            
        } catch(err){
            res.sendStatus(400)
        }
    }
    async createUser(req,res) {
        let {email,password,name,surname} = req.body;
        let hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        try{
            
            if(await AuthentificationController.findUser(email)){
                res.sendStatus(409)
            }else {
                await db.query('INSERT INTO users (email,password,name,surname) values ($1,$2,$3,$4) returning *', [email, hashedPassword, name, surname])
                res.sendStatus(200)
            }
        }catch (err){
            console.log(err)
        }
    }
    static async findUser(email){
        let user = await db.query('SELECT email from users where email = $1',[email])
        return user.rows.length > 0
    }
    async findUser(email){
        let user = await db.query('SELECT email from users where email = $1',[email])
        return user.rows.length > 0
    }
    
}

module.exports = new AuthentificationController()