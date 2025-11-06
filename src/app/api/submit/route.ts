import { NextRequest } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const RECIPIENTS = [
    '428300068', // Ты
    '806843409', // 
];

export async function POST(request: NextRequest) {
    if (!TELEGRAM_BOT_TOKEN) {
        console.error('❌ TELEGRAM_BOT_TOKEN не задан');
        return new Response(JSON.stringify({ error: 'Missing token' }), { status: 500 });
    }

    try {
        const { name, attending } = await request.json();
        const message = `
🎉 Новый ответ на анкету!

Имя: ${name}
Присутствует: ${attending === 'yes' ? 'Да ✅' : 'Нет ❌'}
    `.trim();

        // Отправляем каждому, но не падаем, если один не дошёл
        for (const chatId of RECIPIENTS) {
            try {
                const res = await fetch(
                    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ chat_id: chatId, text: message }),
                    }
                );
                const result = await res.json();
                if (!result.ok) {
                    console.error(`❌ Не удалось отправить ${chatId}:`, result);
                } else {
                    console.log(`✅ Успешно отправлено ${chatId}`);
                }
            } catch (err) {
                console.error(`⚠️ Ошибка при отправке ${chatId}:`, err);
            }
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('❌ Ошибка в API:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}