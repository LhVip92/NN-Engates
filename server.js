require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Mensagem vazia' });

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `Você é o assistente virtual da N&N Engates, empresa com mais de 20 anos de mercado.
                    Responda apenas com base nas informações abaixo:
                    - Produtos: engates fixos, removíveis, gavetas, proteções para-choque, acessórios para carroça e parte elétrica.
                    - Veículos: Belina, Del Rey, Fusca, Bandeirante, Toyota (Hilux, SW4), Monza, Chevete, Jipe, Porsche, BMW, Triton, BYD, carros elétricos.
                    - Preços: todos os valores são sob consulta. Informe ao cliente que ele deve falar com a equipe pelo WhatsApp (85) 99987-4410 para obter o valor exato.
                    - Endereços: Loja - Av. Luís Vieira, 596-A, Vila Pery, Fortaleza. Fábrica - Rua Durvalino Guimarães de Almeida, 320.
                    - Telefones: Loja (85) 3292-5645, Fábrica (85) 3484-5315, WhatsApp (85) 99987-4410.
                    - Horário: Seg-Sex 8h-17h, Sáb 8h-12h.
                    - INMETRO: registro nº 001718/2024.
                    - Diferenciais: fabricação própria, sala de espera, garantia.
                    Se o cliente perguntar algo que você não sabe, responda: "Para confirmar essa informação, fale diretamente com nossa equipe pelo WhatsApp (85) 99987-4410."
                    Seja educado, objetivo e direto ao ponto.`
                },
                { role: 'user', content: message }
            ],
            max_tokens: 250,
            temperature: 0.5,
        });

        const reply = response.data.choices[0].message.content.trim();
        res.json({ reply });
    } catch (error) {
        console.error('Erro OpenAI:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao processar sua mensagem.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});