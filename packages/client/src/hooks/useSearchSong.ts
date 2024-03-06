import { Track } from '../types';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export type songInfo = {
  videoId?: string;
  durationInMS?: number;
};

const useSearchSong = (track?: Track) => {
  const baseURL = 'http://localhost:3000/getVideo/?';

  return useQuery({
    queryKey: ['song', track],
    queryFn: async () => {
      const paramsRandomTag = new URLSearchParams();
      paramsRandomTag.set('artist', `${track?.artist.name}`);
      paramsRandomTag.set('title', `${track?.name}`);

      const data = await fetch(`${baseURL}${paramsRandomTag}`).then((res) => res.json());

      const song: songInfo = {
        videoId: data?.results[0].id,
        durationInMS: data?.results[0].duration.seconds * 1000,
      };

      return song;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export default useSearchSong;
