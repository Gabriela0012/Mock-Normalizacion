import mongoose from 'mongoose';
import moment from 'moment'
import MongoDBContainer from './MongoDBContainer.js';
import productService from './Products.js'

const collection = 'carts';
const products = new productService

const cartsSchema = mongoose.Schema({
  title:{
    type: 'string',
    required:true
  },
  timestamp:{
    type: String,
    default: ()=>moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
  },
  products: [],
})


export default class Carts extends MongoDBContainer {
  constructor(){
    super(collection,cartsSchema);
    this.pepe = 0
  }

  // creacion del carrito
  saveCart = async (document)=>{
    let results = await this.model.create(document);
    return results;
  }

  //buscarlo por Id
  getById = async(id) => {
    let result = await this.model.findById({_id:id});
    return result;
  }

  // Eliminar carrito de carritos
  deleteById = async(id) => {
    let conditions = {_id:id}
    await this.model.deleteOne(conditions)
  }
  
  // Agregar un producto al carrito elegido por Id
  updateCart = async (cid, pid, qty) => {
    let cart = await this.getById(cid)
    console.log(cart)

    if(!cart.products){
      if(qty < 1){
        throw new Error("Cart manager error:{addProductCart} invalid quantity")
      }else{
        cart.products.push({id:pid, quantity:qty})
      }
    }else{
      if(cart.products.some(e => e.id === pid)){
        for (const item of cart.products){
          if(item.id === pid){
            let condition = (item.quantity += qty)
            if(condition < 1){
                item.quantity = 1
            }else{
                item.quantity = condition
            }
          }  
        }
      }else{
        if(qty < 1){
          throw new Error("Cart manager error:{updateCart} invalid quantity")
        }else{
          cart.products.push({id:pid, quantity:qty})
        }
      }
        
    }
    await this.update(cart)
  }

  
  // Eliminar el producto del carrito
  deleteProductCart = async (cid, pid) => {
    let cart = await this.getById(cid)

    let newCartProduts = []

    if(cart.products.some(e =>e.id === pid)){
      for (const item of cart.products){
        if(item.id === pid){
            continue
        }
        newCartProduts.push(item)
      }
      cart.products = newCartProduts
      this.update(cart)
        
    }
  }

  

 
            
  
}