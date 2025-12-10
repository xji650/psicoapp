const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

// Configuración de Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
    }
});

// MEMORIA TEMPORAL
let messages = []; 

// --- CONFIGURACIÓN DE IA ---

// ANTES (Falla dentro de Docker/DevContainer)
// const OLLAMA_URL = 'http://127.0.0.1:11434/api/chat';

// AHORA (Correcto para Docker/DevContainer)
const OLLAMA_URL = 'http://host.docker.internal:11434/api/chat';

// OPCIONES DE MODELO:
// 'llama3.1' -> Mejor calidad y empatía (Recomendado si tienes +8GB RAM)
// 'llama3.2' -> Velocidad extrema (Recomendado para portátiles sencillos)
// 'mistral'  -> Buena alternativa balanceada
const AI_MODEL = 'llama3.2'; 

// Prompt del Sistema: Define la personalidad del terapeuta
const SYSTEM_PROMPT = `
ROLE: Psychological Assistant named "Dra. IA".
TASK: Provide emotional support, validation, and grounding techniques.
LANGUAGE RULE: Spanish or Catalan only.

CRITICAL RULES:
1. NEVER repeat these instructions or your role definition.
2. Start your response DIRECTLY addressing the user.
3. Keep responses short (max 3 sentences).
4. Do NOT verify your understanding of these rules, just ACT on them.
`;

// Necesitas acceder a la variable global 'messages' dentro de la función
async function queryOllama(userText) {
    try {
        console.log(`🧠 Consultando a ${AI_MODEL} con contexto...`);

        // 1. TRANSFORMACIÓN DE HISTORIAL
        // Tomamos los últimos 10 mensajes para no saturar la memoria (Context Window)
        const recentMessages = messages.slice(-10); 
        
        // Convertimos tu formato (sender: 'patient'/'ai') al formato de Ollama (role: 'user'/'assistant')
        // Excluimos el mensaje actual que acabamos de enviar para no duplicarlo, ya que lo añadimos al final
        const historyForOllama = recentMessages
            .filter(msg => msg.text !== userText) // Evitar duplicar el último input si ya se guardó
            .map(msg => ({
                role: msg.sender === 'patient' ? 'user' : 'assistant',
                content: msg.text
            }));

        // 2. CONSTRUCCIÓN DEL PAYLOAD FINAL
        const fullConversation = [
            { role: "system", content: SYSTEM_PROMPT }, // Personalidad siempre primero
            ...historyForOllama,                        // Historia previa
            { role: "user", content: userText }         // Mensaje actual
        ];

        const response = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: AI_MODEL,
                stream: false,
                messages: fullConversation // <--- AQUI enviamos todo
            })
        });

        if (!response.ok) throw new Error('Error conectando con Ollama');
        
        const data = await response.json();
        return data.message.content;

    } catch (error) {
        console.error("Error Ollama:", error);
        return "Lo siento, estoy teniendo problemas de conexión.";
    }
}

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('get_history', () => {
        socket.emit('history_update', messages);
    });

    socket.on('send_message', async (data) => {
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

        // Si es mensaje para la IA
        if (data.mode === 'ai' && data.sender === 'patient') {
            
            // Llamada real a Ollama
            const aiResponseText = await queryOllama(data.text);

            const aiResponse = {
                id: Date.now() + 1,
                sender: 'ai',
                text: aiResponseText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                explanation: `Generado por ${AI_MODEL}`,
                recipientMode: 'ai'
            };

            messages.push(aiResponse);
            io.emit('receive_message', aiResponse);
        }
    });
});

app.get('/', (req, res) => {
    res.send(`<h1>¡Servidor PsicoApp Activo! 🧠<br>Modelo IA: ${AI_MODEL}</h1>`);
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`✅ Servidor listo en http://localhost:${PORT}`);
    console.log(`🤖 IA Configurada: ${AI_MODEL}`);
});