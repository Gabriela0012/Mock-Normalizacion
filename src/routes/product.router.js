import { Router } from "express"
import productsDao from '../dao/MongoDAO/products.js'




const router = Router()
const productService = new productsDao()

router.get('/', async(req,res)=>{
    console.log('entran al api')
    console.log({body: req.body})
    res.send({status:'success', message:'Product added'})
})

export default router