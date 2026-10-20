// shortcut: the bot token ships inside the browser bundle, anyone can read it; move this call to a backend before going public
const token = import.meta.env.VITE_TG_TOKEN;
const chatId = import.meta.env.VITE_TG_CHAT_ID;

export async function sendTelegram(text) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}`);
}
