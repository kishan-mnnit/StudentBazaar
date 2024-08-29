import express from 'express';
import multer from 'multer';
import { addFood, fetchSimilarProducts, getItemById, listFood, removeFood } from '../controllers/foodController.js';

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Directory to save the uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage: storage });

foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.array('images', 5), addFood); // 'images' should match your form field name
foodRouter.post("/remove", removeFood);
foodRouter.get("/:id", getItemById);
foodRouter.get("/similar/:id", fetchSimilarProducts);



export default foodRouter;
