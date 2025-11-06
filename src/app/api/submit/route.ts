import { NextRequest } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// Отправка и тебе, и Владе
const RECIPIENTS = [
    '428300068', // Твой ID
    '806843409', // 
];

export async function POST(request: NextRequest) {
    if (!TELEGRAM_BOT_TOKEN) {
        return new Response(
            JSON.stringify({ error: 'Missing TELEGRAM_BOT_TOKEN' }),
            { status: 500 }
        );
    }

    try {
        const { name, attending } = await request.json();

        const message = `
🎉 Новый ответ на анкету!

Имя: ${name}
Присутствует: ${attending === 'yes' ? 'Да ✅' : 'Нет ❌'}
    `.trim();

        // Отправляем всем получателям
        const sendPromises = RECIPIENTS.map(chatId =>
            fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            })
        );

        await Promise.all(sendPromises);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('API error:', error);
        return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
            status: 500,
        });
    }
}