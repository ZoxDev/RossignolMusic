import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use(cors());



const port = 3000;
serve({
  fetch: app.fetch,
  port,
});
