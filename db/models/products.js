const client = require('../client');

async function createProduct({
  prodId,
  brand,
  prodModelName,
  prodDescription,
  prodPrice,
  prodImg,
  prodAttributes,
  reviews,
  inventory


}) {
  try {
    const { rows: [products] } = await client.query(
      `
    INSERT INTO products(prodId, brand, prodModelName, prodDescription, prodPrice, prodImg, prodAttributes, reviews, inventory)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    `, [prodId, brand, prodModelName, prodDescription, prodPrice, prodImg, prodAttributes, reviews, inventory]);

    return products;
  }
  catch (error) {
    console.log(error);
    throw error;

  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(
      `
            SELECT* FROM products
            `);

    return rows;
  }
  catch (error) {
    console.log(error);
    throw error;
  }

}

async function getProductById(prodId) {
  try {
    const { rows: [product] } = await client.query(
      `
        SELECT * FROM products 
        WHERE prodId = $1;
        `,
      [prodId]
    );
    return product;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteProductById(prodId) {
  try {
    const { rows: [deletedProduct] } = await client.query(
      `
        DELETE FROM products
        WHERE prodId = $1
        RETURNING *
        `,
      [prodId]
    );
    return deletedProduct;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateProduct(prodId, fields = {}) {
  // build set string
  const setString = Object.keys(fields).map((key, index) => `${key}=$${index + 1}`).join(', ');

  if (setString.length === 0) {
    return;
  }

  try {
    const values = [...Object.values(fields), prodId]
    const { rows: [product] } = await client.query(`
        UPDATE products
        SET ${setString}
        WHERE prodid = $${values.length}
        RETURNING *;
      `, values)

    return product
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProduct
};