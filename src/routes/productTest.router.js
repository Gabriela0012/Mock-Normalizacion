import { Router } from "express"
import ProductsTest from "../dao/MongoDAO/ProductsTest.js"



const router = Router()
const productTestService = new ProductsTest()

router.get('/', async(req,res)=>{
  let results = await productTestService.getAll()
  res.send (results)
})
router.get('/mock',async(req,res)=>{
  let results = await productTestService.populate();
  res.send (results)
})


export default router