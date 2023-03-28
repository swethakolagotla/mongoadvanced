import express from "express";
import { WebSocketServer,WebSocket } from "ws";
import http from "http";
const app = express();
app.use(express.json());
const server = http.createServer(app);
const wss = new WebSocketServer({ server }); //key-value is server
//to see if the connection has established or not ,we have listeners
// wss.on("connection", function (ws) {
//   console.log("connection established");
//   ws.on("message", (data) => {
//     console.log("recieved info from client", data.toString());
//     ws.send('hub recieved the following data'+data.toString())
//   });
// });
wss.on('connection',function(ws){//ws stands for that particular client
ws.on('message',(data,isBinary)=>{
 wss.clients.forEach((client)=>{
 if(client !== ws && client.readyState===WebSocket.OPEN){
    client.send(data,{binary:isBinary})
}
 })
})
})
server.listen(8000,()=>console.log('listening on 8k...'))
