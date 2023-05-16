const express= require('express');
const router =express.Router();
const Category = require("../models/Category")


router.get('/' ,async(req,res)=>{
    try{
       const cateegories=await Category.find()
       res.json(cateegories)
   
    }catch(err){
       res.send('error' +err)
   
    }
   })
   router.get('/:id', async(req,res) =>{
    try{
        const category = await Category.findById(req.params.id)
        res.json(category)
    }catch(err){
        res.send('Error ')
    }
})

router.post('/' , async (req,res)=>{
    const category= new Category({
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
})

router.patch('/:id', async (req,res)=>{
    try{
        const category= await Category.findByIdAndUpdate(req.params.id ,req.body)
        res.json(category)
    }catch(err){
    res.send(err.message)
    }
})

module.exports=router