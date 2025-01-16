# Encrypted Chat System (TCP)

A simple terminal-based encrypted chat system built using Node.js and TCP. This project allows clients to securely send and receive messages through a server using a custom encryption and decryption mechanism.

## Features
- **Encryption/Decryption**: Messages are encrypted using a custom algorithm before being sent and decrypted upon receiving.
- **TCP Server-Client Communication**: Clients connect to a server using TCP and can send and receive encrypted messages.
- **Unique Client IDs**: Each client is assigned a unique ID when they connect, which is used for communication.
- **Real-time Chat**: As soon as a client sends a message, it gets broadcasted to all other clients connected to the server.

## Installation

### Prerequisites
- Node.js installed on your machine. If you don't have it, you can download it from [here](https://nodejs.org/).

### Steps to Run the Project

1. **Clone the Repository**:
   Clone the repository to your local machine using the following command:
   ```bash
   git clone 

   
To start the server, run:
```bash
node server.js
```
In a new terminal window, run the client 
```bash
node client.js
```
The client will connect to the server and await an ID assignment from the server.

You can add how many client you want.

Usage

For Server:
	•	The server is responsible for accepting client connections and relaying messages between clients.
	•	When a client sends a message, the server broadcasts the encrypted message to all other connected clients.

 For Client:
	•	The client connects to the server and waits for a unique ID.
	•	The client can then send encrypted messages to the server and receive encrypted messages from other clients.
	•	Clients are assigned a unique ID that they use when sending messages to identify themselves.

 Encryption/Decryption Logic:
	•	The Encrypt class adds 2 to each byte of the message for encryption.
	•	The Decrypt class subtracts 2 from each byte of the message for decryption.
	•	This ensures that the messages are unreadable unless decrypted.
