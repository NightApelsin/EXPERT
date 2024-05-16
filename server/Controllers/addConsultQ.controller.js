const db = require('../Database/db.js');

class ConsultQ {
    async addConsulQ(req, res) {
        const phone = req.body
        let cookies = req.cookies.historyPath || {path: []};
        let time = new Date()
        console.log(time)
        try{
            await db.query('insert into qforconsultation ("clientPhone", "clientCookie", date_registration, status) values ($1, $2, $3, $4) returning *',
                [phone.phoneNumber, cookies, time, 'unchecked'])
            
        }catch (e){
            res.sendStatus(400)
        }
        res.sendStatus(200)
        
    }
    
}
module.exports = new ConsultQ()