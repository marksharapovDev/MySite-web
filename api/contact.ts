import express from 'express'

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

function formatTutorMessage({ format, name, contact, description }: { format: string; name: string; contact: string; description: string }) {
  return [
    '🔔 *Новая заявка — Репетитор*',
    `📋 Формат: ${format}`,
    `👤 Имя: ${name}`,
    `📞 Контакт: ${contact}`,
    `📝 Ситуация: ${description}`,
  ].join('\n');
}

function formatDevMessage({ name, contact, description }: { name: string; contact: string; description: string }) {
  return [
    '🔔 *Новая заявка — Разработчик*',
    '',
    `👤 Имя: ${name}`,
    `📞 Контакт: ${contact}`,
    `📝 О проекте: ${description}`,
  ].join('\n');
}

app.post('/api/contact', async (req, res) => {
  try {
    const { format, name, contact, description, type } = req.body;
    const text = type === 'tutor'
      ? formatTutorMessage({ format, name, contact, description })
      : formatDevMessage({ name, contact, description });

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
      }
    );

    if (!telegramRes.ok) {
      console.error('Telegram error:', await telegramRes.text());
      return res.status(500).json({ error: 'Failed to send message' });
    }
    return res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3001, () => console.log('API running on port 3001'));
