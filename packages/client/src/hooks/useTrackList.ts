import { useState } from 'react';
import { songInfo } from './useSearchSong';

const useTrackList = (newSong: songInfo | undefined) => {
  const [trackList, setTrackList] = useState<Array<songInfo>>([]);

  if (
    newSong !== undefined &&
    (!trackList.length || newSong.videoId != trackList[trackList.length - 1].videoId)
  ) {
    setTrackList([...trackList, { videoId: newSong.videoId, durationInMS: newSong.durationInMS }]);
  }

  const handleDeleteTrack = () => {
    if (trackList.length > 1) {
      return setTrackList(trackList.slice(0, -1));
    }
  };

  return { trackList, handleDeleteTrack };
};

export default useTrackList;
