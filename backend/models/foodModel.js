import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    views: { type: Number, default: 0 },
    college: { type: String },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true } 
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
