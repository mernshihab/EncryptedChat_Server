
const net = require('net');
const server = net.createServer()
const clients = [];

server.on('connection', (socket) => {
    console.log('New connection');  
    const clientID = clients.length + 1;

    clients.map((client) => {
        client.socket.write(`User ${clientID} joined !`)
    });
    socket.write(`id-${clientID}`);
    
    clients.push({ id: clientID.toString(), socket}) 

    socket.on("data", (data) => {
        const dataString = data.toString("utf-8")
        const id = dataString.substring(0, dataString.indexOf("-"));
        const message = dataString.substring(dataString.indexOf("-message-") + 9);
        clients.map((client) => {
            if (client.id != id) {
                client.socket.write(`User ${id} : ${message}`);
            }
        });
    });
    socket.on('end', () => {
        clients.map((client) => {
            client.socket.write(`User ${clientID} left !`)
        });
    });

});

server.listen(3000, '127.0.0.1', () => {
    console.log('Server is listening on port 3000',server.address());
});