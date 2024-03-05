import { Context } from 'hono';
import { Innertube } from 'youtubei.js';

const getVideo = async (c: Context) => {
  const yt = await Innertube.create();

  const { artist, title } = c.req.query();
  const video = await yt.search(`${artist} ${title}`);

  return c.json(video);
};

export default getVideo;
