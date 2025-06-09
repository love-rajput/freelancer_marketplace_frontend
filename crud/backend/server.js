// backend/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

let messages = [];

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

// API endpoints
app.get('/messages', (req, res) => res.json(messages));

app.post('/messages', (req, res) => {
    const msg = { id: Date.now(), text: req.body.text };
    messages.push(msg);
    io.emit('message', msg);
    res.status(201).json(msg);
});

app.put('/messages/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = messages.findIndex(m => m.id === id);
    if (index !== -1) {
        messages[index].text = req.body.text;
        io.emit('update', messages[index]);
        return res.json(messages[index]);
    }
    res.status(404).send('Not found');
});

app.delete('/messages/:id', (req, res) => {
    const id = parseInt(req.params.id);
    messages = messages.filter(m => m.id !== id);
    io.emit('delete', id);
    res.status(204).send();
});

io.on('connection', socket => {
    console.log('A user connected');
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));