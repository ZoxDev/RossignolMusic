import { useState } from 'react';
import { songInfo } from './useSearchSong';

const useTrackList = (song) => {
  const [trackList, setTrack] = useState([]);



  const handleDeleteTrack = () => {
    setTrack(trackList.filter(trackList.lastIndexOf));
  };

  return { handleDeleteTrack, trackList };
};

export default useTrackList;
