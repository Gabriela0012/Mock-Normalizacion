import {Router} from 'express'

const router = Router()

router.get('/', (req,res)=>{
    res.render('welcome')
})
router.get('/chat', (req,res)=>{
    res.render('products')
})

export default router