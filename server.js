const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const server = new WebSocket.Server({ port: 3000 });

// Specify the folder path for message logs
const folderPath = 'message_logs';

server.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Save the message to a .txt file inside the message_logs folder
        saveMessageToFile(message);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

function saveMessageToFile(message) {
    // Create the message_logs folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    // Specify the file path for saving messages
    const filePath = path.join(folderPath, 'websocket_messages.txt');

    // Append the message to the .txt file
    fs.appendFile(filePath, `${new Date().toISOString()}: ${message}\n`, (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
        } else {
            console.log('Message saved to file');
        }
    });
}


// const socket = new WebSocket('ws://localhost:3000');

//         socket.addEventListener('open', (event) => {
//             console.log('WebSocket connection opened');
            
//             function sendMessage() {
//                 const randomDelay = Math.floor(Math.random() * 20000) + 1000; // Random delay between 1 and 20 seconds (in milliseconds)
//                 const message = `From Socket 1 ,Random message sent after ${randomDelay / 1000} seconds`;
                
//                 console.log(message);
//                 socket.send(message);

//                 setTimeout(sendMessage, randomDelay);
//             }

//             sendMessage();
//         });