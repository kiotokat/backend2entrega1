import { Router } from "express";
import passport from "passport";
import Cart from "../models/Cart.model.js";

const router = Router();

router.post("/", passport.authenticate("current", { session: false }), async (req, res, next) => {
  try {
    const { product_id, quantity } = req.body;
    const newCartItem = await Cart.create({ user_id: req.user._id, product_id, quantity });
    res.json201(newCartItem, "Product added to cart");
  } catch (error) {
    next(error);
  }
});

router.get("/", passport.authenticate("current", { session: false }), async (req, res, next) => {
  try {
    const cartItems = await Cart.find({ user_id: req.user._id }).populate("product_id");
    res.json200(cartItems, "User cart fetched successfully");
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", passport.authenticate("current", { session: false }), async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json200(null, "Producto eliminado del carrito");
  } catch (error) {
    next(error);
  }
});

export default router;