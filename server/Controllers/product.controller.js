const db = require('../Database/db.js');
const User = require('../Models/User.model.js')
class ProductController{
    async createProduct(req, res){
        const {name, description, images, price, filters} = req.body;
        const newProduct = await db.query(`INSERT INTO product_table (name, description, image, price, filters)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, description, images, price, filters]);
        res.json(newProduct.rows[0]);
        console.log("created");
        console.log(newProduct);
    }
    
    async updateProduct(req, res){
       
     console.log(req.body) 
     res.sendStatus(200)
       
    }
    
    async deleteProduct(req, res){
        const deleteProduct = await db.query(`DELETE FROM product_table WHERE id = $1`, [req.params.id]);
        res.json(deleteProduct.rows);
    }
    
    async saveMainImage(req, res, next){
        try{
            let fetch = await (await db.query(`select image from product_table where id = $1`, [req.body.id])).rows[0]
            console.log(fetch.image.mainImage)
            fetch.image.mainImage = `/image/${req.file.filename}`
            console.log(fetch.image.mainImage)
            await db.query(`update product_table set image = $1 where id = $2`, [JSON.stringify(fetch.image), req.body.id])
            res.send(JSON.stringify({newName:`/image/${req.file.filename}`}))
        }catch (err){
            res.status(502).send(err.message)
        }
    }
    async saveSourceImage(req, res, next){
        let sourceImages = req.body.images.split(',')
        
        if(sourceImages.length===4) {
            sourceImages.shift()
        }
        sourceImages.push(`/image/${req.file.filename}`)
        try{
            let fetch = await (await db.query(`select image from product_table where id = $1`, [req.body.id])).rows[0]
            fetch.image.sourceImage = sourceImages
            await db.query(`update product_table set image = $1 where id = $2`, [JSON.stringify(fetch.image), req.body.id])
            res.send(JSON.stringify({newSourceImages:sourceImages}))
        }catch (err){
            res.status(500).send(err.message)
        }
    }
}

module.exports = new ProductController();
