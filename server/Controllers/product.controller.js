const db = require('../Database/db.js');

class ProductController{
    async createProduct(req, res){
        const {name, description, images, price, filters} = req.body;
        const newProduct = await db.query(`INSERT INTO product_table (name, description, image, price, filters)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, description, images, price, filters]);
        res.json(newProduct.rows[0]);
        console.log("created");
        console.log(newProduct);
    }
    async getAllProducts(req, res){
        const products = await db.query(`SELECT id, name, description, image, price, filters FROM product_table order by price desc `);
        res.json(products.rows);
    }
    async getOneProduct(req, res){
        
        let regularId = req.params.id.replace(/\D/g, '')
        console.log(regularId);
        const product = await db.query(`select * from 
             product_table, 
             general_characteristics,
             decoration,
             furniture,
             insulation,
             security,
             tightness,
             usability
         where
                product_table.id = $1 and 
                general_characteristics.id = product_table.id and 
                decoration.id = product_table.decoration_id and
                furniture.id = product_table.furniture_id and
                insulation.id = product_table.insulation_id and
                security.id = product_table.security_id and
                tightness.id = product_table.tightness_id and
                usability.id = product_table.usability_id`,
            [regularId]);
        res.json(product.rows);
    }
    async updateProduct(req, res){
        const {id, name, description, images, price, filters} = req.body;
        const updatedProduct = await db.query(`UPDATE product_table SET name = $1, description =$2, price=$3,
        image = $4, filters = $5 WHERE id = $6`, [name, description, price, images, filters, id]);
        res.json(updatedProduct.rows);
    }
    
    async deleteProduct(req, res){
        const deleteProduct = await db.query(`DELETE FROM product_table WHERE id = $1`, [req.params.id]);
        res.json(deleteProduct.rows);
    }
}

module.exports = new ProductController();