import { songInfo } from '../hooks/useSearchSong';
import ReactPlayer from 'react-player';
import { useState } from 'react';

const Player = (props: songInfo) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <>
      <ReactPlayer url={`https://www.youtube.com/watch?v=${props.videoId}`} playing={isPlaying} />
    </>
  );
};

export default Player;

// Props to use :
// - volume (Value 0 to 1) use a slider
// - OnEnded (Play another music on it)
// - OnError (For managing errors)
