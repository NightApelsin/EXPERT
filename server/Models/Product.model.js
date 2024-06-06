const db = require("../Database/db");

class Product {
    async getAllProducts(req, res) {
        const products = await db.query(`SELECT id, name, description, image, price, filters
                                         FROM product_table
                                         order by price desc `);
        res.json(products.rows);
    }

    async getOneProduct(req, res) {

        let regularId = req.params.id.replace(/\D/g, '')
        console.log(regularId);
        const product = await db.query(`select *
                                        from product_table,
                                             general_characteristics,
                                             decoration,
                                             furniture,
                                             insulation,
                                             security,
                                             tightness,
                                             usability
                                        where product_table.id = $1
                                          and general_characteristics.id = product_table.id
                                          and decoration.id = product_table.decoration_id
                                          and furniture.id = product_table.furniture_id
                                          and insulation.id = product_table.insulation_id
                                          and security.id = product_table.security_id
                                          and tightness.id = product_table.tightness_id
                                          and usability.id = product_table.usability_id`,
            [regularId]);
        res.json(product.rows);
    }
}
module.exports = new Product