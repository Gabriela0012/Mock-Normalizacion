import { Router } from "express"
import usersDao from '../dao/MongoDAO/Users.js'




const router = Router()
const userService = new usersDao()

router.get('/', async(req,res)=>{
	let users = await userService.getAll()
    console.log(users)

	res.send(users)
})

router.post('/', async(req,res)=>{
   let newUser = await userService.save(req.body)
    console.log({body:req.body})
    res.status(201).json({status:'success'})
})

export default router