import { Router } from "express";
import messagesContainer from '../container/messagesContainer.js'
import {normalize, schema, denormalize} from 'normalizr';


const messageService = new messagesContainer();
const router = Router();


router.get('/',async(req, res)=>{
  let messages = await messageService.getAll();
  res.json(messages);
})



router.post('/',async(req, res)=>{
   let message = req.body
  console.log(message)
  let newArray = await messageService.saveMessage(message);
  res.json(newArray);

 
 
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




export default router;