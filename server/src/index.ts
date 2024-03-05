import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import getVideo from './getVideo';

const app = new Hono();
app.use(cors());

app.get('/getVideo/', getVideo);

const port = 3000;
serve({
  fetch: app.fetch,
  port,
});
