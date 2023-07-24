import AdminModel from "../models/Admin";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// const AdminRegister= async(req,res)=>{
//     try {
//         const {email,password}=req.body;
//         if(!email | !password){
//           res.send('All field is madaratory')  
//           return
//         }
//        const availableAdmin= await AdminModel.findOne({email})

//        if(availableAdmin){
//         res.send('email already exist')
//        }
//       const hashedPassword=await bcrypt.hash(password, 10);

//       const Admin=await AdminModel.create({
//         email,
//         password:hashedPassword
//       })
//       if (Admin) {
//         res.send({Admin, status:true})
//         console.log('admin registerd succesfully');
//       }else{
//         res.send('admin data not valid')
//       }
//     } catch (error) {
//        res.send(error) 
//     }
// }


const AdminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            res.send('all field is madaratory')
        }
         const admin= await AdminModel.findOne({email});
         if(admin && ( await bcrypt.compare(password, admin.password))){

        const accessToken=jwt.sign({
            user:{
                email:admin.email                
            }
        },
        process.env.ACCESS_TOKEN_SECRET
        )
        res.json({ accessToken, admin, status: true });            
         }else{
            res.send('email or password not valid')
         }
    } catch (error) {
        res.send(error)
    }
}
  export default{AdminRegister,AdminLogin}