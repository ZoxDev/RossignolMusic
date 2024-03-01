import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Track } from '../types';

// Last fm tag.getTopTracks result type
export type Tracks = {
  tracks: {
    track: Track[];
  };
};

const useTracksLastFm = (tagName: string | undefined, page: number) => {
  const API_KEY = import.meta.env.VITE_API_KEY_LASTFM;
  const baseURL: URL = new URL(`http://ws.audioscrobbler.com/2.0/?`);

  const canFetch = () => {
    if (tagName != undefined) return true;
    else return false;
  };

  return useQuery({
    queryKey: ['getTrackList', tagName, page],
    queryFn: async () => {
      const searchParams: URLSearchParams = new URLSearchParams();
      searchParams.set('method', `tag.gettoptracks`);
      searchParams.set('tag', `${tagName}`);
      searchParams.set('api_key', API_KEY);
      searchParams.set('format', `json`);
      searchParams.set('limit', `100`);
      searchParams.set('page', `${page}`);

      // Return for each page a promise
      const data: Tracks = await fetch(`${baseURL}${searchParams}`).then((res) => res.json());

      return data;
    },
    enabled: canFetch(),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export default useTracksLastFm;
