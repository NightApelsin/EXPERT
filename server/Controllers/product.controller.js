const db = require('../Database/db.js');

class ProductController{
    async createProduct(req, res){
        const {name, description, images, price, filters} = req.body;
        const newProduct = await db.query(`INSERT INTO product_table (name, description, images, price, filters)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, description, images, price, filters]);
        res.json(newProduct.rows[0]);
        console.log("created");
        console.log(newProduct);
    }
    async getAllProducts(req, res){
        const products = await db.query(`SELECT id, name, description, image, price, filters FROM product_table order by id`);
        res.json(products.rows);
    }
    async getOneProduct(req, res){
        const product = await db.query(`SELECT * FROM product_table where id = $1`, [req.params.id]);
        res.json(product.rows);
    }
    async updateProduct(req, res){
        const {id, name, description, images, price, filters} = req.body;
        const updatedProduct = await db.query(`UPDATE product SET name = $1, description =$2, price=$3
        images = $4, filters = $5 WHERE id = $6`, [name, description, price, images, filters, id]);
        res.json(updatedProduct.rows[0]);
    }
    
    async deleteProduct(req, res){
        const deleteProduct = await db.query(`DELETE FROM product_table WHERE id = $1`, [req.params.id]);
        res.json(deleteProduct.rows);
    }
}

module.exports = new ProductController();