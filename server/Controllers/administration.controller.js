let db = require('../Database/db_sessionStorage.js')
let crypto = require('crypto')
class administrationController{
    async logIn(req,res){
        
        try{
            let administrator = await db.query('select * from administration_table where login = $1', [req.body.login])
            if(administrator.rows.length < 1){
                res.status(403).send('wrong login or password')
            }else{
                let passHash = crypto.createHash('sha256').update(req.body.password).digest('hex')
                if(passHash === administrator.rows[0].password){
                    console.log('aa')
                    try {
                        let re = await db.query('UPDATE administration_table SET session_id = $1 where login = $2', 
                            [new RegExp('s:([\\s\\S]*)\\.[\\s\\S]').exec(req.cookies['connect.sid'])[1], req.body.login])
                    }catch(e){
                        console.log(e)
                    }
                    res.status(200).send('ok!')
                }else{
                    res.status(403).send('wrong login or password')
                }
            }
        }catch (e){
            
        }
        
    }
    async isVerified(req,res){
        try{
            
            let result = await db.query('SELECT * FROM administration_table where session_id =$1',
                [new RegExp('s:([\\s\\S]*)\\.[\\s\\S]').exec(req.cookies['connect.sid'])[1]])
            if(result.rows.length < 1){
                res.sendStatus(502)
            }else{
                res.sendStatus(200)
            }
        }catch (e) {
            console.log(e.message)
            res.sendStatus(502)
        }
    }
}

module.exports = new administrationController()