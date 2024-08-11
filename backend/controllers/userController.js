import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";


//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token,user_id:user._id, college:user.college})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password,college,batch} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword,college:college,batch:batch})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        console.log(req.body);
        res.json({success:false,message:"Error"})
    }
}

// Get current user
const getUserFromToken = async (req, res) => {
    console.log(req.body);
  const token = req.body.token;
  console.log(token);
  if (!token) return res.sendStatus(401); // Unauthorized

  try {
    const decoded   
 = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Assumingtoken 'id' is the claim for user ID
    res.json({ userId });
  } catch (err) {
    console.error(err);
    res.sendStatus(403)
}
};
  
const getSellerData =  async (req, res) => {
    try {
      const seller = await userModel.findById(req.params.id);
      if (!seller) {
        return res.status(404).json({ success: false, message: 'Seller not found' });
      }
      res.json({ success: true, data: seller });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

export {loginUser, registerUser,getUserFromToken ,getSellerData}