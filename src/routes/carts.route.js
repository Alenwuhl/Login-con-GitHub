import { Router } from "express";
import { CartManager } from "../daos/cartManager.js";
import { ProductManager } from "../daos/ProductManager.js";

const router = Router();
const cartManager = new CartManager("mongodb://localhost:27017");
const productManager = new ProductManager("mongodb://localhost:27017");

router.get("/", async (req, res) => {
    const carts = await cartManager.getCarts()

    try {
        res.json(carts);

    } catch (error) {
        console.error("Hubo un error al devolver los carritos", error);
        res.status(500).send("Hubo un error al devolver los carritos");
    }
})

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const products = await cartManager.getCartById(cid);
    res.json(products);
  } catch (error) {
    console.error("Hubo un error al devolver los carritos", error);
    res.status(500).send("Hubo un error al devolver los carritos");
  }
});

router.post("/", async (req, res) => {
    try{
        const cart = await cartManager.addCart();
        console.log(cart)
        res.json({
            cart
        })
        return;
    } catch (error){
        console.log("Hubo un error al agregar el carrito");
        res.status(500).send(`Hubo un error al agregar el carrito`)
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const product = await productManager.getProductById(pid);
    if (!product) {
      return res.status(404).send(`El producto con ID ${pid} no existe.`);
    }
  } catch (error) {
    console.error(
      "Hubo un error al devolver los productos a través del ID",
      error
    );
    return res
      .status(500)
      .send(`Hubo un error al devolver los productos a través del ID: ${pid}`);
  }

  try {
    const { quantity } = req.body;

    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res
        .status(400)
        .send(`La cantidad debe ser un número entero positivo.`);
    }

    await cartManager.addProduct(cid, pid, parsedQuantity);

    res.json(cartManager);
  } catch (error) {
    console.error("Hubo un error al agregar el producto al carrito", error);
    res.status(500).send("Hubo un error al agregar el producto al carrito");
  }
});

router.delete("/cart/:cartId/product/:productId", async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    await cartManager.deleteCartProduct(cartId, productId);

    res.status(200).send("Producto eliminado del carrito");
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

router.delete("/cart/:cartId", async (req, res) => {
    try {
      const { cartId } = req.params;
  
      await cartManager.deleteCart(cartId);
  
      res.status(200).send("Carrito eliminado");
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  });

export default router;
