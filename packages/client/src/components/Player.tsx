import { songInfo } from '../hooks/useSearchSong';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { Slider } from '@mui/material';
import Loading from './Loading';

const BASE_URL = `https://www.youtube.com/watch?v=`;

type playerProps = {
  handlePrev: () => void;
  handleNext: () => void;
  song?: songInfo;
};

const Player = (props: playerProps) => {
  const storedIsPlaying = localStorage.getItem('isPlaying');
  const storedVolume = localStorage.getItem('volume');

  const [isPlaying, setIsPlaying] = useState(() => {
    return storedIsPlaying ? JSON.parse(storedIsPlaying) : false;
  });
  const [volume, setVolume] = useState(() => {
    return storedVolume ? parseFloat(storedVolume) : 1;
  });
  const [volumeHide, setVolumeHide] = useState(true);

  const handleVolumeChange = (volume: number | number[]) => {
    if (typeof volume !== 'number') throw new Error("Can't get an array of numbers");
    setVolume(volume);
    localStorage.setItem('volume', volume.toString());
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    localStorage.setItem('isPlaying', JSON.stringify(!isPlaying));
  };

  if (props.song === undefined)
    return <Loading message="Click or press enter for getting a track..." />;

  return (
    <>
      <ReactPlayer
        url={`${BASE_URL}${props.song.videoId}`}
        playing={isPlaying}
        volume={volume}
        onEnded={props.handleNext}
      />

      <section>
        <button onClick={handleTogglePlay}>{isPlaying ? 'PAUSE' : 'PLAY'}</button>
        <button onClick={props.handlePrev}>PREV</button>
        <button onClick={props.handleNext}>NEXT</button>
        <button
          style={{ minWidth: '10%' }}
          onMouseEnter={() => setVolumeHide(false)}
          onMouseLeave={() => setVolumeHide(true)}
        >
          {volumeHide ? (
            <p>VOLUME</p>
          ) : (
            <Slider
              aria-label="volume"
              max={1}
              step={0.01}
              onChange={(_, value) => handleVolumeChange(value)}
              value={volume}
            />
          )}
        </button>
        <button
          disabled={props.song === undefined}
          onClick={() => navigator.clipboard.writeText(`${BASE_URL}${props.song?.videoId}`)}
        >
          COPY LINK
        </button>
      </section>
    </>
  );
};

export default Player;
