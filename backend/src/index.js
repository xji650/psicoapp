const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

// Configuración de Socket.io para permitir conexión desde Vite (puerto 5173)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Asegúrate que este sea el puerto de tu frontend
        methods: ["GET", "POST"]
    }
});

// MEMORIA TEMPORAL (Simula base de datos)
let messages = []; 

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // 1. Enviar historial al conectarse
    socket.on('get_history', () => {
        socket.emit('history_update', messages);
    });

    // 2. Recibir mensaje
    socket.on('send_message', (data) => {
        const newMessage = {
            id: Date.now(),
            sender: data.sender,
            text: data.text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            recipientMode: data.mode,
            read: false
        };

        messages.push(newMessage);
        io.emit('receive_message', newMessage);

        // --- SIMULACIÓN IA ---
        if (data.mode === 'ai' && data.sender === 'patient') {
            setTimeout(() => {
                const aiResponse = {
                    id: Date.now() + 1,
                    sender: 'ai',
                    text: `(IA): Entiendo tu mensaje: "${data.text}". Te sugiero hacer una pausa y respirar.`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    explanation: "Respuesta automática basada en palabras clave.",
                    recipientMode: 'ai'
                };
                messages.push(aiResponse);
                io.emit('receive_message', aiResponse);
            }, 1500);
        }
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`✅ Servidor backend listo en http://localhost:${PORT}`);
});