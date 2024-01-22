//PRODUCT MANAGER
import { productModel } from "./models/product.model.js";

class ProductManager {
  constructor() {
    this.model = productModel;
  }

  async addProduct(product) {
    try {
      return await this.model.create(product);
    } catch (err) {
      throw err;
    }
  }

  async getProducts() {
    try {
      return await this.model.find();
    } catch (err) {
      throw err;
    }
  }

  async getProductById(id) {
    try {
      return await this.model.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async updateProduct(id, product) {
    try {
      return await this.model.findByIdAndUpdate(id, product, { new: true });
    } catch (err) {
      throw err;
    }
  }

  async deleteProduct(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }

  async deleteProductByCode(code) {
    try {
      return await this.model.deleteOne({ code: code });
    } catch (err) {
      throw err;
    }
  }
}

export { ProductManager };
