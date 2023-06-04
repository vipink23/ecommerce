import CategoryModel from '../models/Category.js'

const CategoryGet=async(req,res)=>{
    try{
       const cateegories=await CategoryModel.find()
       res.json(cateegories)
   
    }catch(err){
       res.send('error' +err)
   
    }
   }
   const CategoryGetById= async(req,res) =>{
    try{
        const category = await CategoryModel.findById(req.params.id)
        res.json(category)
    }catch(err){
        res.send('Error ')
    }
}
const CategoryPost=async (req,res)=>{
    const category= new CategoryModel({
        name:req.body.name,
        description:req.body.description,
        
    })
    try{
        const a1 = await category.save()
        res.json(a1)
        console.log(a1);
    }catch(err){
        res.send('Error')
    }
   
}

const CategoryPatch = async (req,res)=>{
    try{
        const category= await CategoryModel.findByIdAndUpdate(req.params.id ,req.body)
        res.json(category)
    }catch(err){
    res.send(err.message)
    }
}





   export default {CategoryGet,CategoryGetById,CategoryPost,CategoryPatch}