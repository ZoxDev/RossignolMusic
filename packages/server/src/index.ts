import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Innertube } from 'youtubei.js';

const app = new Hono();
app.use(cors());

app.get('/searchVideo', async (c) => {
  const yt = await Innertube.create();

  const { artist, title } = c.req.query();
  const video = await yt.search(`${artist} ${title}`);

  return c.json(video);
});

const port = 3000;
serve(
  {
    fetch: app.fetch,
    port,
  },
  () => console.log('server started')
);
