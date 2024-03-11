import { songInfo } from '../hooks/useSearchSong';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { Slider } from '@mui/material';

const BASE_URL = `https://www.youtube.com/watch?v=`;

type playerProps = {
  handleNext: () => void;
  song?: songInfo;
};

const Player = (props: playerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (value: number | number[]) => {
    if (typeof value !== 'number') throw new Error("Can't get an array of numbers");
    return setVolume(value);
  };

  return (
    <>
      {props.song === undefined ? (
        <h1>Player waiting a song...</h1>
      ) : (
        <ReactPlayer
          url={`${BASE_URL}${props.song.videoId}`}
          playing={isPlaying}
          volume={volume}
          onEnded={props.handleNext}
        />
      )}

      <section>
        <button onClick={() => setIsPlaying(!isPlaying)}>PLAY/PAUSE</button>
        <button>PREV</button>
        <button onClick={props.handleNext}>NEXT</button>
        <button style={{ minWidth: '10%' }}>
          VOLUME
          <Slider
            aria-label="volume"
            max={1}
            step={0.01}
            defaultValue={volume}
            onChange={(_, value) => handleVolumeChange(value)}
          />
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
