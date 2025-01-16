const net = require('net');
const readline = require('readline');
const { Readable, Transform } = require('stream');

// Decrypt message from server
class Decrypt extends Transform{
  _transform(chunk,encoding,callback){
    for(let i=0; i < chunk.length; i++){
      if(chunk[i] !== 255){
        chunk[i] = chunk[i] - 2
      }

    }
    callback(null,chunk)
  }
}

class Encrypt extends Transform{
  _transform(chunk,encoding,callback){
    for(let i=0; i < chunk.length; i++){
      if(chunk[i] !== 255){
            chunk[i] = chunk[i] + 2
      }

    }
    callback(null,chunk)
  }
}


const rl = readline.createInterface({
    input: process.stdin,  // This is where the input comes from (keyboard)
    output: process.stdout, // This is where the output goes (console) 
    prompt: "Enter your message:"
  });

let clientId= null ;

const socket = net.createConnection({port: 3000,host:'127.0.0.1'} , async  () => {
    console.log('Connected to server') })

socket.on("data", (data) => { 
  if (data.toString("utf-8").substring(0, 2) === "id") {
    clientId = data.toString("utf-8").substring(3);
      console.log(`Your id is ${clientId}`);
      rl.prompt()
  } else {
    const header = data.toString("utf-8").split(" ").slice(0, 3).join(" ");
    const rawData = data.toString("utf-8").slice(header.length).trim(); 
    
    let derypt = new Decrypt()
    let readablestream = Readable.from(Buffer.from(rawData))
    const dechunk =[]
    readablestream.pipe(derypt)
    .on('data',(chunk)=>{
      dechunk.push(chunk)
    })
    .on('end',()=>{ 
      const header = data.toString("utf-8").match(/^User \d+/)[0];
      const message = Buffer.concat(dechunk);
      
      console.log( `${header} : ${message.toString('utf-8').replace('8','')}`);
      rl.prompt()       
    })
  }
})


rl.on('line',(keybrdinput)=>{
  if(clientId){
    let encrypt = new Encrypt()
    let readablestream = Readable.from(Buffer.from(keybrdinput,'utf-8'))
    const enchunk =[]
    readablestream.pipe(encrypt)
    .on('data',(chunk)=>{
      enchunk.push(chunk)
    })
    .on('end',()=>{
      const encryptedMessage = Buffer.concat(enchunk).toString('utf-8');
      socket.write(`${clientId} -message- ${encryptedMessage}`);
    })
  }else{
    console.log('You are not yet assigned an ID')
  }
})


 