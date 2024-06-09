const User = require("../Models/User.model");
const db = require("../Database/db");


class CommentsController{
    async getProductComments(req,res){
        console.log(req)
        try{
            let regularId = req.params.id.replace(/\D/g, '')
            let result = await db.query(`SELECT * FROM comments WHERE doors_id = $1`, [regularId])
            res.status(200).send(result.rows)
        }catch (err){
            res.status(500).send(err.message)
        }
    }
    
    async addComment(req,res){
        console.log(req)
        try {
            let requestBody = req.body
            let user = await User.getUser(req)
            console.log(user)
            console.log(requestBody)
            let comment = await db.query('INSERT INTO comments (user_id, grade, comment_text, doors_id) values ($1, $2, $3, $4)',
                [user[0].id, requestBody.grade, requestBody.textMessage, requestBody.doors_id])
            res.status(200).send('ok')
        }catch(err) {
            console.log(err)
            res.status(500).send(err.message)
        }
    }
}
module.exports = new CommentsController