import fs from 'fs'
import moment from 'moment'


const path = "src/files/messages.json"
const moments = moment().format('YYYY-MM-DD HH:mm:ss');

class MessagesContainer {
  getAll = async() =>{
    try{
      if(fs.existsSync(path)){
        let fileData = await fs.promises.readFile(path,'utf8')
        let messages = JSON.parse(fileData);
        return messages;
      }else{
        return [];
      }
    }catch(error){
      console.log("Cannot read File: "+error)
    }
  }
  saveMessage = async(message) =>{
    try{
      let messages = await this.getAll();
      if(messages.length===0){
          message.id=1;
          message.timestamp= moments;
          messages.push(message);
          await fs.promises.writeFile(path,JSON.stringify(messages,null,'\t'));
      }else{
          message.id = messages[messages.length-1].id+1;
          message.timestamp= moments;
          messages.push(message);
          await fs.promises.writeFile(path,JSON.stringify(messages,null,'\t'));
      }
    }catch(error){
      console.log("Cannot write file: "+error)

    }
  }
 
  getById = async(id) => {
    try {
      let messages = await this.getAll()
      let message = null
      for(const item of messages){
          if(item.id===id){
              message =item
          }
      }
      return message
  } catch (error) {
      console.log('GetById: '+error)
      return null
  }
  }

  deleteById = async(id) =>{
    try{
      let remove = await this.getAll()
      const removes = remove.filter((item) =>{
          if(id != item.id){
            return item
          }else{
            return null
          }
      })
      const newArray = fs.promises.writeFile(path, JSON.stringify(removes, null, '\t'))
      console.log(newArray)
      return newArray
    }catch(error){
      console.log('Cannot be deleted: ', error)
    }
  }   

  deleteAll = async() => {
    try{
      await fs.promises.writeFile(path,JSON.stringify([], null, '\t'))
    } catch (error) {
      console.log(error)
    }
  }


  updateProduct = async(id, newData, newData1)=>{
    let productsArray = await this.getAll()
    for(const item of productsArray){
        if(item.id === id){
            item.name = newData1,
            item.price = newData
        }
    }
    console.log(`id: ${id}, newData: ${newData}`)
    console.log(productsArray)
    await fs.promises.writeFile(path,JSON.stringify(productsArray, null, '\t'))
}


    
}
    


  
// message{ id, name, price, timestamp,description,code,thumbnail(url),stock}

  
 





export default MessagesContainer;