import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', logger(console.log));
app.use('*', cors());

const PREFIX = 'msg_';

// GET all messages
app.get('/make-server-76a5aef3/messages', async (c) => {
  try {
    const messages = await kv.getByPrefix(PREFIX);
    // Sort by date descending
    const sorted = (messages || []).sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return c.json(sorted);
  } catch (err) {
    console.error('Error fetching messages:', err);
    return c.json({ error: 'Failed to fetch messages' }, 500);
  }
});

// POST new message
app.post('/make-server-76a5aef3/messages', async (c) => {
  try {
    const body = await c.req.json();
    const id = Math.random().toString(36).substring(2, 11);
    const newMessage = {
      id,
      text: body.text,
      recipient: body.recipient || 'Someone',
      emotion: body.emotion || 'Unsent',
      createdAt: new Date().toISOString(),
      reports: 0
    };
    
    await kv.set(`${PREFIX}${id}`, newMessage);
    return c.json(newMessage);
  } catch (err) {
    console.error('Error creating message:', err);
    return c.json({ error: 'Failed to save message' }, 500);
  }
});

// POST report message
app.post('/make-server-76a5aef3/messages/:id/report', async (c) => {
  try {
    const id = c.req.param('id');
    const msg = await kv.get(`${PREFIX}${id}`);
    if (msg) {
      msg.reports = (msg.reports || 0) + 1;
      await kv.set(`${PREFIX}${id}`, msg);
      return c.json({ success: true });
    }
    return c.json({ error: 'Message not found' }, 404);
  } catch (err) {
    return c.json({ error: 'Failed to report' }, 500);
  }
});

Deno.serve(app.fetch);
