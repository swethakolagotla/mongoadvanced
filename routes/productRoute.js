import express from "express";
import {
  getProduct,
  insertProduct,
  getProductbyId,
  updateProduct,
  updateProductDetails,
  deleteProduct,
  aggregateProducts,
} from "../controllers/productControllers.js";
const router = express.Router();
router
  .route("/databases")
  .get(getProduct)
  .post(insertProduct)
  .patch(updateProductDetails)
  .delete(deleteProduct);
  router.route("/databases/aggregate").get(aggregateProducts);
router.route("/databases/:id").get(getProductbyId).patch(updateProduct);
 
export default router;
