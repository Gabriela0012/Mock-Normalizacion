import mongoose from 'mongoose';
import moment from 'moment'
import MongoDBContainer from './MongoDBContainer.js';
import faker from 'faker'

const collection = 'products';

const productsSchema = mongoose.Schema({
  name:{
    type: 'string',
    required:true
  },
  price:Number,
  thumbnail:String,
  timestamp:{
    type: String,
    default: ()=>moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
  }
})


export default class Products extends MongoDBContainer {
  constructor(){
    super(collection,productsSchema);
  }

  // Buscar pot Id el producto
  getById = async(id) => {
    let result = await this.model.findById({_id:id});
    return result;
      
  }

  //Actualizar el producto que es buscado por Id
  update = async(id, body)=>{
    let conditions = {_id:id}
    await this.model.updateOne(conditions, body)
  }

  // Eliminar producto por Id
  deleteById = async(id) => {
    let conditions = {_id:id}
    await this.model.deleteOne(conditions)
  
  }
 
 
}