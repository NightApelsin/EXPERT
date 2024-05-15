const db = require('../Database/db.js');

class ConsultQ {
    async addConsulQ(req, res) {
        const phone = req.body
        let cookies = req.cookies.historyPath || {path: []};
        try{
            await db.query('insert into qforconsultation ("clientPhone", "clientCookie") values ($1, $2) returning *',
                [phone.phoneNumber, cookies])
            
        }catch (e){
            res.sendStatus(400)
        }
        res.sendStatus(200)
    }
}
module.exports = new ConsultQ()