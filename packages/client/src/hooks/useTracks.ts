import { keepPreviousData, skipToken, useQuery } from '@tanstack/react-query';
import { Track } from '../types';

// Last fm tag.getTopTracks result type
export type Tracks = {
  tracks: {
    track: Track[];
    '@attr': {
      tag: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
};

const useTracks = (tagName: string | undefined, page: number) => {
  const API_KEY = import.meta.env.VITE_API_KEY_LASTFM;
  const baseURL: URL = new URL(`http://ws.audioscrobbler.com/2.0/?`);

  return useQuery({
    queryKey: ['Tracks', tagName, page],
    queryFn: tagName
      ? async () => {
          const searchParams: URLSearchParams = new URLSearchParams();
          searchParams.set('method', `tag.gettoptracks`);
          searchParams.set('tag', `${tagName}`);
          searchParams.set('api_key', API_KEY);
          searchParams.set('format', `json`);
          searchParams.set('limit', `100`);
          searchParams.set('page', `${page}`);

          // Return for each page a promise
          return fetch(`${baseURL}${searchParams}`).then((res) => res.json()) as Promise<Tracks>;
        }
      : skipToken,

    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export default useTracks;
