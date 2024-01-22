//CART MANAGER
import { cartModel } from "./models/cart.model.js";

class CartManager {
  constructor() {
    this.model = cartModel;
  }

  async addCart() {
    try {
      console.log("addCart");
      return await this.model.create({});
    } catch (err) {
      throw err;
    }
  }

  async getCarts() {
    try {
      return await this.model.find();
    } catch (err) {
      throw err;
    }
  }

  async getCartById(id) {
    try {
      return await this.model.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async updateCartItem(id, updatedFields) {
    try {
      return await this.model.findByIdAndUpdate(id, updatedFields, {
        new: true,
      });
    } catch (err) {
      throw err;
    }
  }

  async addProduct(cartId, productId, quantity) {
    try {
      let cart = await this.model.findById(cartId);

      if (!cart) {
        cart = new this.model({ items: [] });
      }

      let cartProduct = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (cartProduct) {
        cartProduct.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
      console.log("Producto agregado al carrito");
    } catch (error) {
      console.error("Hubo un error al agregar el producto al carrito:", error);
      throw error;
    }
  }

  async deleteCartProduct(cartId, productId) {
    try {
      let cart = await this.model.findById(cartId);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );

      await cart.save();
      console.log("Producto eliminado del carrito");
    } catch (error) {
      console.error(
        "Hubo un error al eliminar el producto del carrito:",
        error
      );
      throw error;
    }
  }

  async deleteCart(cartId) {
    try {
      const cart = await this.model.findByIdAndDelete(cartId);
      if (!cart) {
        console.log("Carrito no encontrado");
        throw new Error("Carrito no encontrado");
      }
      console.log("Carrito eliminado con éxito");
    } catch (error) {
      console.error("Hubo un error al eliminar el carrito:", error);
      throw error;
    }
  }
}

export { CartManager };
