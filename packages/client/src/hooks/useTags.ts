import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { API_KEY, API_URL } from '../config';

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

const useTags = (page: number | undefined) => {
  const baseURL: URL = new URL(API_URL);

  return useQuery({
    queryKey: ['getTagInPage', page],
    queryFn: async () => {
      const paramsRandomTag: URLSearchParams = new URLSearchParams();
      paramsRandomTag.set('method', 'tag.gettoptags');
      paramsRandomTag.set('api_key', API_KEY);
      paramsRandomTag.set('format', 'json');
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
