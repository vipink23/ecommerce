const express= require('express')
const router =express.Router()
const Products = require('../models/products')

router.get('/' ,async(req,res)=>{
 try{
    const products=await Products.find()
    res.json(products)

 }catch(err){
    res.send('error' +err)

 }
})
router.get('/:id', async(req,res) =>{
    try{
        const product = await Products.findById(req.params.id)
        res.json(product)
    }catch(err){
        res.send('Error ')
    }
})

router.post('/' , async (req,res)=>{
    const product= new Products({
        name:req.body.name,
        image:req.body.image,
        discription:req.body.discription,
        brand:req.body.brand,
        price:req.body.price
    })
    try{
        const a1 = await product.save()
        res.json(a1)
        console.log(a1);
    }catch(err){
        res.send('Error')
    }
})

router.patch('/:id', async (req,res)=>{
    try{
        const product= await Products.findById(req.params.id)
        console.log(product);
        product.name =req.body.name
        const a1= await product.save()
        res.json(a1)
    }catch(err){
    res.send(err.message)
    }
})

module.exports=router