import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
});

productSchema.plugin(mongoosePaginate)

const productModel = model("products", productSchema);

export { productModel };