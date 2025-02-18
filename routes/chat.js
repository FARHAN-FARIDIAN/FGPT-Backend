const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/new', async (req, res) => {
    const { userId, chatName } = req.body;

    try {
        const newChat = await pool.query(
            'INSERT INTO chats (user_id, chat_name) VALUES ($1, $2) RETURNING *',
            [userId, chatName]
        );
        res.json(newChat.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const chats = await pool.query('SELECT * FROM chats WHERE user_id = $1', [req.params.userId]);
        res.json(chats.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/message', async (req, res) => {
    const { chatId, sender, content, type } = req.body;

    try {
        const newMessage = await pool.query(
            'INSERT INTO messages (chat_id, sender, content, type) VALUES ($1, $2, $3, $4) RETURNING *',
            [chatId, sender, content, type]
        );
        res.json(newMessage.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/messages/:chatId', async (req, res) => {
    try {
        const messages = await pool.query('SELECT * FROM messages WHERE chat_id = $1', [req.params.chatId]);
        res.json(messages.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delete/:chatId', async (req, res) => {
    const { chatId } = req.params;

    try {
        await pool.query('DELETE FROM messages WHERE chat_id = $1', [chatId]);
        await pool.query('DELETE FROM chats WHERE id = $1', [chatId]);
        res.json({ success: true, message: 'Chat deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete chat' });
    }
});

router.put('/edit', async (req, res) => {
    const { chatId, chatName } = req.body;

    try {
        await pool.query('UPDATE chats SET chat_name = $1 WHERE id = $2', [chatName, chatId]);
        res.json({ success: true, message: 'Chat name updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update chat name' });
    }
});



module.exports = router;
