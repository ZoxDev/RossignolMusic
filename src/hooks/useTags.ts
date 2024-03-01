import { keepPreviousData, useQuery } from '@tanstack/react-query';

type typeTagsList = {
  toptags: {
    '@atr': {
      offset: number;
      num_res: number;
      total: number;
    };
    tag: [
      {
        name: string;
        count: number;
        reach: number;
      },
    ];
  };
};

const useTags = (page: number) => {
  const API_KEY = import.meta.env.VITE_API_KEY_LASTFM;
  const baseURL: URL = new URL(`http://ws.audioscrobbler.com/2.0/?`);

  return useQuery({
    queryKey: ['getTagInPage', page],
    queryFn: async () => {
      const paramsRandomTag: URLSearchParams = new URLSearchParams();
      paramsRandomTag.set('method', `tag.gettoptags`);
      paramsRandomTag.set('api_key', API_KEY);
      paramsRandomTag.set('format', `json`);
      paramsRandomTag.set('offset', `${page}`);

      // Get all tag on a page
      const data: typeTagsList | undefined = await fetch(`${baseURL}${paramsRandomTag}`).then(
        (res) => res.json(),
      );

      return data;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export default useTags;
