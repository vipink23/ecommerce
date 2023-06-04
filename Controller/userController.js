import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";


const UserRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.send("all fields are mandatory");
      return;
    }

    const availableUser = await UserModel.findOne({ email });
    if (availableUser) {
      res.send("user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.json({user,status:true});
      console.log(user);
    } else {
      res.send("user data is not valid");
    }
  } catch (err) {
    res.send("error: " + err);
  }
};

const UserLogin = async (req, res) => {
  try {
    const {email,password}=req.body;
    if(!email || !password){
      res.send('all field is required')
    }
    const user = await UserModel.findOne({email});
    console.log(user,'useeeer');
    if(user && (await bcrypt.compare(password, user.password))){
      const accesstoken=Jwt.sign({
        user:{
          username:user.username,
          email:user.email,
          id:user.id
        }
      },process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:'1m'}
      )
      res.json({accesstoken,user, status:true});
    }else{
      res.send('email or password not valid')
    }
  } catch (err) {
    res.send("error" + err);
  }
};


const userGet= async(req,res)=>{
  try{

     res.send('user get')
  }catch(err){
    res.send('errr'+err)
  }

  }



export default { UserLogin, UserRegister ,userGet};
