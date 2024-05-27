const crypto = require('crypto');
const db = require('../Database/db.js')
const {httpOnly} = require("express-session/session/cookie");

class AuthentificationController{
    
    async isRememberMe(req, res) {
        
        let result = await db.query('select * from users where session = $1', [new RegExp('s:([\\s\\S]*)\\.[\\s\\S]').exec(req.cookies['connect.sid'])[1]])
        console.log(result.rowCount)
        if(result.rowCount>0) {
            res.sendStatus(200)
        }else{
            res.sendStatus(404)
        }
    }
    verifyEmailCode(req, res){
        let notModSess = req.cookies['connect.sid']
        let matchSessionSid = new RegExp('s:([\\s\\S]*)\\.[\\s\\S]').exec(notModSess)
        let code = req.body.code;
        let hash = req.body.hash;
        let isRemember = req.body.isRemember
        console.log(isRemember)
        let hashedCode = crypto.createHash('sha256').update(code).digest('hex');
        if(hashedCode===hash){
            db.query('update users set session = $1 where users.email = $2', [matchSessionSid[1], req.session.userEmail])
            if(isRemember){
                res.cookie('connect.sid', notModSess, {expires: new Date(Date.now()+ (30*24*60*60*1000)), httpOnly: true, path: '/'})
                
                res.sendStatus(200)
            }else {
                res.sendStatus(200)
            }
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
                        req.session.userEmail = userEmail
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