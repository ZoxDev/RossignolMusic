import { BACKEND_URL } from '../config';
import { Track } from '../types';
import { useQuery, keepPreviousData, skipToken } from '@tanstack/react-query';

export type songInfo = {
  videoId?: string;
  durationInMS?: number;
};

const useSearchSong = (track?: Track) => {
  return useQuery({
    queryKey: ['song', track],
    queryFn: track
      ? async () => {
          const paramsRandomTag = new URLSearchParams();
          paramsRandomTag.set('artist', `${track?.artist.name}`);
          paramsRandomTag.set('title', `${track?.name}`);

          const data = await fetch(`${BACKEND_URL}/searchVideo?${paramsRandomTag}`).then((res) =>
            res.json(),
          );

          const song: songInfo = {
            videoId: data?.results[0].id,
            durationInMS: data?.results[0].duration.seconds * 1000,
          };

          return song;
        }
      : skipToken,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export default useSearchSong;
