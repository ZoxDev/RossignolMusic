import { useState, useEffect } from 'react';
import { songInfo } from './useSearchSong';

const useTrackList = (song: songInfo | undefined) => {
  const [trackList, setTrackList] = useState<Array<songInfo>>([]);

  useEffect(() => {
    if (song === undefined) return undefined;
    return setTrackList((prevTrack) => [
      ...prevTrack,
      { videoId: song.videoId, durationInMS: song.durationInMS },
    ]);
  }, [song]);

  const handleDeleteTrack = () => {
    if (trackList.length > 1) {
      return setTrackList(trackList.slice(0, -1));
    }
  };

  console.log({ trackList });

  return { trackList, handleDeleteTrack };
};

export default useTrackList;
