import mongoose from 'mongoose'
const {Schema}=mongoose;

const adminSchema=new Schema({
     email:{
       type:String,
       required:[true, 'email is Required']
     },
    password:{
        type: String,
        minlength : [8,"Password should be at least 8 characters"],
        required:[true, 'password is required']
    }
    })

    const AdminModel = mongoose.model("admin", adminSchema);
export default AdminModel;
