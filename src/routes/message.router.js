import { Router } from "express"
import messageDao from '../dao/MongoDAO/Messages.js'
import {normalize, schema, denormalize} from 'normalizr';




const router = Router()
const messageService = new messageDao()

router.get('/', async(req,res)=>{
	let messages = await messageService.getAll()
  console.log(messages)

	res.send(messages)
})

router.get('/normalize', async(req,res)=>{

  let Normessages ={
    id:1,
    messages:await messageService.getAll()
  }
 
  const authorSchema = new schema.Entity('author')
  const textSchema = new schema.Entity('text')

  const messagesSchema= new schema.Entity('NewMessages',{
    // text: textSchema,

		// author: authorSchema,
    messages: [authorSchema]
    
  }
		)

	console.log(textSchema)

  const normalizeData = normalize(Normessages,messagesSchema)
  console.log(JSON.stringify(normalizeData, null, '\t'))



	res.send(JSON.stringify(normalizeData, null, '\t'))
  const denormalizedData = denormalize(normalizeData.result, messagesSchema, normalizeData.entities)
  console.log(JSON.stringify(denormalizedData, null, '\t'))


})
router.post('/', async(req,res)=>{
   let newMessage = await messageService.save(req.body)
    console.log({body:req.body})
    res.status(201).json({status:'success'}).send(newMessage)
})

export default router