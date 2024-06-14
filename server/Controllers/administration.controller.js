let dbSess = require('../Database/db_sessionStorage.js')
let db = require('../Database/db.js')
let crypto = require('crypto')
class administrationController{
    async logIn(req,res){
        
        try{
            let administrator = await dbSess.query('select * from administration_table where login = $1', [req.body.login])
            if(administrator.rows.length < 1){
                res.status(403).send('wrong login or password')
            }else{
                let passHash = crypto.createHash('sha256').update(req.body.password).digest('hex')
                if(passHash === administrator.rows[0].password){
                    console.log('aa')
                    try {
                        let re = await dbSess.query('UPDATE administration_table SET session_id = $1 where login = $2', 
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
            
            let result = await dbSess.query('SELECT * FROM administration_table where session_id =$1',
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
    async getAllProfiles(req,res){
        try{
            let result = await db.query('SELECT * FROM users')
            res.send(result.rows)
        }catch (e){
            
        }
    }
    async updateUser(req,res){
        let userData = req.body
        try{
            
            let update = await db.query('UPDATE users SET name=$1, surname=$2, email=$3 where id=$4', 
                [userData.userName, userData.userSurname, userData.userEmail, userData.id])
            res.send(200)
        }catch (e){
            console.log(e)
            res.status(502).send(e)
        }
    }
    async deleteUser(req, res){
        let userId = req.body.id
        try{
            let resultComm = await db.query(`DELETE FROM comments WHERE user_id = $1;`, [userId])
            let resultOrder = await db.query(`DELETE FROM orders where user_id = $1;`, [userId])
            let resultUser = await db.query(`DELETE FROM users where id=$1`, [userId])
            res.send(200)
        }catch (e){
            res.status(502).send(e.message)
        }
    }
    async getAllProducts(req,res){
        try{
            let products = await db.query(`SELECT * FROM product_table`)
            res.send(products.rows)
        }catch (e){
            res.status(500).send(e)
        }
    }
    async getProductParameters(req,res){
        let productId = req.body.id
        try{
            let result = []
            let mainParameters = await db.query(`SELECT * FROM general_characteristics where id = $1`, [productId])
            let decoration = await db.query(`SELECT * FROM decoration where id = $1`, [productId])
            let furniture = await db.query(`SELECT * FROM furniture where id = $1`, [productId])
            let insulation = await db.query(`SELECT * FROM insulation where id = $1`, [productId])
            let security = await db.query(`SELECT * FROM security where id = $1`, [productId])
            let tightness = await db.query(`SELECT * FROM tightness where id = $1`, [productId])
            let usability = await db.query(`SELECT * FROM usability where id = $1`, [productId])
            result = [mainParameters, decoration, tightness, usability, furniture, insulation, security]
            res.send(result)
        }catch (e){
            res.status(502).send(e)
        }
    }
}

module.exports = new administrationController()